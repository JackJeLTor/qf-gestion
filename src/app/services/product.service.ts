import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private products: Product[] = [];

  constructor() {

    const savedProducts =
      localStorage.getItem('products');

    if (savedProducts) {

      this.products =
        JSON.parse(savedProducts);

    } else {

      this.products = [
        {
  id: 1,
  code: 'MED001',
  name: 'Paracetamol',
  category: 'Analgésico',
  stock: 50,
  price: 1.5,
  laboratory: 'Genfar',
  expirationDate: '2026-12-31'
},
{
  id: 2,
  code: 'MED002',
  name: 'Ibuprofeno',
  category: 'Antiinflamatorio',
  stock: 30,
  price: 2,
  laboratory: 'Bayer',
  expirationDate: '2026-08-20'
},
{
  id: 3,
  code: 'MED003',
  name: 'Amoxicilina',
  category: 'Antibiótico',
  stock: 20,
  price: 3.5,
  laboratory: 'MK',
  expirationDate: '2025-11-15'
}
      ];

      this.saveProducts();
    }
  }

 getProducts(): Product[] {
  return this.products;
}

  addProduct(product: Product) {

    this.products.push(product);

    this.saveProducts();
  }

  private saveProducts() {

    localStorage.setItem(
      'products',
      JSON.stringify(this.products)
    );
  }
}