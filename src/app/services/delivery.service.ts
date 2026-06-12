import { Injectable } from '@angular/core';

import { Delivery }
from '../models/delivery.model';

import { AuditService }
from './audit.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private deliveries:
    Delivery[] = [];

  constructor(
    private auditService:
      AuditService
  ) {

    const data =
      localStorage.getItem(
        'deliveries'
      );

    if (data) {

      this.deliveries =
        JSON.parse(data);

    }

  }

  getDeliveries(): Delivery[] {

    return this.deliveries;

  }

  addDelivery(
    delivery: Delivery
  ): void {

    this.deliveries.push(
      delivery
    );

    this.auditService.addLog(
      'Entregas',
      'Registro',
      delivery.responsible,
      `Entrega creada para ${delivery.patientName}`
    );

    this.save();

  }

  updateStatus(
    id: number,
    status: string
  ): void {

    const delivery =
      this.deliveries.find(
        d => d.id === id
      );

    if (!delivery) {
      return;
    }

    delivery.status =
      status;

    if (
      status === 'Entregado'
    ) {

      delivery.deliveryDate =
        new Date()
          .toLocaleString();

      this.auditService.addLog(
        'Entregas',
        'Entrega',
        delivery.responsible,
        `Entrega realizada a ${delivery.patientName}`
      );

    }

    this.save();

  }

  deleteDelivery(
    id: number
  ): void {

    this.deliveries =
      this.deliveries.filter(
        d => d.id !== id
      );

    this.save();

  }

  private save(): void {

    localStorage.setItem(
      'deliveries',
      JSON.stringify(
        this.deliveries
      )
    );

  }

}