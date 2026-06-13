import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput
} from '@ionic/angular/standalone';

import { ProductionService }
from '../../services/production.service';

import { RawMaterialService }
from '../../services/raw-material.service';

@Component({
  selector: 'app-production-materials',
  templateUrl:
    './production-materials.page.html',
  styleUrls:
    ['./production-materials.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonInput
  ]
})
export class ProductionMaterialsPage {

  productionId = 0;

  rawMaterialId = 0;

  quantity = 0;

  consumedBy = '';

  productions: any[] = [];

  rawMaterials: any[] = [];

  constructor(
    private productionService:
      ProductionService,

    private rawMaterialService:
      RawMaterialService
  ) {}

  ngOnInit() {

    this.productions =
      this.productionService
        .getProductions();

    this.rawMaterials =
      this.rawMaterialService
        .getRawMaterials();

  }

  assignMaterial() {

    const production =
      this.productions.find(
        p => p.id === this.productionId
      );

    const material =
      this.rawMaterials.find(
        m => m.id === this.rawMaterialId
      );

    if (
      !production ||
      !material ||
      this.quantity <= 0 ||
      !this.consumedBy
    ) {
      return;
    }

    if (
      this.quantity >
      material.stock
    ) {

      alert(
        'Stock insuficiente'
      );

      return;

    }

    this.productionService
      .addRawMaterial(
        production.id,
        {
          materialName:
            material.name,

          quantity:
            this.quantity,

          unit:
            material.unit,

          lotNumber:
            material.lotNumber,

          consumedDate:
            new Date()
              .toLocaleDateString(),

          consumedBy:
            this.consumedBy
        }
      );

    material.stock =
      material.stock -
      this.quantity;

    localStorage.setItem(
      'rawMaterials',
      JSON.stringify(
        this.rawMaterials
      )
    );

    this.quantity = 0;

    this.consumedBy = '';

    alert(
      'Materia prima registrada'
    );

  }

}