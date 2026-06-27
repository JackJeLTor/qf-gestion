import { Injectable } from '@angular/core';

import {
  Production,
  ProductionMaterial,
  ProductionHistory,
} from '../models/production.model';

import { AuditService } from './audit.service';

@Injectable({
  providedIn: 'root',
})
export class ProductionService {
  private productions: Production[] = [];

  constructor(private auditService: AuditService) {
    const data = localStorage.getItem('productions');

    if (data) {
      this.productions = JSON.parse(data);
    }
  }

  /*====================================================
    PRODUCCIONES
  ====================================================*/

  getProductions(): Production[] {
    return this.productions;
  }

  getProductionById(id: number): Production | undefined {
    return this.productions.find((production) => production.id === id);
  }

  getProductionsByStatus(status: string): Production[] {
    return this.productions.filter(
      (production) => production.status === status,
    );
  }

  getProductionsByResponsible(responsible: string): Production[] {
    return this.productions.filter((production) =>
      production.responsible.toLowerCase().includes(responsible.toLowerCase()),
    );
  }

  /*====================================================
    CREAR PRODUCCIÓN
  ====================================================*/

  addProduction(production: Production): void {
    if (!production.rawMaterialsUsed) {
      production.rawMaterialsUsed = [];
    }

    if (!production.history) {
      production.history = [];
    }

    production.history.push({
      date: new Date().toLocaleString(),

      action: 'Creación',

      description: 'Producción creada desde una receta magistral validada.',
    });

    this.productions.push(production);

    this.auditService.addLog(
      'Producción',

      'Crear',

      production.responsible,

      `Producción creada para ${production.patientName}`,
    );

    this.save();
  }

  /*====================================================
    CAMBIO DE ESTADO
  ====================================================*/

  updateStatus(
    id: number,

    status: string,
  ): void {
    const production = this.getProductionById(id);

    if (!production) {
      return;
    }

    production.status = status;

    production.history.push({
      date: new Date().toLocaleString(),

      action: 'Cambio de Estado',

      description: `Estado actualizado a "${status}".`,
    });

    this.auditService.addLog(
      'Producción',

      'Cambio Estado',

      production.responsible,

      `${production.batchNumber} → ${status}`,
    );

    this.save();
  }

  /*====================================================
    FINALIZAR PRODUCCIÓN
  ====================================================*/

  completeProduction(id: number): void {
    const production = this.getProductionById(id);

    if (!production) {
      return;
    }

    production.status = 'Finalizado';

    production.endDate = new Date().toLocaleDateString();

    production.qualityStatus = 'Aprobado';

    production.qualityResult = 'Aprobado';

    production.qualityDate = new Date().toLocaleDateString();

    production.qualityResponsible = production.responsible;

    production.history.push({
      date: new Date().toLocaleString(),

      action: 'Producción Finalizada',

      description: 'La producción terminó correctamente.',
    });

    this.auditService.addLog(
      'Producción',

      'Finalizar',

      production.responsible,

      production.batchNumber,
    );

    this.save();
  }

  /*====================================================
    CONTROL DE CALIDAD
  ====================================================*/

  updateQuality(
    id: number,

    qualityResult: string,

    observations: string,
  ): void {
    const production = this.getProductionById(id);

    if (!production) {
      return;
    }

    production.qualityResult = qualityResult;

    production.qualityStatus = qualityResult;

    production.qualityResponsible = production.responsible;

    production.qualityDate = new Date().toLocaleDateString();

    production.observations = observations;

    production.history.push({
      date: new Date().toLocaleString(),

      action: 'Control de Calidad',

      description: `${qualityResult}. ${observations}`,
    });

    if (qualityResult === 'Aprobado') {
      production.status = 'Finalizado';

      production.endDate = new Date().toLocaleDateString();
    }

    this.auditService.addLog(
      'Producción',

      'Control Calidad',

      production.responsible,

      qualityResult,
    );

    this.save();
  }

  /*====================================================
    MATERIAS PRIMAS
  ====================================================*/

  addRawMaterial(
    productionId: number,

    material: ProductionMaterial,
  ): void {
    const production = this.getProductionById(productionId);

    if (!production) {
      return;
    }

    production.rawMaterialsUsed.push(material);

    production.history.push({
      date: new Date().toLocaleString(),

      action: 'Materia Prima',

      description: `${material.materialName} (${material.quantity} ${material.unit}) - Lote ${material.lotNumber}`,
    });

    this.auditService.addLog(
      'Producción',

      'Materia Prima',

      material.consumedBy,

      `${material.materialName} (${material.lotNumber})`,
    );

    this.save();
  }
  /*====================================================
    HISTORIAL
  ====================================================*/

  addHistory(
    productionId: number,

    action: string,

    description: string,
  ): void {
    const production = this.getProductionById(productionId);

    if (!production) {
      return;
    }

    production.history.push({
      date: new Date().toLocaleString(),

      action,

      description,
    });

    this.auditService.addLog(
      'Producción',

      action,

      production.responsible,

      description,
    );

    this.save();
  }

  getLastHistory(production: Production): ProductionHistory | null {
    if (!production.history || production.history.length === 0) {
      return null;
    }

    return production.history[production.history.length - 1];
  }

  /*====================================================
    ESTADO VISUAL
  ====================================================*/

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pendiente':
        return 'pending';

      case 'En Producción':
        return 'production';

      case 'Control Calidad':
        return 'quality';

      case 'Finalizado':
        return 'completed';

      case 'Observado':
        return 'observed';

      default:
        return 'pending';
    }
  }

  /*====================================================
    PROGRESO
  ====================================================*/

  getProgress(status: string): number {
    switch (status) {
      case 'Pendiente':
        return 20;

      case 'En Producción':
        return 60;

      case 'Control Calidad':
        return 85;

      case 'Finalizado':
        return 100;

      case 'Observado':
        return 85;

      default:
        return 0;
    }
  }

  /*====================================================
    DÍAS TRANSCURRIDOS
  ====================================================*/

  getDaysElapsed(startDate: string): number {
    if (!startDate) {
      return 0;
    }

    const start = new Date(startDate);

    const today = new Date();

    const difference = today.getTime() - start.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  /*====================================================
    INDICADORES
  ====================================================*/

  getTotalProductions(): number {
    return this.productions.length;
  }

  getCompletedProductions(): number {
    return this.productions.filter(
      (production) => production.status === 'Finalizado',
    ).length;
  }

  getPendingProductions(): number {
    return this.productions.filter(
      (production) => production.status !== 'Finalizado',
    ).length;
  }

  getTodayProductions(): Production[] {
    const today = new Date().toLocaleDateString();

    return this.productions.filter(
      (production) => production.productionDate === today,
    );
  }

  getHighPriorityProductions(): Production[] {
    return this.productions.filter(
      (production) => production.priority === 'Alta',
    );
  }

  getLateProductions(): Production[] {
    const today = new Date();

    return this.productions.filter((production) => {
      if (production.status === 'Finalizado') {
        return false;
      }

      if (!production.deliveryDate) {
        return false;
      }

      return new Date(production.deliveryDate) < today;
    });
  }

  getAverageProductionTime(): number {
    const completed = this.productions.filter(
      (production) => production.startDate && production.endDate,
    );

    if (completed.length === 0) {
      return 0;
    }

    let totalDays = 0;

    completed.forEach((production) => {
      const start = new Date(production.startDate);

      const end = new Date(production.endDate);

      totalDays += Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
    });

    return Math.round(totalDays / completed.length);
  }

  /*====================================================
    GUARDAR
  ====================================================*/

  private save(): void {
    localStorage.setItem(
      'productions',

      JSON.stringify(this.productions),
    );
  }
}
