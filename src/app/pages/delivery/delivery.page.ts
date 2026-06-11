import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { DeliveryService }
from '../../services/delivery.service';

import { PrescriptionService }
from '../../services/prescription.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class DeliveriesPage {

  deliveries: any[] = [];

  constructor(
    private deliveryService:
      DeliveryService,

    private prescriptionService:
      PrescriptionService
  ) {}

  ngOnInit() {

    this.loadDeliveries();

    this.createPendingDeliveries();

  }

  ionViewWillEnter() {

    this.loadDeliveries();

    this.createPendingDeliveries();

  }

  loadDeliveries() {

    this.deliveries =
      this.deliveryService
        .getDeliveries();

  }

  createPendingDeliveries() {

    const prescriptions =
      this.prescriptionService
        .getPrescriptions();

    prescriptions.forEach(
      prescription => {

        const exists =
          this.deliveries.find(
            d =>
              d.productionId ===
              prescription.id
          );

        if (
          prescription.status ===
            'Lista para Entrega' &&
          !exists
        ) {

          this.deliveryService
            .addDelivery({

              id:
                Date.now() +
                Math.floor(
                  Math.random() * 1000
                ),

              productionId:
                prescription.id,

              patientName:
                prescription.patientName,

              formula:
                prescription.formula,

              responsible:
                prescription.responsible,

              deliveryDate: '',

              status:
                'Pendiente'

            });

        }

      }
    );

    this.loadDeliveries();

  }

  markAsDelivered(
  delivery: any
) {

  this.deliveryService
    .updateStatus(
      delivery.id,
      'Entregado'
    );

  const prescription =
    this.prescriptionService
      .getPrescriptions()
      .find(
        p => p.id === delivery.productionId
      );

  if (prescription) {

    prescription.status =
      'Entregada';

    localStorage.setItem(
      'prescriptions',
      JSON.stringify(
        this.prescriptionService
          .getPrescriptions()
      )
    );

  }

  this.loadDeliveries();

}}