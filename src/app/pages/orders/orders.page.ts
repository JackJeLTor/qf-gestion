import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption
  ]
})
export class OrdersPage {

  clientName = '';
  selectedProduct = '';
  quantity = 1;

  products: any[] = [];
  orders: any[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    this.products =
      this.productService.getProducts();

    this.orders =
      this.orderService.getOrders();
  }

  createOrder() {

    if (
      !this.clientName ||
      !this.selectedProduct
    ) {
      return;
    }

    this.orderService.addOrder({
      client: this.clientName,
      product: this.selectedProduct,
      quantity: this.quantity,
      date: new Date().toLocaleDateString()
    });

    this.orders =
      this.orderService.getOrders();

    this.clientName = '';
    this.selectedProduct = '';
    this.quantity = 1;
  }

}