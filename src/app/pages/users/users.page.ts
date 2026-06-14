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
  IonToggle
} from '@ionic/angular/standalone';

import { UserService }
from '../../services/user.service';

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
    IonToggle
  ]
})
export class UsersPage {

  username = '';

  password = '';

  fullName = '';

  role = '';

  email = '';

  phone = '';

  active = true;

  users: any[] = [];

  editingUserId:
    number | null = null;

  constructor(
    private userService:
      UserService
  ) {}

  ngOnInit() {

    this.loadUsers();

  }

  loadUsers() {

    this.users =
      this.userService
        .getUsers();

  }

  saveUser() {

    if (
      !this.username ||
      !this.password ||
      !this.fullName ||
      !this.role
    ) {
      return;
    }

    if (
      this.editingUserId
    ) {

      const user =
        this.userService
          .getUserById(
            this.editingUserId
          );

      if (!user) {
        return;
      }

      user.username =
        this.username;

      user.password =
        this.password;

      user.fullName =
        this.fullName;

      user.role =
        this.role;

      user.email =
        this.email;

      user.phone =
        this.phone;

      user.active =
        this.active;

      user.updatedDate =
        new Date()
          .toLocaleString();

      user.updatedBy =
        'Administrador';

      this.userService
        .updateUser(
          user
        );

    } else {

      this.userService
        .addUser({

          id: Date.now(),

          username:
            this.username,

          password:
            this.password,

          fullName:
            this.fullName,

          role:
            this.role,

          email:
            this.email,

          phone:
            this.phone,

          active:
            this.active,

          createdDate:
            new Date()
              .toLocaleString(),

          updatedDate:
            '',

          createdBy:
            'Administrador',

          updatedBy:
            '',

          lastLogin:
            '-'

        });

    }

    this.clearForm();

    this.loadUsers();

  }

  editUser(
    user: any
  ) {

    this.editingUserId =
      user.id;

    this.username =
      user.username;

    this.password =
      user.password;

    this.fullName =
      user.fullName;

    this.role =
      user.role;

    this.email =
      user.email;

    this.phone =
      user.phone;

    this.active =
      user.active;

  }

  clearForm() {

    this.editingUserId =
      null;

    this.username = '';

    this.password = '';

    this.fullName = '';

    this.role = '';

    this.email = '';

    this.phone = '';

    this.active = true;

  }

  toggleStatus(
    user: any
  ) {

    this.userService
      .toggleUserStatus(
        user.id
      );

    this.loadUsers();

  }

  deleteUser(
    user: any
  ) {

    if (
      user.username ===
      'admin'
    ) {
      return;
    }

    this.userService
      .deleteUser(
        user.id
      );

    this.loadUsers();

  }

}