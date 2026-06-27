import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonBackButton,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

import {
  Production,
  ProductionHistory,
} from '../../models/production.model';

import { ProductionService }
from '../../services/production.service';

@Component({
  selector: 'app-production-history',
  templateUrl:
    './production-history.page.html',
  styleUrls: [
    './production-history.page.scss',
  ],
  standalone: true,
  imports: [
    CommonModule,

    IonContent,
    IonBackButton,
    IonCard,
    IonCardContent,
  ],
})
export class ProductionHistoryPage {

  production?: Production;

  constructor(

    private route: ActivatedRoute,

    private productionService:
      ProductionService,

  ) {}

  ngOnInit(): void {

    const id = Number(

      this.route.snapshot.paramMap.get(
        'id',
      ),

    );

    this.production =

      this.productionService
        .getProductionById(id);

  }

  /*====================================
    PROGRESO
  ====================================*/

  get progress(): number {

    if (!this.production) {

      return 0;

    }

    return this.productionService.getProgress(

      this.production.status,

    );

  }

  /*====================================
    DÍAS TRANSCURRIDOS
  ====================================*/

  get elapsedDays(): number {

    if (!this.production) {

      return 0;

    }

    return this.productionService.getDaysElapsed(

      this.production.startDate,

    );

  }

  /*====================================
    ÚLTIMO MOVIMIENTO
  ====================================*/

  get lastHistory():
    ProductionHistory | null {

    if (

      !this.production ||

      this.production.history.length === 0

    ) {

      return null;

    }

    return this.production.history[
      this.production.history.length - 1
    ];

  }

  /*====================================
    CLASE DEL ESTADO
  ====================================*/

  getStatusClass(
    status: string,
  ): string {

    switch (status) {

      case 'Pendiente':

        return 'pending';

      case 'En Producción':

        return 'production';

      case 'Control Calidad':

        return 'quality';

      case 'Finalizado':

        return 'completed';

      case 'Observado':

        return 'observed';

      default:

        return 'pending';

    }

  }

  /*====================================
    CLASE DE PRIORIDAD
  ====================================*/

  getPriorityClass(
    priority: string,
  ): string {

    switch (priority) {

      case 'Alta':

        return 'high';

      case 'Media':

        return 'medium';

      case 'Baja':

        return 'low';

      default:

        return 'medium';

    }

  }

  /*====================================
    ICONO DE FORMA FARMACÉUTICA
  ====================================*/

  getFormIcon(
    form: string,
  ): string {

    switch (form) {

      case 'Cápsulas':

        return '💊';

      case 'Crema':

        return '🧴';

      case 'Gel':

        return '🧴';

      case 'Loción':

        return '🧴';

      case 'Jarabe':

        return '🥤';

      case 'Solución':

        return '🧪';

      case 'Inyectable':

        return '💉';

      default:

        return '💊';

    }

  }

}