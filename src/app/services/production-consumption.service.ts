import { Injectable } from '@angular/core';

import { ProductionConsumption }
from '../models/production-consumption.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionConsumptionService {

  private consumptions:
    ProductionConsumption[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'productionConsumptions'
      );

    if (data) {

      this.consumptions =
        JSON.parse(data);

    }

  }

  getConsumptions() {

    return this.consumptions;

  }

  addConsumption(
    consumption:
      ProductionConsumption
  ) {

    this.consumptions.push(
      consumption
    );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'productionConsumptions',
      JSON.stringify(
        this.consumptions
      )
    );

  }

}