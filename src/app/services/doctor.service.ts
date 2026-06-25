import { Injectable } from '@angular/core';

import { Doctor }
from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {

  private doctors:
    Doctor[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'doctors',
      );

    if (data) {

      this.doctors =
        JSON.parse(data);

    }

  }

  getDoctors() {

    return this.doctors;

  }

  getDoctorById(
    id: number,
  ) {

    return this.doctors.find(
      doctor =>
        doctor.id === id,
    );

  }

  addDoctor(
    doctor: Doctor,
  ) {

    this.doctors.push(
      doctor,
    );

    this.save();

  }

  updateDoctor(
    doctorUpdated: Doctor,
  ) {

    const index =
      this.doctors.findIndex(
        doctor =>
          doctor.id ===
          doctorUpdated.id,
      );

    if (index >= 0) {

      this.doctors[index] =
        doctorUpdated;

      this.save();

    }

  }

  deleteDoctor(
    id: number,
  ) {

    this.doctors =
      this.doctors.filter(
        doctor =>
          doctor.id !== id,
      );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'doctors',
      JSON.stringify(
        this.doctors,
      ),
    );

  }

}