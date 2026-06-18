import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonInput,
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
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonInput,
  ],
})
export class ProfilePage {
  user: any;

  currentPassword = '';

  newPassword = '';

  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private auditService: AuditService,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    this.user = this.authService.getCurrentUser();
  }

  changePassword() {
    if (!this.user) {
      return;
    }

    if (this.currentPassword !== this.user.password) {
      alert('La contraseña actual es incorrecta');

      return;
    }

    if (this.newPassword.length < 6) {
      alert('La nueva contraseña debe tener al menos 6 caracteres');

      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');

      return;
    }

    this.userService.changePassword(this.user.id, this.newPassword);

    this.user.password = this.newPassword;

    localStorage.setItem('currentUser', JSON.stringify(this.user));

    this.auditService.addLog(
      'Usuarios',
      'Cambio Contraseña',
      this.user.username,
      `El usuario ${this.user.username} cambió su contraseña`,
    );

    this.currentPassword = '';

    this.newPassword = '';

    this.confirmPassword = '';

    alert('Contraseña actualizada correctamente');
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
