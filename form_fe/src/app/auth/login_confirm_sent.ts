import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
@Component({
    selector: 'app-login',
    template: `
    <div>
        <div class="space_1"></div>
        <p *ngIf="created; else elseTemplate"> You're on your way to creating an account! </p>
        <ng-template #elseTemplate> <p> You're on your way to logging in! </p> </ng-template>
        <p> Check your email at {{email}} for next steps! </p>
        <button mat-button class="go_back">
        <a href="/"> Go Look At Events </a>
      </button>
      <div class="space_2"></div>
    </div>
    `,
    styleUrl: './login_confirm_sent.scss'
  })
  export class LoginConfirmSentComponent {
    @Input() email : string = '';
    @Input() created : boolean = false;
    constructor() {
    }
  }