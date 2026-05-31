import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage {

  constructor(
    private router: Router
  ) {}

  login() {
    this.router.navigate(['/dashboard']);
  }

}