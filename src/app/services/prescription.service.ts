import { Injectable } from '@angular/core';

import { Prescription }
from '../models/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private prescriptions:
    Prescription[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'prescriptions'
      );

    if (data) {

      this.prescriptions =
        JSON.parse(data);

    }
  }

  getPrescriptions() {

    return this.prescriptions;
  }

  addPrescription(
    prescription: Prescription
  ) {

    this.prescriptions.push(
      prescription
    );

    this.save();
  }

  updateStatus(
    id: number,
    status: string
  ) {

    const prescription =
      this.prescriptions.find(
        p => p.id === id
      );

    if (prescription) {

      prescription.status =
        status;

      this.save();
    }
  }

  private save() {

    localStorage.setItem(
      'prescriptions',
      JSON.stringify(
        this.prescriptions
      )
    );
  }

}