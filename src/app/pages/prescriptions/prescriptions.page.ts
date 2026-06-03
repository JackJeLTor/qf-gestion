import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { PrescriptionService }
from '../../services/prescription.service';

import { ProductionService }
from '../../services/production.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonCard,
    IonCardContent
  ]
})
export class PrescriptionsPage {

  patientName = '';

  doctorName = '';

  formula = '';

  priority = 'Media';

  responsible = '';

  deliveryDate = '';

  prescriptions: any[] = [];

  constructor(
    private prescriptionService:
      PrescriptionService,

    private productionService:
      ProductionService
  ) {}

  ngOnInit() {

    this.loadPrescriptions();

  }

  loadPrescriptions() {

    this.prescriptions =
      this.prescriptionService
      .getPrescriptions();

  }

  createPrescription() {

    if (
      !this.patientName ||
      !this.doctorName ||
      !this.formula ||
      !this.responsible ||
      !this.deliveryDate
    ) {
      return;
    }

    this.prescriptionService
      .addPrescription({

        id: Date.now(),

        patientName:
          this.patientName,

        doctorName:
          this.doctorName,

        formula:
          this.formula,

        priority:
          this.priority,

        responsible:
          this.responsible,

        deliveryDate:
          this.deliveryDate,

        status:
          'Pendiente',

        date:
          new Date()
          .toLocaleDateString()

      });

    this.loadPrescriptions();

    this.patientName = '';
    this.doctorName = '';
    this.formula = '';
    this.priority = 'Media';
    this.responsible = '';
    this.deliveryDate = '';
  }

  nextStatus(
    prescription: any
  ) {

    switch (
      prescription.status
    ) {

      case 'Pendiente':

        this.prescriptionService
          .updateStatus(
            prescription.id,
            'Validada'
          );

        this.productionService
          .addProduction({

            id: Date.now(),

            prescriptionId:
              prescription.id,

            patientName:
              prescription.patientName,

            formula:
              prescription.formula,

            responsible:
              prescription.responsible,

            startDate:
              new Date()
              .toLocaleDateString(),
 endDate: '',

    qualityResult: '',

    observations: '',

    status:
      'Pendiente'

          });

        break;

      case 'Validada':

        this.prescriptionService
          .updateStatus(
            prescription.id,
            'En Preparación'
          );

        break;

      case 'En Preparación':

        this.prescriptionService
          .updateStatus(
            prescription.id,
            'Control de Calidad'
          );

        break;

      case 'Control de Calidad':

        this.prescriptionService
          .updateStatus(
            prescription.id,
            'Lista para Entrega'
          );

        break;

      case 'Lista para Entrega':

        this.prescriptionService
          .updateStatus(
            prescription.id,
            'Entregada'
          );

        break;

    }

    this.loadPrescriptions();

  }

}