import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent
  ]
})
export class ReportsPage {

  totalProducts = 0;
  totalOrders = 0;
  totalSales = 0;
  lowStockProducts = 0;
  expiringProducts = 0;

  totalPrescriptions = 0;
  pendingPrescriptions = 0;

  activeProductions = 0;
  finishedProductions = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private prescriptionService: PrescriptionService,
    private productionService: ProductionService
  ) {}

  ionViewWillEnter() {

    const products =
      this.productService.getProducts();

    const orders =
      this.orderService.getOrders();

    const prescriptions =
      this.prescriptionService.getPrescriptions();

    const productions =
      this.productionService.getProductions();

    this.totalProducts =
      products.length;

    this.totalOrders =
      orders.length;

    this.totalPrescriptions =
      prescriptions.length;

    this.pendingPrescriptions =
      prescriptions.filter(
        p => p.status !== 'Entregada'
      ).length;

    this.activeProductions =
      productions.filter(
        p => p.status !== 'Finalizado'
      ).length;

    this.finishedProductions =
      productions.filter(
        p => p.status === 'Finalizado'
      ).length;

    this.totalSales =
      orders.reduce(
        (total, order) =>
          total + (order.total || 0),
        0
      );

    this.lowStockProducts =
      products.filter(
        product => product.stock < 10
      ).length;

    const currentDate =
      new Date();

    this.expiringProducts =
      products.filter(product => {

        const expirationDate =
          new Date(
            product.expirationDate
          );

        const difference =
          expirationDate.getTime() -
          currentDate.getTime();

        const days =
          difference /
          (1000 * 60 * 60 * 24);

        return days <= 180;

      }).length;
  }

}