import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { DeliveryService }
from '../../services/delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './delivery.page.html',
styleUrls: ['./delivery.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton
  ]
})
export class DeliveriesPage {

  deliveries: any[] = [];

  constructor(
    private deliveryService:
      DeliveryService
  ) {}

  ngOnInit() {

    this.loadDeliveries();

  }

  ionViewWillEnter() {

    this.loadDeliveries();

  }

  loadDeliveries() {

    this.deliveries =
      this.deliveryService
        .getDeliveries();

  }

  deliver(
    delivery: any
  ) {

    this.deliveryService
      .updateStatus(
        delivery.id,
        'Entregado'
      );

    this.loadDeliveries();

  }

}