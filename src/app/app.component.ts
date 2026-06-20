import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    RouterLink,
  ],
})
export class AppComponent {
  currentUser: any = null;

  constructor(
    private router: Router,
  ) {
    this.loadUser();
  }

  loadUser() {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null',
    );
  }

  logout() {
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login']);
  }
}