import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Production } from '../../models/production.model';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';

import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-productions',
  templateUrl: './productions.page.html',
  styleUrls: ['./productions.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
  ],
})
export class ProductionsPage {
  productions: Production[] = [];

  constructor(
    private router: Router,
    private productionService: ProductionService,
  ) {}

  ngOnInit() {
    this.loadProductions();
  }

  loadProductions() {
    this.productions = this.productionService.getProductions();
  }

  viewHistory(id: number) {
    this.router.navigate(['/production-history', id]);
  }

  nextStatus(production: any) {
    switch (production.status) {
      case 'Pendiente':
        this.productionService.updateStatus(production.id, 'En Producción');

        break;

      case 'En Producción':
        if (
          !production.rawMaterialsUsed ||
          production.rawMaterialsUsed.length === 0
        ) {
          alert(
            'Debe registrar materias primas consumidas antes de continuar.',
          );

          return;
        }

        this.productionService.updateStatus(production.id, 'Control Calidad');

        break;

      case 'Control Calidad':
        production.endDate = new Date().toLocaleDateString();

        production.qualityDate = new Date().toLocaleDateString();

        production.qualityResponsible = production.responsible;

        production.qualityStatus = 'Aprobado';

        production.qualityResult = 'Aprobado';

        production.observations = 'Producción completada correctamente';

        this.productionService.updateStatus(production.id, 'Finalizado');

        break;
    }

    localStorage.setItem('productions', JSON.stringify(this.productions));

    this.loadProductions();
  }
}