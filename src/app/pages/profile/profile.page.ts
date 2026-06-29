import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { AuthService } from '../../services/auth.service';

import { UserService } from '../../services/user.service';

import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonMenuButton,
  ],
})
export class ProfilePage {
  user: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private auditService: AuditService,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.user.photo = reader.result as string;

      localStorage.setItem('currentUser', JSON.stringify(this.user));

      this.userService.updateUser(this.user);

      this.auditService.addLog(
        'Usuarios',
        'Cambio Foto',
        this.user.username,
        `El usuario ${this.user.username} actualizó su foto de perfil`,
      );
    };

    reader.readAsDataURL(file);
  }
}
