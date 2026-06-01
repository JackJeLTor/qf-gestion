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

  addProduct(product: Product): void {

    this.products.push(product);

    this.saveProducts();
  }

  updateProduct(updatedProduct: Product): void {

    const index =
      this.products.findIndex(
        product => product.id === updatedProduct.id
      );

    if (index !== -1) {

      this.products[index] =
        updatedProduct;

      this.saveProducts();
    }
  }

  deleteProduct(id: number): void {

    this.products =
      this.products.filter(
        product => product.id !== id
      );

    this.saveProducts();
  }

  updateStock(
    productName: string,
    quantity: number
  ): boolean {

    const product =
      this.products.find(
        p => p.name === productName
      );

    if (!product) {
      return false;
    }

    if (product.stock < quantity) {
      return false;
    }

    product.stock =
      product.stock - quantity;

    this.saveProducts();

    return true;
  }

  private saveProducts(): void {

    localStorage.setItem(
      'products',
      JSON.stringify(this.products)
    );
  }

}