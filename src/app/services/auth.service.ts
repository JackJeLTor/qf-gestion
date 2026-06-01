import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [

    {
      username: 'admin',
      password: '123456',
      role: 'Administrador'
    }

  ];

  login(
    username: string,
    password: string
  ): boolean {

    const user =
      this.users.find(
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