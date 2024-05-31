import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
    template: `
    <div>
        <div class="space_1"></div>
        <p> An unexpected error occurred. </p>
        <p> Please try again, and if this issue persists, please contact <a href="mailTo:greatuofmbakingclub@gmail.com"> greatuofmbakingclub&#64;gmail.com</a>. </p>
        <button mat-button class="go_back">
        <a href="/"> Home </a>
      </button>
      <div class="space_2"></div>
    </div>
    `,
  styleUrls:   ['err.component.scss']
})
export class ErrComponent {
  constructor(private router: Router) {}
}