import { Injectable } from '@angular/core';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [];

  constructor() {
    const data = localStorage.getItem('users');

    if (data) {
      this.users = JSON.parse(data);
    } else {
      this.users = [
        {
          id: 1,

          username: 'admin',

          password: '123456',

          fullName: 'Administrador General',

          role: 'Administrador',

          permissions: [
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

            'access-history',
          ],

          email: 'admin@qfgestion.com',

          phone: '999999999',

          active: true,

          createdDate: new Date().toLocaleString(),

          updatedDate: '',

          createdBy: 'Sistema',

          updatedBy: '',

          lastLogin: '',

          passwordChangedDate: new Date().toLocaleString(),

          failedAttempts: 0,

          locked: false,

          photo: '',
        },
      ];

      this.save();
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  getUserByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }

  addUser(user: User) {
    this.users.push(user);

    this.save();
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex((u) => u.id === updatedUser.id);

    if (index === -1) {
      return;
    }

    this.users[index] = updatedUser;

    this.save();
  }

  changePassword(userId: number, newPassword: string) {
    const user = this.getUserById(userId);

    if (!user) {
      return;
    }

    user.password = newPassword;

    user.passwordChangedDate = new Date().toLocaleString();

    this.save();
  }

  incrementFailedAttempts(username: string) {
    const user = this.getUserByUsername(username);

    if (!user) {
      return;
    }

    user.failedAttempts++;

    if (user.failedAttempts >= 3) {
      user.locked = true;
    }

    this.save();
  }

  resetFailedAttempts(username: string) {
    const user = this.getUserByUsername(username);

    if (!user) {
      return;
    }

    user.failedAttempts = 0;

    this.save();
  }

  unlockUser(userId: number) {
    const user = this.getUserById(userId);

    if (!user) {
      return;
    }

    user.locked = false;

    user.failedAttempts = 0;

    this.save();
  }

  toggleUserStatus(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return;
    }

    if (user.username === 'admin') {
      return;
    }

    user.active = !user.active;

    this.save();
  }

  deleteUser(id: number) {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      return;
    }

    if (user.username === 'admin') {
      return;
    }

    this.users = this.users.filter((u) => u.id !== id);

    this.save();
  }

  save() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
