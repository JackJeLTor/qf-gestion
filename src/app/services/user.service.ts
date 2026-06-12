import { Injectable } from '@angular/core';

import { User }
from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users:
    User[] = [];

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
            'Administrador',
          role:
            'Administrador'
        }

      ];

      this.save();

    }

  }

  getUsers(): User[] {

    return this.users;

  }

  addUser(
    user: User
  ) {

    this.users.push(
      user
    );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'users',
      JSON.stringify(
        this.users
      )
    );

  }

}