import { Injectable } from '@angular/core';

import { User }
from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'users'
      );

    if (data) {

      this.users =
        JSON.parse(data);

    } else {

      this.users = [

        {
          id: 1,

          username: 'admin',

          password: '123456',

          fullName:
            'Administrador General',

          role:
            'Administrador',

          email:
            'admin@qfgestion.com',

          phone:
            '999999999',

          active:
            true,

          createdDate:
            new Date()
              .toLocaleString(),

          updatedDate:
            '',

          createdBy:
            'Sistema',

          updatedBy:
            '',

          lastLogin:
            ''
        }

      ];

      this.save();

    }

  }

  getUsers(): User[] {

    return this.users;

  }

  getUserById(
    id: number
  ) {

    return this.users.find(
      u => u.id === id
    );

  }

  addUser(
    user: User
  ) {

    this.users.push(
      user
    );

    this.save();

  }

  updateUser(
    updatedUser: User
  ) {

    const index =
      this.users.findIndex(
        u =>
          u.id ===
          updatedUser.id
      );

    if (
      index === -1
    ) {
      return;
    }

    this.users[index] =
      updatedUser;

    this.save();

  }

  toggleUserStatus(
    id: number
  ) {

    const user =
      this.users.find(
        u => u.id === id
      );

    if (!user) {
      return;
    }

    if (
      user.username ===
      'admin'
    ) {
      return;
    }

    user.active =
      !user.active;

    this.save();

  }

  deleteUser(
    id: number
  ) {

    const user =
      this.users.find(
        u => u.id === id
      );

    if (!user) {
      return;
    }

    if (
      user.username ===
      'admin'
    ) {
      return;
    }

    this.users =
      this.users.filter(
        u => u.id !== id
      );

    this.save();

  }

  save() {

    localStorage.setItem(
      'users',
      JSON.stringify(
        this.users
      )
    );

  }

}