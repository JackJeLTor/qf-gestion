import { Injectable } from '@angular/core';

import { AuditLog }
from '../models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private logs: AuditLog[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'auditLogs'
      );

    if (data) {

      this.logs =
        JSON.parse(data);

    }

  }

  getLogs(): AuditLog[] {

    return this.logs;

  }

  addLog(
    module: string,
    action: string,
    responsible: string,
    description: string
  ) {

    this.logs.push({

      id: Date.now(),

      module,

      action,

      responsible,

      description,

      date:
        new Date()
          .toLocaleString()

    });

    this.save();

  }

  clearLogs() {

    this.logs = [];

    this.save();

  }

  private save() {

    localStorage.setItem(
      'auditLogs',
      JSON.stringify(
        this.logs
      )
    );

  }

}