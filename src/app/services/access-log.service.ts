import { Injectable } from '@angular/core';

import { AccessLog } from '../models/access-log.model';

@Injectable({
  providedIn: 'root',
})
export class AccessLogService {
  private logs: AccessLog[] = [];

  constructor() {
    const data = localStorage.getItem('accessLogs');

    if (data) {
      this.logs = JSON.parse(data);
    }
  }

  getLogs(): AccessLog[] {
    return this.logs;
  }

  addLog(username: string, result: string) {
    const now = new Date();

    this.logs.push({
      id: Date.now(),

      username,

      date: now.toLocaleDateString(),

      time: now.toLocaleTimeString(),

      result,

      ip: 'Localhost',
    });

    this.save();
  }

  clearLogs() {
    this.logs = [];

    this.save();
  }

  private save() {
    localStorage.setItem('accessLogs', JSON.stringify(this.logs));
  }
}
