import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonMenuButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  searchOutline,
  addOutline,
  closeOutline,
} from 'ionicons/icons';

import { PrescriptionService }
from '../../services/prescription.service';

import { ProductionService }
from '../../services/production.service';

import { PatientService }
from '../../services/patient.service';

import { DoctorService }
from '../../services/doctor.service';

import { AuditService }
from '../../services/audit.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.page.html',
  styleUrls: ['./prescriptions.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,

    IonMenuButton,
    IonIcon,

    IonFab,
    IonFabButton,

    IonModal,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
  ],
})
export class PrescriptionsPage {

  patientId = 0;

  doctorId = 0;

  formula = '';

  pharmaceuticalForm = '';

  specialty = '';

  priority = 'Media';

  responsible = '';

  deliveryDate = '';

  prescriptions: any[] = [];

  filteredPrescriptions: any[] = [];

  patients: any[] = [];

  doctors: any[] = [];

  searchTerm = '';

  showSearch = false;

  showPrescriptionModal = false;

  constructor(
    private prescriptionService:
      PrescriptionService,

    private productionService:
      ProductionService,

    private patientService:
      PatientService,

    private doctorService:
      DoctorService,

    private auditService:
      AuditService
  ) {

    addIcons({
      searchOutline,
      addOutline,
      closeOutline,
    });

  }

  nextStatus(
  prescription: any,
) {

  switch (
    prescription.status
  ) {

    case 'Pendiente':

      this.prescriptionService
        .updateStatus(
          prescription.id,
          'Validada',
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

          qualityDate: '',

          qualityResponsible: '',

          qualityStatus:
            'Pendiente',

          qualityResult: '',

          observations: '',

          status:
            'Pendiente',

          batchNumber:
            'LOT-' +
            Date.now(),

          quantity: 1,

          productionDate:
            new Date()
              .toLocaleDateString(),

          pharmaceuticalForm:
            prescription.pharmaceuticalForm,

          specialty:
            prescription.specialty,

          priority:
            prescription.priority,

          rawMaterialsUsed: [],

          history: [
            'Producción creada desde receta validada',
          ],

        });

      break;

    case 'Validada':

      this.prescriptionService
        .updateStatus(
          prescription.id,
          'En Preparación',
        );

      break;

    case 'En Preparación':

      this.prescriptionService
        .updateStatus(
          prescription.id,
          'Control de Calidad',
        );

      break;

    case 'Control de Calidad':

      this.prescriptionService
        .updateStatus(
          prescription.id,
          'Lista para Entrega',
        );

      break;

    case 'Lista para Entrega':

      this.prescriptionService
        .updateStatus(
          prescription.id,
          'Entregada',
        );

      break;

  }

  this.loadPrescriptions();

}

  ngOnInit() {

    this.loadPrescriptions();

    this.patients =
      this.patientService.getPatients();

    this.doctors =
      this.doctorService.getDoctors();

  }

  loadPrescriptions() {

    this.prescriptions =
      this.prescriptionService
        .getPrescriptions();

    this.filteredPrescriptions =
      [...this.prescriptions];

  }

  toggleSearch() {

    this.showSearch =
      !this.showSearch;

    if (!this.showSearch) {

      this.searchTerm = '';

      this.filteredPrescriptions =
        [...this.prescriptions];

    }

  }

  searchPrescriptions() {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!term) {

      this.filteredPrescriptions =
        [...this.prescriptions];

      return;

    }

    this.filteredPrescriptions =
      this.prescriptions.filter(
        prescription =>

          prescription.patientName
            .toLowerCase()
            .includes(term)

          ||

          prescription.doctorName
            .toLowerCase()
            .includes(term)

          ||

          prescription.status
            .toLowerCase()
            .includes(term)
      );

  }

  openNewPrescriptionModal() {

    this.clearForm();

    this.showPrescriptionModal =
      true;

  }

  closePrescriptionModal() {

    this.showPrescriptionModal =
      false;

  }

  onDoctorChange() {

    const doctor =
      this.doctors.find(
        d => d.id === this.doctorId
      );

    if (doctor) {

      this.specialty =
        doctor.specialty;

    }

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

    if (!patient) {

      alert(
        'Seleccione un paciente'
      );

      return;

    }

    if (!doctor) {

      alert(
        'Seleccione un médico'
      );

      return;

    }

    if (!this.pharmaceuticalForm) {

      alert(
        'Seleccione la forma farmacéutica'
      );

      return;

    }

    if (
      this.responsible
        .trim()
        .length < 3
    ) {

      alert(
        'Ingrese un responsable válido'
      );

      return;

    }

    if (
      this.formula
        .trim()
        .length < 10
    ) {

      alert(
        'La fórmula debe tener al menos 10 caracteres'
      );

      return;

    }

    const today =
      new Date()
        .toISOString()
        .split('T')[0];

    if (
      this.deliveryDate <
      today
    ) {

      alert(
        'La fecha de entrega no puede ser anterior a hoy'
      );

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
          doctor.firstName +
          ' ' +
          doctor.lastName,

        formula:
          this.formula,

        pharmaceuticalForm:
          this.pharmaceuticalForm,

        specialty:
          this.specialty,

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
            .toLocaleDateString(),

      });

    this.loadPrescriptions();

    this.closePrescriptionModal();

    this.clearForm();

  }

  clearForm() {

    this.patientId = 0;

    this.doctorId = 0;

    this.formula = '';

    this.pharmaceuticalForm = '';

    this.specialty = '';

    this.priority = 'Media';

    this.responsible = '';

    this.deliveryDate = '';

  }

}