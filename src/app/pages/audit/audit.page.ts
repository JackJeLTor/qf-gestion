import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { AuditService }
from '../../services/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.page.html',
  styleUrls: ['./audit.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption
  ]
})
export class AuditPage {

  logs: any[] = [];

  filteredLogs: any[] = [];

  searchText = '';

  moduleFilter = 'Todos';

  totalLogs = 0;

  constructor(
    private auditService:
      AuditService
  ) {}

  ionViewWillEnter() {

    this.logs =
      this.auditService
        .getLogs()
        .reverse();

    this.filteredLogs =
      [...this.logs];

    this.totalLogs =
      this.logs.length;

  }

  filterLogs() {

    this.filteredLogs =
      this.logs.filter(
        log => {

          const matchesSearch =

            this.searchText === ''

            ||

            log.module
              .toLowerCase()
              .includes(
                this.searchText.toLowerCase()
              )

            ||

            log.action
              .toLowerCase()
              .includes(
                this.searchText.toLowerCase()
              )

            ||

            log.responsible
              .toLowerCase()
              .includes(
                this.searchText.toLowerCase()
              )

            ||

            log.description
              .toLowerCase()
              .includes(
                this.searchText.toLowerCase()
              );

          const matchesModule =

            this.moduleFilter ===
            'Todos'

            ||

            log.module ===
            this.moduleFilter;

          return (
            matchesSearch
            &&
            matchesModule
          );

        }
      );

  }

}