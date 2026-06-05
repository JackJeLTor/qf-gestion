import { Injectable } from '@angular/core';

import { Laboratory }
from '../models/laboratory.model';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private laboratories:
    Laboratory[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'laboratories'
      );

    if (data) {

      this.laboratories =
        JSON.parse(data);

    }

  }

  getLaboratories() {

    return this.laboratories;

  }

  addLaboratory(
    laboratory: Laboratory
  ) {

    this.laboratories.push(
      laboratory
    );

    this.save();

  }

  deleteLaboratory(
    id: number
  ) {

    this.laboratories =
      this.laboratories.filter(
        l => l.id !== id
      );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'laboratories',
      JSON.stringify(
        this.laboratories
      )
    );

  }

}