import { Injectable } from '@angular/core';

import { UserService }
from './user.service';

import { AccessLogService }
from './access-log.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService:
      UserService,

    private accessLogService:
      AccessLogService
  ) {}

  login(
    username: string,
    password: string
  ): boolean {

    const user =
      this.userService
        .getUserByUsername(
          username
        );

    if (!user) {

      this.accessLogService
        .addLog(
          username,
          'Usuario inexistente'
        );

      return false;

    }

    if (
      user.locked === true
    ) {

      this.accessLogService
        .addLog(
          username,
          'Bloqueado'
        );

      alert(
        'Usuario bloqueado. Contacte al administrador.'
      );

      return false;

    }

    if (
      user.password !== password
    ) {

      this.userService
        .incrementFailedAttempts(
          username
        );

      this.accessLogService
        .addLog(
          username,
          'Contraseña incorrecta'
        );

      return false;

    }

    if (
      user.active !== true
    ) {

      this.accessLogService
        .addLog(
          username,
          'Usuario inactivo'
        );

      return false;

    }

    this.userService
      .resetFailedAttempts(
        username
      );

    user.lastLogin =
      new Date()
        .toLocaleString();

    this.userService
      .updateUser(
        user
      );

    localStorage.setItem(
      'currentUser',
      JSON.stringify(
        user
      )
    );

    this.accessLogService
      .addLog(
        username,
        'Exitoso'
      );

    return true;

  }

  logout() {

    const user =
      this.getCurrentUser();

    if (user) {

      this.accessLogService
        .addLog(
          user.username,
          'Logout'
        );

    }

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