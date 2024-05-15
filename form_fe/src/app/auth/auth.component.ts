// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from './otp.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user_id: number;
  first_time: boolean;
  
  constructor(private fb: FormBuilder, private dialog: MatDialog, private http: HttpClient) {
    this.loginForm = this.fb.group({
      uniqname: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
    });
    this.user_id = -100;
    this.first_time = this.user_id === -1;    
  }
  getControl(controlName: string) {
    return this.loginForm.get(controlName)
  }
  onSubmit(form: NgForm) {
    if (this.loginForm.get('uniqname')?.value === '') {
      console.log("missing uniqname!")
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
            this.openOtpModal();
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
        first: this.loginForm.get('fName')?.value,
        last: this.loginForm.get('lName')?.value,
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
}