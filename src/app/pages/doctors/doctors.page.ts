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

import { DoctorService }
from '../../services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
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
export class DoctorsPage {

  name = '';

  cmp = '';

  specialty = '';

  phone = '';

  email = '';

  doctors: any[] = [];

  constructor(
    private doctorService:
      DoctorService
  ) {}

  ngOnInit() {

    this.loadDoctors();

  }

  loadDoctors() {

    this.doctors =
      this.doctorService
      .getDoctors();

  }

  addDoctor() {

    if (!this.name) {
      return;
    }

    this.doctorService
      .addDoctor({

        id: Date.now(),

        name:
          this.name,

        cmp:
          this.cmp,

        specialty:
          this.specialty,

        phone:
          this.phone,

        email:
          this.email

      });

    this.loadDoctors();

    this.name = '';

    this.cmp = '';

    this.specialty = '';

    this.phone = '';

    this.email = '';

  }

  deleteDoctor(
    id: number
  ) {

    this.doctorService
      .deleteDoctor(id);

    this.loadDoctors();

  }

}