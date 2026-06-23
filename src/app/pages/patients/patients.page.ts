import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonMenuButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  searchOutline,
  createOutline,
} from 'ionicons/icons';

import { PatientService }
from '../../services/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
  standalone: true,
  imports: [
    FormsModule,

    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonMenuButton,
    IonIcon,
  ],
})
export class PatientsPage {

  documentType = 'DNI';

  documentNumber = '';

  firstName = '';

  lastName = '';

  birthDate = '';

  phone = '';

  email = '';

  address = '';

  patients: any[] = [];

  filteredPatients: any[] = [];

  searchTerm = '';

  showSearch = false;

  editingPatientId:
    number | null = null;

  constructor(
    private patientService:
      PatientService,
  ) {

    addIcons({
      searchOutline,
      createOutline,
    });

  }

  ngOnInit() {

    this.loadPatients();

  }

  loadPatients() {

    this.patients =
      this.patientService.getPatients();

    this.filteredPatients =
      [...this.patients];

  }

  toggleSearch() {

    this.showSearch =
      !this.showSearch;

    if (!this.showSearch) {

      this.searchTerm = '';

      this.filteredPatients =
        [...this.patients];

    }

  }

  searchPatients() {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!term) {

      this.filteredPatients =
        [...this.patients];

      return;

    }

    this.filteredPatients =
      this.patients.filter(
        patient =>

          patient.firstName
            .toLowerCase()
            .includes(term)

          ||

          patient.lastName
            .toLowerCase()
            .includes(term)

          ||

          patient.documentNumber
            .includes(term)
      );

  }

  private isValidEmail(
    email: string,
  ): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email,
    );

  }

  addPatient() {

    if (
      !this.documentNumber ||
      !this.firstName ||
      !this.lastName ||
      !this.birthDate ||
      !this.phone ||
      !this.email ||
      !this.address
    ) {

      alert(
        'Complete todos los campos',
      );

      return;

    }

    if (
      this.documentType === 'DNI'
    ) {

      if (
        !/^\d{8}$/.test(
          this.documentNumber,
        )
      ) {

        alert(
          'El DNI debe tener 8 dígitos',
        );

        return;

      }

    }

    if (
      !/^\d{9}$/.test(
        this.phone,
      )
    ) {

      alert(
        'El teléfono debe tener 9 dígitos',
      );

      return;

    }

    if (
      !this.isValidEmail(
        this.email,
      )
    ) {

      alert(
        'Correo inválido',
      );

      return;

    }

    const birth =
      new Date(
        this.birthDate,
      );

    const today =
      new Date();

    if (
      birth >= today
    ) {

      alert(
        'Fecha de nacimiento inválida',
      );

      return;

    }

    if (
      this.editingPatientId
    ) {

      this.patientService
        .updatePatient({

          id:
            this.editingPatientId,

          documentType:
            this.documentType,

          documentNumber:
            this.documentNumber,

          firstName:
            this.firstName,

          lastName:
            this.lastName,

          birthDate:
            this.birthDate,

          phone:
            this.phone,

          email:
            this.email,

          address:
            this.address,

        });

      this.editingPatientId =
        null;

    } else {

      this.patientService
        .addPatient({

          id: Date.now(),

          documentType:
            this.documentType,

          documentNumber:
            this.documentNumber,

          firstName:
            this.firstName,

          lastName:
            this.lastName,

          birthDate:
            this.birthDate,

          phone:
            this.phone,

          email:
            this.email,

          address:
            this.address,

        });

    }

    this.loadPatients();

    this.clearForm();

  }

  editPatient(
    patient: any,
  ) {

    this.editingPatientId =
      patient.id;

    this.documentType =
      patient.documentType;

    this.documentNumber =
      patient.documentNumber;

    this.firstName =
      patient.firstName;

    this.lastName =
      patient.lastName;

    this.birthDate =
      patient.birthDate;

    this.phone =
      patient.phone;

    this.email =
      patient.email;

    this.address =
      patient.address;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  }

  cancelEdit() {

    this.editingPatientId =
      null;

    this.clearForm();

  }

  deletePatient(
    id: number,
  ) {

    const confirmed =
      confirm(
        '¿Eliminar paciente?',
      );

    if (!confirmed) {

      return;

    }

    this.patientService
      .deletePatient(id);

    this.loadPatients();

  }

  clearForm() {

    this.documentType =
      'DNI';

    this.documentNumber =
      '';

    this.firstName =
      '';

    this.lastName =
      '';

    this.birthDate =
      '';

    this.phone =
      '';

    this.email =
      '';

    this.address =
      '';

  }

}