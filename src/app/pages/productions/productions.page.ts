import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  searchOutline,
  closeOutline,
  chevronForwardOutline,
  timeOutline,
} from 'ionicons/icons';

import { Production } from '../../models/production.model';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.page.html',
  styleUrls: ['./productions.page.scss'],
  standalone: true,
  imports: [
    FormsModule,

    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonInput,
    IonMenuButton,
  ],
})
export class ProductionsPage {

  productions: Production[] = [];

  filteredProductions: Production[] = [];

  searchTerm = '';

  statusFilter = 'Todos';

  showSearch = false;

  constructor(
    private router: Router,
    private productionService: ProductionService,
  ) {

    addIcons({
      searchOutline,
      closeOutline,
      chevronForwardOutline,
      timeOutline,
    });

  }

  ngOnInit() {
    this.loadProductions();
  }

  /*==============================
    CARGA
  ==============================*/

  loadProductions() {

    this.productions =
      this.productionService.getProductions();

    this.applyFilters();

  }

  /*==============================
    FILTROS
  ==============================*/

  applyFilters() {

    let list = [...this.productions];

    // filtro por estado
    if (this.statusFilter !== 'Todos') {

      list = list.filter(
        p => p.status === this.statusFilter,
      );

    }

    // filtro por búsqueda
    if (this.searchTerm.trim()) {

      const term = this.searchTerm.toLowerCase();

      list = list.filter(p =>
        p.patientName?.toLowerCase().includes(term) ||
        p.batchNumber?.toLowerCase().includes(term) ||
        p.responsible?.toLowerCase().includes(term),
      );

    }

    this.filteredProductions = list;

  }

  toggleSearch() {

    this.showSearch = !this.showSearch;

    if (!this.showSearch) {

      this.searchTerm = '';

      this.applyFilters();

    }

  }

  /*==============================
    NAVEGACIÓN
  ==============================*/

  viewHistory(id: number) {

    this.router.navigate([
      '/production-history',
      id,
    ]);

  }

  /*==============================
    ACCIÓN PRINCIPAL
  ==============================*/

  nextStatus(production: Production) {

    switch (production.status) {

      case 'Pendiente':

        this.productionService.updateStatus(
          production.id,
          'En Producción',
        );

        break;

      case 'En Producción':

        if (
          !production.rawMaterialsUsed ||
          production.rawMaterialsUsed.length === 0
        ) {

          alert('Debe registrar materias primas');

          return;

        }

        this.productionService.updateStatus(
          production.id,
          'Control Calidad',
        );

        break;

      case 'Control Calidad':

        this.productionService.completeProduction(
          production.id,
        );

        break;

    }

    this.loadProductions();

  }

  /*==============================
    UI HELPERS
  ==============================*/

  getStatusClass(status: string): string {

    return this.productionService.getStatusClass(status);

  }

  getProgress(status: string): number {

    return this.productionService.getProgress(status);

  }

  getDaysElapsed(date: string): number {

    return this.productionService.getDaysElapsed(date);

  }

  getLastHistory(production: Production) {

    return this.productionService.getLastHistory(production);

  }

}