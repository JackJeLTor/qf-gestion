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

  supplier = '';

  stock = 0;

  unit = '';

  expirationDate = '';

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

        supplier:
          this.supplier,

        stock:
          this.stock,

        unit:
          this.unit,

        expirationDate:
          this.expirationDate

      });

    this.loadRawMaterials();

    this.name = '';

    this.supplier = '';

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