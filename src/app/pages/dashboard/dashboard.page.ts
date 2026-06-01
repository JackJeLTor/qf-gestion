import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
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
    IonButton,
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

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ionViewWillEnter() {

    const products: Product[] =
      this.productService.getProducts();

    const orders =
      this.orderService.getOrders();

    this.totalProducts =
      products.length;

    this.totalOrders =
      orders.length;

    this.lowStock =
      products.filter(
        product => product.stock < 10
      ).length;

    this.inventoryValue =
      products.reduce(
        (total, product) =>
          total + (product.stock * product.price),
        0
      );
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

}