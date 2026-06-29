import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  searchOutline,
  closeOutline,
} from 'ionicons/icons';

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
    IonCard,
    IonCardContent,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonMenuButton,
    IonIcon,
  ]
})
export class AuditPage {

  logs: any[] = [];

  filteredLogs: any[] = [];

  searchText = '';

  showSearch = false;

  moduleFilter = 'Todos';

  totalLogs = 0;

  recipesLogs = 0;

  productionLogs = 0;

  qualityLogs = 0;

  deliveryLogs = 0;

  constructor(
    private auditService:
      AuditService
  ) {

    addIcons({
      searchOutline,
      closeOutline,
    });

  }

  ionViewWillEnter() {

    this.logs =
      this.auditService
        .getLogs()
        .reverse();

    this.filteredLogs =
      [...this.logs];

    this.calculateStats();

  }

  calculateStats() {

    this.totalLogs =
      this.logs.length;

    this.recipesLogs =
      this.logs.filter(
        l => l.module === 'Recetas'
      ).length;

    this.productionLogs =
      this.logs.filter(
        l => l.module === 'Producción'
      ).length;

    this.qualityLogs =
      this.logs.filter(
        l => l.module === 'Control Calidad'
      ).length;

    this.deliveryLogs =
      this.logs.filter(
        l => l.module === 'Entregas'
      ).length;

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

  toggleSearch() {

    this.showSearch = !this.showSearch;

    if (!this.showSearch) {

      this.searchText = '';

      this.filterLogs();

    }

  }

  clearAudit() {

    const confirmDelete =
      confirm(
        '¿Desea eliminar toda la auditoría?'
      );

    if (!confirmDelete) {
      return;
    }

    this.auditService.clearLogs();

    this.logs = [];

    this.filteredLogs = [];

    this.calculateStats();

  }

}