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

import { RawMaterialService }
from '../../services/raw-material.service';

import { ProductionService }
from '../../services/production.service';

import { ProductionConsumptionService }
from '../../services/production-consumption.service';

@Component({
  selector: 'app-production-consumption',
  templateUrl:
    './production-consumption.page.html',
  styleUrls:
    ['./production-consumption.page.scss'],
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
export class ProductionConsumptionPage {

  productionId = 0;

  rawMaterialId = 0;

  quantity = 0;

  productions: any[] = [];

  rawMaterials: any[] = [];

  consumptions: any[] = [];

  constructor(
    private rawMaterialService:
      RawMaterialService,

    private productionService:
      ProductionService,

    private consumptionService:
      ProductionConsumptionService
  ) {}

  ngOnInit() {

    this.productions =
      this.productionService
      .getProductions();

    this.rawMaterials =
      this.rawMaterialService
      .getRawMaterials();

    this.consumptions =
      this.consumptionService
      .getConsumptions();

  }

  registerConsumption() {

  const production =
    this.productions.find(
      p => p.id == this.productionId
    );

  const material =
    this.rawMaterials.find(
      m => m.id == this.rawMaterialId
    );

  if (
    !production ||
    !material ||
    this.quantity <= 0
  ) {
    return;
  }

  this.rawMaterialService
    .consumeStock(
      material.id,
      this.quantity
    );

  this.consumptionService
    .addConsumption({

      id: Date.now(),

      productionId:
        production.id,

      productionPatient:
        production.patientName,

      rawMaterialId:
        material.id,

      rawMaterialName:
        material.name,

      quantity:
        this.quantity,

      unit:
        material.unit,

      date:
        new Date()
        .toLocaleDateString()

    });

  this.productionService.addRawMaterial(
  this.productionId,
  {
    materialName: material.name,

    quantity: this.quantity,

    unit: material.unit,

    lotNumber: material.lotNumber,

    consumedDate:
      new Date().toLocaleString(),

    consumedBy:
      'Q.F. Responsable'
  }
);

  this.consumptions =
    this.consumptionService
      .getConsumptions();

  this.quantity = 0;

}

}