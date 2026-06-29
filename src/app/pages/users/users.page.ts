import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonToggle,
  IonMenuButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  closeOutline,
  addOutline,
} from 'ionicons/icons';

import { UserService } from '../../services/user.service';

import { AuditService } from '../../services/audit.service';
import { AppModulePermission, PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonToggle,
    IonMenuButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
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

  availablePermissions: AppModulePermission[] = [];

  users: any[] = [];

  editingUserId: number | null = null;

  showUserModal = false;

  constructor(
    private userService: UserService,
    private auditService: AuditService,
    private permissionService: PermissionService,
  ) {
    addIcons({
      closeOutline,
      addOutline,
    });
  }

  ngOnInit() {
    this.availablePermissions = this.permissionService.getAssignableModules();
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  saveUser() {
    if (!this.username || !this.fullName || !this.role) {
      return;
    }

    if (!this.editingUserId && !this.password) {
      return;
    }

    const assignedPermissions = this.getAssignedPermissions();

    if (this.editingUserId) {
      const user = this.userService.getUserById(this.editingUserId);

      if (!user) {
        return;
      }

      user.username = this.username;
      user.fullName = this.fullName;
      user.role = this.role;

      if (this.password && this.password !== user.password) {
        user.password = this.password;
        user.passwordChangedDate = new Date().toLocaleString();
      }

      user.permissions = assignedPermissions;
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
        permissions: assignedPermissions,
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
    this.closeUserModal();
    this.loadUsers();
  }

  openNewUserModal() {
    this.clearForm();
    this.showUserModal = true;
  }

  closeUserModal() {
    this.showUserModal = false;
    this.clearForm();
  }

  editUser(user: any) {
    this.editingUserId = user.id;
    this.username = user.username;
    this.password = '';
    this.fullName = user.fullName;
    this.role = user.role;
    this.permissions = user.permissions || [];
    this.email = user.email;
    this.phone = user.phone;
    this.active = user.active;
    this.showUserModal = true;
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

  syncRolePermissions() {
    if (this.role === 'Administrador') {
      this.permissions = this.availablePermissions.map((permission) => permission.key);
    }
  }

  formatPermissions(permissions: string[] = []): string {
    if (permissions.length === 0) {
      return 'Sin permisos asignados';
    }

    return permissions
      .map((permission) => this.permissionService.getModuleLabel(permission))
      .join(', ');
  }

  private getAssignedPermissions(): string[] {
    if (this.role === 'Administrador') {
      return this.availablePermissions.map((permission) => permission.key);
    }

    return this.permissions;
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
