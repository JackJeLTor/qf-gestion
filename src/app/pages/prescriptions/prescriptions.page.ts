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
  IonCardContent,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { PrescriptionService }
from '../../services/prescription.service';

import { ProductionService }
from '../../services/production.service';

import { PatientService }
from '../../services/patient.service';

import { DoctorService }
from '../../services/doctor.service';

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
    IonCardContent,
    IonSelect,
    IonSelectOption
  ]
})
export class PrescriptionsPage {

  patientId = 0;

  doctorId = 0;

  formula = '';

  priority = 'Media';

  responsible = '';

  deliveryDate = '';

  prescriptions: any[] = [];

  patients: any[] = [];

  doctors: any[] = [];

  constructor(
    private prescriptionService:
      PrescriptionService,

    private productionService:
      ProductionService,

    private patientService:
      PatientService,

    private doctorService:
      DoctorService
  ) {}

  ngOnInit() {

    this.loadPrescriptions();

    this.patients =
      this.patientService
        .getPatients();

    this.doctors =
      this.doctorService
        .getDoctors();

  }

  loadPrescriptions() {

    this.prescriptions =
      this.prescriptionService
        .getPrescriptions();

  }

  createPrescription() {

    const patient =
      this.patientService
        .getPatientById(
          this.patientId
        );

    const doctor =
      this.doctorService
        .getDoctorById(
          this.doctorId
        );

    if (
      !patient ||
      !doctor ||
      !this.formula ||
      !this.responsible ||
      !this.deliveryDate
    ) {
      return;
    }

    this.prescriptionService
      .addPrescription({

        id: Date.now(),

        patientId:
          patient.id,

        patientName:
          patient.firstName +
          ' ' +
          patient.lastName,

        doctorId:
          doctor.id,

        doctorName:
          doctor.name,

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

    this.patientId = 0;

    this.doctorId = 0;

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
  'Pendiente',

batchNumber:
  'LOT-' + Date.now(),

quantity: 1,

productionDate:
  new Date()
  .toLocaleDateString(),

rawMaterialsUsed: [],

history: [
  'Producción creada'
]
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