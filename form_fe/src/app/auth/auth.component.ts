// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from './otp.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { onlyLetters } from '../validators/only-letters';
import { ErrorModalComponent } from '../err/err_modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user_id: number;
  first_time: boolean;
  action: string;
  
  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      uniqname: ['', [onlyLetters(), Validators.required]],
      fName: ['', [onlyLetters(), Validators.required]],
      lName: ['', [onlyLetters(), Validators.required]],
    });
    this.user_id = -100;
    this.first_time = this.user_id === -1;    
    this.action = this.route.snapshot.data['action'];
  }

  ngOnInit(): void {
    console.log(this.action)
    if (this.action === 'err') {
      this.openErrorModal();
    }
    else if (this.action === 'errV') {
      this.openErrorModalVerify();
    }
    else if (this.action === "login") {
      this.openErrorModalMustLogin();
    }
  }
  openErrorModal(): void {
    this.dialog.open(ErrorModalComponent, {
      width: '50vw',
      data: { message: 'An error occurred during login. Try logging in again.', err_type: "auth" }
    });
  }
  openErrorModalVerify(): void {
    this.dialog.open(ErrorModalComponent, {
      width: '50vw',
      data: { message: 'An error occurred during verifying your email. Try creating an account again.', err_type: "auth" }
    });
  }
  openErrorModalMustLogin(): void {
    this.dialog.open(ErrorModalComponent, {
      width: '50vw',
      data: { message: 'Please one-time login with your email!', err_type: "must_login" }
    });
  }

  getControl(controlName: string) {
    return this.loginForm.get(controlName)
  }
  onSubmit(form: NgForm) {
    if (this.loginForm.get('uniqname')?.value === '' || this.loginForm.get('uniqname')?.hasError("onlyLetters")) {
      console.log("missing/bad uniqname!")
      return;
    }
    // const credentials = this.loginForm.value;  //TODO store this somehow in session or rest api
    const formData = {
      user : this.loginForm.get('uniqname')?.value
    };
    console.log(formData)
    if(!this.first_time) {  // default is False; so is either unconfirmed/returning
      this.http.get(`http://127.0.0.1:8000/v1/users/get_id/${formData.user}/`).subscribe(
        (response) => {
          console.log("get user id api log: ", response);
          this.user_id = (response as any)['id'];
          this.first_time = this.user_id === -1;
          if(!this.first_time) {
            this.login(formData)
          }
          //otherwise, request for new info to make account (see template)
        },
        (error) => {
          console.error("get user id api error: ", error)
        }
      );
    }
    else {
      if(!this.loginForm.valid) {
        console.log("please fill out whole form!");
        return;
      }
      const new_data = {
        username: formData.user,
        first_name: this.loginForm.get('fName')?.value,
        last_name: this.loginForm.get('lName')?.value,
      };
      console.log(new_data);
      console.log("creating new user!");
      this.createUser(new_data);
      this.openOtpModal();
      // this.loginForm.reset();
    }
    // this.openOtpModal();
    // this.authService.login(credentials).subscribe(
    //   (response: any) => {
    //     // TODO
    //     this.openOtpModal();
    //     console.log(response);
    //   },
    //   (error: any) => {
    //     // TODO
    //     console.error(error);
    //   }
    // );
  }
  openOtpModal() {
    // Open the OTP modal
    const dialogRef = this.dialog.open(OtpComponent, {
      data: {'user' : this.user_id}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('OTP modal closed:', result);
    // });
  }
  createUser(formData: any) {
    console.log(formData);
    this.http.post("http://127.0.0.1:8000/v1/users/", formData).subscribe(
      (response) => {
        console.log("User created successfully: ", response);
      },
      (error) => {
        console.error("Error creating user: ", error);
      }
    );
  }
  resetForm() {
    // window.location.reload();
    this.first_time = false;
    this.loginForm.reset();
  }
  login(formData: any) {
    const params = new HttpParams().set('uniqname', formData.user);
    this.http.get("http://127.0.0.1:8000/v1/users/auth/", {params: params}).subscribe(
      (response) => {
        console.log("User login process started successfully: ", response);
      },
      (error) => {
        console.error("Error starting login process: ", error);
      }
    );
    this.router.navigate(['/login-confirm-sent/']);
  }
  admin(): void {
    this.router.navigate(['/auth/admin/']);
  }
}