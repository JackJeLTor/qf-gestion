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

  dni = '';

  fullName = '';

  age = 0;

  gender = '';

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
      !this.dni ||
      !this.fullName
    ) {
      return;
    }

    this.patientService
      .addPatient({

        id: Date.now(),

        dni:
          this.dni,

        fullName:
          this.fullName,

        age:
          this.age,

        gender:
          this.gender,

        phone:
          this.phone,

        email:
          this.email,

        address:
          this.address

      });

    this.loadPatients();

    this.dni = '';
    this.fullName = '';
    this.age = 0;
    this.gender = '';
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