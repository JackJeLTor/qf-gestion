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
  lowStock = 0;
  inventoryValue = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    const products =
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

}