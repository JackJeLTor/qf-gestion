import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

private orders: Order[] = [];

  constructor() {

    const savedOrders =
      localStorage.getItem('orders');

    if (savedOrders) {

      this.orders =
        JSON.parse(savedOrders);

    }
  }

  getOrders() {
    return this.orders;
  }

  addOrder(order: Order){

    this.orders.push(order);

    this.saveOrders();
  }

  private saveOrders() {

    localStorage.setItem(
      'orders',
      JSON.stringify(this.orders)
    );
  }
}