import { Injectable } from '@angular/core';

import {
  Production,
  ProductionMaterial
} from '../models/production.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  private productions: Production[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'productions'
      );

    if (data) {

      this.productions =
        JSON.parse(data);

    }

  }

  getProductions() {

    return this.productions;

  }

  addProduction(
    production: Production
  ) {

    this.productions.push(
      production
    );

    this.save();

  }

  updateStatus(
  id: number,
  status: string
) {

  const production =
    this.productions.find(
      p => p.id === id
    );

  if (!production) {
    return;
  }

  production.status =
    status;

  if (!production.history) {

    production.history = [];

  }

  production.history.push(
    `${new Date().toLocaleString()} - Estado actualizado a ${status}`
  );

  this.save();

}

  updateQuality(
    id: number,
    qualityResult: string,
    observations: string
  ) {

    const production =
      this.productions.find(
        p => p.id === id
      );

    if (production) {

      production.qualityResult =
        qualityResult;

      production.observations =
        observations;

      production.endDate =
        new Date()
          .toLocaleDateString();

      this.save();

    }

  }

  addRawMaterial(
    productionId: number,
    material: ProductionMaterial
  ) {

    const production =
      this.productions.find(
        p => p.id === productionId
      );

    if (production) {

      if (
        !production.rawMaterialsUsed
      ) {

        production.rawMaterialsUsed = [];

      }

      production.rawMaterialsUsed.push(
        material
      );

      if (
        !production.history
      ) {

        production.history = [];

      }

      production.history.push(
        `${new Date().toLocaleDateString()} - ${material.materialName} (${material.quantity} ${material.unit}) lote ${material.lotNumber}`
      );

      this.save();

    }

  }

  private save() {

    localStorage.setItem(
      'productions',
      JSON.stringify(
        this.productions
      )
    );

  }

}