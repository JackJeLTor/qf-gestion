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

  selectedPrice = 0;
  selectedStock = 0;
  totalAmount = 0;

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.products =
      this.productService.getProducts();

    this.orders =
      this.orderService.getOrders();
  }

  onProductChange() {

    const product =
      this.products.find(
        p => p.name === this.selectedProduct
      );

    if (!product) {
      return;
    }

    this.selectedPrice =
      product.price;

    this.selectedStock =
      product.stock;

    this.calculateTotal();
  }

  calculateTotal() {

    this.totalAmount =
      this.selectedPrice *
      this.quantity;
  }

  createOrder() {

    if (
      !this.clientName ||
      !this.selectedProduct
    ) {
      return;
    }

    const stockUpdated =
      this.productService.updateStock(
        this.selectedProduct,
        this.quantity
      );

    if (!stockUpdated) {

      alert(
        'Stock insuficiente para realizar el pedido'
      );

      return;
    }

    this.orderService.addOrder({
      client: this.clientName,
      product: this.selectedProduct,
      quantity: this.quantity,
      total: this.totalAmount,
      date: new Date().toLocaleDateString()
    });

    this.loadData();

    this.clientName = '';
    this.selectedProduct = '';
    this.quantity = 1;

    this.selectedPrice = 0;
    this.selectedStock = 0;
    this.totalAmount = 0;
  }

}