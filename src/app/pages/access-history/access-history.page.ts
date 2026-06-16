import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonItem
} from '@ionic/angular/standalone';

import { AccessLogService }
from '../../services/access-log.service';

@Component({
  selector: 'app-access-history',
  templateUrl: './access-history.page.html',
  styleUrls: ['./access-history.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonItem
  ]
})
export class AccessHistoryPage {

  logs: any[] = [];

  constructor(
    private accessLogService:
      AccessLogService
  ) {}

  ionViewWillEnter() {

    this.logs =
      this.accessLogService
        .getLogs()
        .slice()
        .reverse();

  }

}