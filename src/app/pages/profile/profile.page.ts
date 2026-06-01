import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class ProfilePage {

  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ionViewWillEnter() {

    this.user =
      this.authService.getCurrentUser();
  }

  logout() {

    this.authService.logout();

    this.router.navigate(
      ['/login']
    );
  }

}