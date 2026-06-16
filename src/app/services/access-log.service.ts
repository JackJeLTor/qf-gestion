import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessLogService {

  private accessLogs: any[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'accessLogs'
      );

    if (data) {

      this.accessLogs =
        JSON.parse(data);

    }

  }

  addLog(
    username: string,
    result: string
  ) {

    this.accessLogs.push({

      username,

      date:
        new Date()
          .toLocaleDateString(),

      time:
        new Date()
          .toLocaleTimeString(),

      result

    });

    this.save();

  }

  getLogs() {

    return this.accessLogs;

  }

  private save() {

    localStorage.setItem(
      'accessLogs',
      JSON.stringify(
        this.accessLogs
      )
    );

  }

}