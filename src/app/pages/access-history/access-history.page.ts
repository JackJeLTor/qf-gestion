import { Component } from '@angular/core';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { AccessLogService } from '../../services/access-log.service';

@Component({
  selector: 'app-access-history',
  templateUrl: './access-history.page.html',
  styleUrls: ['./access-history.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonMenuButton,
  ],
})
export class AccessHistoryPage {
  logs: any[] = [];

  constructor(private accessLogService: AccessLogService) {}

  ionViewWillEnter() {
    this.logs = this.accessLogService.getLogs().slice().reverse();
  }
}
