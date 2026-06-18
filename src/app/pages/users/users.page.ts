import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonToggle,
} from '@ionic/angular/standalone';

import { UserService } from '../../services/user.service';

import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonToggle,
  ],
})
export class UsersPage {
  username = '';

  password = '';

  fullName = '';

  role = '';

  email = '';

  phone = '';

  active = true;

  permissions: string[] = [];

  availablePermissions = [
    'dashboard',
    'patients',
    'doctors',
    'laboratories',
    'raw-materials',
    'production-consumption',
    'prescriptions',
    'productions',
    'quality-control',
    'delivery',
    'audit',
    'backup',
    'users',
    'reports',
  ];

  users: any[] = [];

  editingUserId: number | null = null;

  constructor(
    private userService: UserService,

    private auditService: AuditService,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  saveUser() {
    if (!this.username || !this.password || !this.fullName || !this.role) {
      return;
    }

    if (this.editingUserId) {
      const user = this.userService.getUserById(this.editingUserId);

      if (!user) {
        return;
      }

      user.username = this.username;

      user.password = this.password;

      user.fullName = this.fullName;

      user.role = this.role;

      user.permissions = this.permissions;

      user.email = this.email;

      user.phone = this.phone;

      user.active = this.active;

      user.updatedDate = new Date().toLocaleString();

      user.updatedBy = 'Administrador';

      this.userService.updateUser(user);

      this.auditService.addLog(
        'Usuarios',
        'Editar',
        'Administrador',
        `Usuario ${user.username} modificado`,
      );
    } else {
      this.userService.addUser({
        id: Date.now(),

        username: this.username,

        password: this.password,

        fullName: this.fullName,

        role: this.role,

        permissions: this.permissions,

        email: this.email,

        phone: this.phone,

        active: this.active,

        createdDate: new Date().toLocaleString(),

        updatedDate: '',

        createdBy: 'Administrador',

        updatedBy: '',

        lastLogin: '-',

        passwordChangedDate: new Date().toLocaleString(),

        failedAttempts: 0,

        locked: false,
      });

      this.auditService.addLog(
        'Usuarios',
        'Crear',
        'Administrador',
        `Usuario ${this.username} creado`,
      );
    }

    this.clearForm();

    this.loadUsers();
  }

  editUser(user: any) {
    this.editingUserId = user.id;

    this.username = user.username;

    this.password = user.password;

    this.fullName = user.fullName;

    this.role = user.role;

    this.permissions = user.permissions || [];

    this.email = user.email;

    this.phone = user.phone;

    this.active = user.active;
  }

  clearForm() {
    this.editingUserId = null;

    this.username = '';

    this.password = '';

    this.fullName = '';

    this.role = '';

    this.permissions = [];

    this.email = '';

    this.phone = '';

    this.active = true;
  }

  toggleStatus(user: any) {
    const action = user.active ? 'Desactivar' : 'Activar';

    this.userService.toggleUserStatus(user.id);

    this.auditService.addLog(
      'Usuarios',
      action,
      'Administrador',
      `Estado cambiado para ${user.username}`,
    );

    this.loadUsers();
  }

  unlockUser(user: any) {
    this.userService.unlockUser(user.id);

    this.auditService.addLog(
      'Usuarios',
      'Desbloquear',
      'Administrador',
      `Usuario ${user.username} desbloqueado`,
    );

    this.loadUsers();
  }

  deleteUser(user: any) {
    if (user.username === 'admin') {
      return;
    }

    this.auditService.addLog(
      'Usuarios',
      'Eliminar',
      'Administrador',
      `Usuario ${user.username} eliminado`,
    );

    this.userService.deleteUser(user.id);

    this.loadUsers();
  }
}
