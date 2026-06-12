import { Injectable } from '@angular/core';

import { QualityControl }
from '../models/quality-control.model';

import { ProductionService }
from './production.service';

import { AuditService }
from './audit.service';

@Injectable({
  providedIn: 'root'
})
export class QualityControlService {

  private controls:
    QualityControl[] = [];

  constructor(
    private productionService:
      ProductionService,

    private auditService:
      AuditService
  ) {

    const data =
      localStorage.getItem(
        'qualityControls'
      );

    if (data) {

      this.controls =
        JSON.parse(data);

    }

  }

  getControls() {

    return this.controls;

  }

  approveProduction(
    id: number,
    responsible: string
  ) {

    const production =
      this.productionService
        .getProductions()
        .find(
          p => p.id === id
        );

    if (!production) {
      return;
    }

    const control:
      QualityControl = {

      id: Date.now(),

      productionId:
        production.id,

      patientName:
        production.patientName,

      batchNumber:
        production.batchNumber,

      responsible,

      result:
        'Aprobado',

      observation:
        'Producción aprobada',

      date:
        new Date()
          .toLocaleString()

    };

    this.controls.push(
      control
    );

    production.status =
      'Lista para Entrega';

    production.qualityResult =
      'Aprobado';

    production.qualityDate =
      new Date()
        .toLocaleString();

    production.qualityResponsible =
      responsible;

    production.qualityStatus =
      'Aprobado';

    production.endDate =
      new Date()
        .toLocaleString();

    if (!production.history) {

      production.history = [];

    }

    production.history.push(
      `${control.date} - Control de calidad aprobado por ${responsible}`
    );

    production.history.push(
      `${new Date().toLocaleString()} - Lote aprobado en Control de Calidad`
    );

    this.auditService.addLog(
      'Control Calidad',
      'Aprobación',
      responsible,
      `Producción ${production.batchNumber} aprobada`
    );

    this.save();

    localStorage.setItem(
      'productions',
      JSON.stringify(
        this.productionService
          .getProductions()
      )
    );

  }

  observeProduction(
    id: number,
    observation: string,
    responsible: string
  ) {

    const production =
      this.productionService
        .getProductions()
        .find(
          p => p.id === id
        );

    if (!production) {
      return;
    }

    const control:
      QualityControl = {

      id: Date.now(),

      productionId:
        production.id,

      patientName:
        production.patientName,

      batchNumber:
        production.batchNumber,

      responsible,

      result:
        'Observado',

      observation,

      date:
        new Date()
          .toLocaleString()

    };

    this.controls.push(
      control
    );

    production.status =
      'Observado';

    production.qualityResult =
      'Observado';

    production.qualityDate =
      new Date()
        .toLocaleString();

    production.qualityResponsible =
      responsible;

    production.qualityStatus =
      'Observado';

    production.observations =
      observation;

    if (!production.history) {

      production.history = [];

    }

    production.history.push(
      `${control.date} - Observado por ${responsible}: ${observation}`
    );

    production.history.push(
      `${new Date().toLocaleString()} - Lote observado: ${observation}`
    );

    this.auditService.addLog(
      'Control Calidad',
      'Observación',
      responsible,
      observation
    );

    this.save();

    localStorage.setItem(
      'productions',
      JSON.stringify(
        this.productionService
          .getProductions()
      )
    );

  }

  private save() {

    localStorage.setItem(
      'qualityControls',
      JSON.stringify(
        this.controls
      )
    );

  }

}