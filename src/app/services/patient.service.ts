import { Injectable } from '@angular/core';

import { Patient }
from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients:
    Patient[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'patients'
      );

    if (data) {

      this.patients =
        JSON.parse(data);

    }

  }

  getPatients() {

    return this.patients;

  }

  getPatientById(
    id: number
  ) {

    return this.patients.find(
      p => p.id === id
    );

  }

  addPatient(
    patient: Patient
  ) {

    this.patients.push(
      patient
    );

    this.save();

  }

  deletePatient(
    id: number
  ) {

    this.patients =
      this.patients.filter(
        p => p.id !== id
      );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'patients',
      JSON.stringify(
        this.patients
      )
    );

  }

}