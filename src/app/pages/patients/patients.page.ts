import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { PatientService } from '../../services/patient.service';

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
    IonCardContent,

    IonButtons,
    IonMenuButton,
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

  constructor(
    private patientService: PatientService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.loadPatients();

  }

  loadPatients() {

    this.patients =
      this.patientService.getPatients();

  }

  goBack() {

    this.router.navigate(['/dashboard']);

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
      this.documentType === 'CE'
    ) {

      if (
        !/^\d{9,12}$/.test(
          this.documentNumber,
        )
      ) {

        alert(
          'El Carnet de Extranjería debe tener entre 9 y 12 dígitos',
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

    this.patientService.addPatient({
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
    id: number,
  ) {

    this.patientService
      .deletePatient(id);

    this.loadPatients();

  }

}