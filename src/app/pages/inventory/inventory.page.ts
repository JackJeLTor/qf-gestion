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

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
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
export class InventoryPage {

  products: any[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {

    this.products =
      this.productService.getProducts();
  }

  isNearExpiration(date: string): boolean {

    if (!date) {
      return false;
    }

    const today =
      new Date();

    const expiration =
      new Date(date);

    const difference =
      expiration.getTime() -
      today.getTime();

    const days =
      difference /
      (1000 * 60 * 60 * 24);

    return days <= 90;
  }

}