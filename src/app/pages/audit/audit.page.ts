import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { AuditService }
from '../../services/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent
  ]
})
export class AuditPage {

  logs: any[] = [];

  constructor(
    private auditService:
      AuditService
  ) {}

  ionViewWillEnter() {

    this.logs =
      this.auditService
        .getLogs()
        .reverse();

  }

}