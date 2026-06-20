import { Injectable } from '@angular/core';

import { ProductionConsumption } from '../models/production-consumption.model';

import { AuditService } from './audit.service';

@Injectable({
  providedIn: 'root',
})
export class ProductionConsumptionService {
  private consumptions: ProductionConsumption[] = [];

  constructor(private auditService: AuditService) {
    const data = localStorage.getItem('productionConsumptions');

    if (data) {
      this.consumptions = JSON.parse(data);
    }
  }

  getConsumptions() {
    return this.consumptions;
  }

  getConsumptionsByProduction(productionId: number) {
    return this.consumptions.filter((c) => c.productionId === productionId);
  }

  addConsumption(consumption: ProductionConsumption) {
    this.consumptions.push(consumption);

    this.auditService.addLog(
      'Producción',

      'Consumo Materia Prima',

      consumption.consumedBy,

      `Consumió ${consumption.quantity} ${consumption.unit} de ${consumption.rawMaterialName} (Lote ${consumption.lotNumber}) para producción ${consumption.batchNumber}`,
    );

    this.save();
  }

  private save() {
    localStorage.setItem(
      'productionConsumptions',

      JSON.stringify(this.consumptions),
    );
  }
}