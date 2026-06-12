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
  IonCardContent
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
    IonCardContent
  ]
})
export class UsersPage {

  username = '';

  password = '';

  fullName = '';

  role = '';

  users: any[] = [];

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
          this.role

      });

    this.loadUsers();

    this.username = '';
    this.password = '';
    this.fullName = '';
    this.role = '';

  }

}