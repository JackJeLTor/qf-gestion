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

import { RawMaterialService }
from '../../services/raw-material.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.page.html',
  styleUrls: ['./raw-materials.page.scss'],
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
export class RawMaterialsPage {

  name = '';

  category = '';

  laboratoryName = '';

  lotNumber = '';

  stock = 0;

  unit = '';

  expirationDate = '';

  minimumStock = 10;

  rawMaterials: any[] = [];

  constructor(
    private rawMaterialService:
      RawMaterialService
  ) {}

  ngOnInit() {

    this.loadRawMaterials();

  }

  loadRawMaterials() {

    this.rawMaterials =
      this.rawMaterialService
      .getRawMaterials();

  }

  calculateStatus() {

    const today =
      new Date();

    const expiration =
      new Date(
        this.expirationDate
      );

    const days =
      (
        expiration.getTime() -
        today.getTime()
      ) /
      (
        1000 * 60 * 60 * 24
      );

    if (this.stock <= 10) {

      return 'Stock Bajo';

    }

    if (days <= 90) {

      return 'Próximo a Vencer';

    }

    return 'Disponible';

  }

  addRawMaterial() {

    if (!this.name) {
      return;
    }

    this.rawMaterialService
      .addRawMaterial({

        id: Date.now(),

        code:
          'MP' + Date.now(),

        name:
          this.name,

        category:
          this.category,

        laboratoryName:
          this.laboratoryName,

        lotNumber:
          this.lotNumber,

        stock:
          this.stock,

        unit:
          this.unit,

        expirationDate:
          this.expirationDate,

        status:
          this.calculateStatus(),

        minimumStock:
          this.minimumStock

      });

    this.loadRawMaterials();

    this.name = '';

    this.category = '';

    this.laboratoryName = '';

    this.lotNumber = '';

    this.stock = 0;

    this.unit = '';

    this.expirationDate = '';

  }

  deleteRawMaterial(
    id: number
  ) {

    this.rawMaterialService
      .deleteRawMaterial(id);

    this.loadRawMaterials();

  }

}