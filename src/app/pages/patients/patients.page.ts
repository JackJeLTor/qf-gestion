import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

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
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent
  ]
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

  constructor(
    private patientService:
      PatientService
  ) {}

  ngOnInit() {

    this.loadPatients();

  }

  loadPatients() {

    this.patients =
      this.patientService
        .getPatients();

  }

  addPatient() {

    if (
      !this.firstName ||
      !this.lastName
    ) {
      return;
    }

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
          this.address

      });

    this.loadPatients();

    this.documentType = 'DNI';
    this.documentNumber = '';
    this.firstName = '';
    this.lastName = '';
    this.birthDate = '';
    this.phone = '';
    this.email = '';
    this.address = '';

  }

  deletePatient(
    id: number
  ) {

    this.patientService
      .deletePatient(id);

    this.loadPatients();

  }

}