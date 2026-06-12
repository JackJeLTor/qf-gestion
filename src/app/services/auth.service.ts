import { Injectable } from '@angular/core';

import { UserService }
from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService:
      UserService
  ) {}

  login(
    username: string,
    password: string
  ): boolean {

    const user =
      this.userService
        .getUsers()
        .find(
          u =>
            u.username === username &&
            u.password === password
        );

    if (!user) {

      return false;

    }

    localStorage.setItem(
      'currentUser',
      JSON.stringify(user)
    );

    return true;

  }

  logout() {

    localStorage.removeItem(
      'currentUser'
    );

  }

  getCurrentUser() {

    return JSON.parse(
      localStorage.getItem(
        'currentUser'
      ) || 'null'
    );

  }

  isLoggedIn(): boolean {

    return !!this.getCurrentUser();

  }

}