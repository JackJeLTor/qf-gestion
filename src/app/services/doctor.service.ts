import { Injectable } from '@angular/core';

import { Doctor }
from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctors:
    Doctor[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'doctors'
      );

    if (data) {

      this.doctors =
        JSON.parse(data);

    }

  }

  getDoctors() {

    return this.doctors;

  }

  addDoctor(
    doctor: Doctor
  ) {

    this.doctors.push(
      doctor
    );

    this.save();

  }

  deleteDoctor(
    id: number
  ) {

    this.doctors =
      this.doctors.filter(
        d => d.id !== id
      );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'doctors',
      JSON.stringify(
        this.doctors
      )
    );

  }

}