import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliveryService }
from '../../services/delivery.service';


import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';

import { ProductionService }
from '../../services/production.service';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.page.html',
  styleUrls: ['./quality-control.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonItem,
    IonInput
  ]
})
export class QualityControlPage {

  productions: any[] = [];

  constructor(
  private productionService:
    ProductionService,

  private deliveryService:
    DeliveryService
) {}
  ngOnInit() {

    this.loadProductions();

  }

  ionViewWillEnter() {

    this.loadProductions();

  }

  loadProductions() {

    this.productions =
      this.productionService
        .getProductions()
        .filter(
          p =>
            p.status ===
            'Control Calidad'
        );

  }

 approve(
  production: any
) {

  this.productionService
    .updateQuality(
      production.id,
      'APROBADO',
      production.observations || ''
    );

  this.productionService
    .updateStatus(
      production.id,
      'Finalizado'
    );

  this.deliveryService
    .addDelivery({

      id: Date.now(),

      productionId:
        production.id,

      patientName:
        production.patientName,

      formula:
        production.formula,

      responsible:
        production.responsible,

      deliveryDate:
        '',

      status:
        'Pendiente'

    });

  this.loadProductions();

}

reject(
  production: any
) {

  this.productionService
    .updateQuality(
      production.id,
      'RECHAZADO',
      production.observations || ''
    );

  this.productionService
    .updateStatus(
      production.id,
      'Observado'
    );

  this.loadProductions();

}

}