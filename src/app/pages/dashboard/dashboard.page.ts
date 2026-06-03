import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { MovementService } from '../../services/movement.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ProductionService } from '../../services/production.service';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class DashboardPage {

  totalProducts = 0;
  totalOrders = 0;
  lowStock = 0;
  inventoryValue = 0;
  expiringProducts = 0;

  totalPrescriptions = 0;
  pendingPrescriptions = 0;

  activeProductions = 0;
  finishedProductions = 0;

  recentMovements: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private movementService: MovementService,
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

    this.totalProducts = products.length;
    this.totalOrders = orders.length;

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

    this.lowStock =
      products.filter(
        p => p.stock < 10
      ).length;

    this.inventoryValue =
      products.reduce(
        (total, product) =>
          total + (product.stock * product.price),
        0
      );

    const today = new Date();

    this.expiringProducts =
      products.filter(product => {

        const expiration =
          new Date(
            product.expirationDate
          );

        const days =
          (expiration.getTime() -
            today.getTime()) /
          (1000 * 60 * 60 * 24);

        return days <= 90;

      }).length;

    this.recentMovements =
      this.movementService
        .getMovements()
        .slice(-5)
        .reverse();
  }

  goInventory() {
    this.router.navigate(['/inventory']);
  }

  goProducts() {
    this.router.navigate(['/products']);
  }

  goOrders() {
    this.router.navigate(['/orders']);
  }

  goReports() {
    this.router.navigate(['/reports']);
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  goPrescriptions() {
    this.router.navigate(['/prescriptions']);
  }

  goProductions() {
    this.router.navigate(['/productions']);
  }

}