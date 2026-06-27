import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonInput,
  IonItem,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { DeliveryService } from '../../services/delivery.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonInput,
    IonItem,
    IonMenuButton,
  ]
})
export class DeliveriesPage implements OnInit {

  deliveries: any[] = [];
  deliveredBy = '';
  receivedBy = '';
  observation = '';

  constructor(
    private deliveryService: DeliveryService,
    private prescriptionService: PrescriptionService,
    private productionService: ProductionService
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
    this.deliveries = this.deliveryService.getDeliveries();
  }

  createPendingDeliveries() {
    const productions = this.productionService.getProductions();

    productions.forEach(production => {
      const exists = this.deliveries.find(d => d.productionId === production.id);

      if (production.status === 'Lista para Entrega' && !exists) {
        this.deliveryService.addDelivery({
          id: Date.now() + Math.floor(Math.random() * 1000),
          productionId: production.id,
          patientName: production.patientName,
          batchNumber: production.batchNumber,
          formula: production.formula,
          responsible: production.responsible,
          deliveredBy: '',
          receivedBy: '',
          observation: '',
          deliveryDate: '',
          status: 'Pendiente',
          history: [
            `${new Date().toLocaleString()} - Entrega creada`
          ]
        });
      }
    });

    this.loadDeliveries();
  }

  markAsDelivered(delivery: any) {
    if (!this.deliveredBy || !this.receivedBy) {
      alert('Complete entregado por y recibido por');
      return;
    }

    delivery.deliveredBy = this.deliveredBy;
    delivery.receivedBy = this.receivedBy;
    delivery.observation = this.observation;
    delivery.deliveryDate = new Date().toLocaleString();
    delivery.status = 'Entregado';

    if (!delivery.history) {
      delivery.history = [];
    }

    delivery.history.push(
      `${delivery.deliveryDate} - Entregado por ${this.deliveredBy}`
    );
    delivery.history.push(
      `${delivery.deliveryDate} - Recibido por ${this.receivedBy}`
    );

    if (this.observation) {
      delivery.history.push(
        `${delivery.deliveryDate} - Observación: ${this.observation}`
      );
    }

    // SOLUCIÓN A LOS 4 ERRORES TS2554: Se agregó el tercer argumento obligatorio (description)
    this.productionService.addHistory(
      delivery.productionId,
      'Entrega realizada',
      `El lote ha cambiado de estado a Entregado el ${delivery.deliveryDate}`
    );

    this.productionService.addHistory(
      delivery.productionId,
      'Personal de Entrega',
      `Entregado por ${this.deliveredBy}`
    );

    this.productionService.addHistory(
      delivery.productionId,
      'Personal de Recepción',
      `Recibido por ${this.receivedBy}`
    );

    if (this.observation) {
      this.productionService.addHistory(
        delivery.productionId,
        'Observación registrada',
        `Observación: ${this.observation}`
      );
    }

    this.deliveryService.updateStatus(delivery.id, 'Entregado');

    const prescription = this.prescriptionService
      .getPrescriptions()
      .find(p => p.id === delivery.productionId);

    if (prescription) {
      prescription.status = 'Entregada';
      localStorage.setItem(
        'prescriptions',
        JSON.stringify(this.prescriptionService.getPrescriptions())
      );
    }

    this.deliveredBy = '';
    this.receivedBy = '';
    this.observation = '';
    this.loadDeliveries();
  }
}
