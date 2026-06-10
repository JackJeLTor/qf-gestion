import { Injectable } from '@angular/core';

import { Delivery }
from '../models/delivery.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private deliveries:
    Delivery[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'deliveries'
      );

    if (data) {

      this.deliveries =
        JSON.parse(data);

    }

  }

  getDeliveries() {

    return this.deliveries;

  }

  addDelivery(
    delivery: Delivery
  ) {

    this.deliveries.push(
      delivery
    );

    this.save();

  }

 updateStatus(
  id: number,
  status: string
) {

  const delivery =
    this.deliveries.find(
      d => d.id === id
    );

  if (delivery) {

    delivery.status =
      status;

    if (
      status === 'Entregado'
    ) {

      delivery.deliveryDate =
        new Date()
          .toLocaleString();

    }

    this.save();

  }

}

  private save() {

    localStorage.setItem(
      'deliveries',
      JSON.stringify(
        this.deliveries
      )
    );

  }

}