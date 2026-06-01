import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovementService }
from '../../services/movement.service';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
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
    IonCardContent
  ]
})
export class ProductsPage {

  productName = '';
  productStock = 0;
  productPrice = 0;

  productCategory = '';
  productLaboratory = '';
  productExpirationDate = '';

  searchText = '';

  editingProductId: number | null = null;

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
  private productService: ProductService,
  private movementService: MovementService
) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {

    this.products =
      this.productService.getProducts();

    this.filteredProducts =
      [...this.products];
  }

  addProduct(): void {

    if (!this.productName.trim()) {
      return;
    }

    const newProduct: Product = {

      id: Date.now(),

      code: 'MED' + Date.now(),

      name: this.productName,

      category: this.productCategory,

      stock: this.productStock,

      price: this.productPrice,

      laboratory: this.productLaboratory,

      expirationDate: this.productExpirationDate
    };

    this.productService.addProduct(
      newProduct
    );
    
    this.movementService.addMovement({

  id: Date.now(),

  productName: this.productName,

  type: 'Ingreso',

  quantity: this.productStock,

  date: new Date()
    .toLocaleString()
});

    this.clearForm();

    this.loadProducts();
  }

  editProduct(product: Product): void {

    this.editingProductId =
      product.id;

    this.productName =
      product.name;

    this.productStock =
      product.stock;

    this.productPrice =
      product.price;

    this.productCategory =
      product.category;

    this.productLaboratory =
      product.laboratory;

    this.productExpirationDate =
      product.expirationDate;
  }

  updateProduct(): void {

    const product =
      this.products.find(
        p => p.id === this.editingProductId
      );

    if (!product) {
      return;
    }

    const updatedProduct: Product = {

      ...product,

      name: this.productName,

      stock: this.productStock,

      price: this.productPrice,

      category: this.productCategory,

      laboratory: this.productLaboratory,

      expirationDate: this.productExpirationDate
    };

    this.productService.updateProduct(
      updatedProduct
    );

    this.clearForm();

    this.loadProducts();
  }

  deleteProduct(id: number): void {

    this.productService.deleteProduct(id);

    this.loadProducts();
  }

  searchProduct(): void {

    this.filteredProducts =
      this.products.filter(product =>
        product.name
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )
      );
  }

  clearForm(): void {

    this.editingProductId = null;

    this.productName = '';
    this.productStock = 0;
    this.productPrice = 0;

    this.productCategory = '';
    this.productLaboratory = '';
    this.productExpirationDate = '';
  }

}