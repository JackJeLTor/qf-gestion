import { Injectable } from '@angular/core';

import {
  Production,
  ProductionMaterial
} from '../models/production.model';

import { AuditService }
from './audit.service';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {

  private productions:
    Production[] = [];

  constructor(
    private auditService:
      AuditService
  ) {

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

    this.auditService.addLog(
      'Producción',
      'Crear',
      production.responsible,
      `Producción creada para ${production.patientName}`
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

    if (
      !production.history
    ) {

      production.history = [];

    }

    production.history.push(
      `${new Date().toLocaleString()} - Estado actualizado a ${status}`
    );

    this.auditService.addLog(
      'Producción',
      'Cambio Estado',
      production.responsible,
      `Producción ${production.batchNumber} cambió a ${status}`
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

    if (!production) {
      return;
    }

    production.qualityResult =
      qualityResult;

    production.observations =
      observations;

    production.endDate =
      new Date()
        .toLocaleDateString();

    this.auditService.addLog(
      'Producción',
      'Control Calidad',
      production.responsible,
      `Resultado: ${qualityResult}`
    );

    this.save();

  }

  addRawMaterial(
    productionId: number,
    material: ProductionMaterial
  ) {

    const production =
      this.productions.find(
        p => p.id === productionId
      );

    if (!production) {
      return;
    }

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

    this.auditService.addLog(
      'Producción',
      'Consumo Materia Prima',
      material.consumedBy,
      `${material.materialName} lote ${material.lotNumber}`
    );

    this.save();

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