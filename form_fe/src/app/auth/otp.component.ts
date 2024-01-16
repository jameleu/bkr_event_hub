// otp-input.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent {
  otpControls: FormControl[] = Array(6).fill('').map(() => new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]));
  activeInputIndex: number = 0;

  @Output() otpChange = new EventEmitter<string>();

  onInput(index: number) {
    const inputValue = this.otpControls[index].value;
    this.otpChange.emit(this.otpControls.map(control => control.value).join(''));

    // Move focus to the next input if a digit is entered
    if (inputValue && index < this.otpControls.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onFocus(index: number) {
    this.activeInputIndex = index;
  }
  onSubmit(): void {
    console.log('Submitting OTP:', this.otpControls.map(control => control.value).join(''));
  }
}
