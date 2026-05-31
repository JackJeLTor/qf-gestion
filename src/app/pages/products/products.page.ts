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
  IonCardContent
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';

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

  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {

    this.products =
      this.productService.getProducts();

    this.filteredProducts =
      [...this.products];
  }

  addProduct() {

    if (!this.productName.trim()) {
      return;
    }

    this.productService.addProduct({
      id: Date.now(),
      code: 'MED' + Date.now(),
      name: this.productName,
      category: this.productCategory,
stock: this.productStock,
price: this.productPrice,
laboratory: this.productLaboratory,
expirationDate: this.productExpirationDate
    });

    this.clearForm();

    this.loadProducts();
  }

  editProduct(product: any) {

    this.editingProductId = product.id;

    this.productName = product.name;
    this.productStock = product.stock;
    this.productPrice = product.price;
    this.productCategory = product.category;
this.productLaboratory = product.laboratory;
this.productExpirationDate = product.expirationDate;
  }

  updateProduct() {

    const product =
      this.products.find(
        p => p.id === this.editingProductId
      );

    if (!product) {
      return;
    }

    product.name = this.productName;
    product.stock = this.productStock;
    product.price = this.productPrice;
    product.category = this.productCategory;
product.laboratory = this.productLaboratory;
product.expirationDate = this.productExpirationDate;

    localStorage.setItem(
      'products',
      JSON.stringify(this.products)
    );

    this.clearForm();

    this.loadProducts();
  }

  deleteProduct(id: number) {

    const index =
      this.products.findIndex(
        product => product.id === id
      );

    if (index > -1) {

      this.products.splice(index, 1);

      localStorage.setItem(
        'products',
        JSON.stringify(this.products)
      );

      this.loadProducts();
    }
  }

  searchProduct() {

    this.filteredProducts =
      this.products.filter(product =>
        product.name
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )
      );
  }

  clearForm() {

    this.editingProductId = null;

    this.productName = '';
    this.productStock = 0;
    this.productPrice = 0;
    this.productCategory = '';
this.productLaboratory = '';
this.productExpirationDate = '';
  }

}