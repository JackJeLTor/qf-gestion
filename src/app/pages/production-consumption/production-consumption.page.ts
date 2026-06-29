import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { RawMaterialService } from '../../services/raw-material.service';

import { ProductionService } from '../../services/production.service';

import { ProductionConsumptionService } from '../../services/production-consumption.service';

@Component({
  selector: 'app-production-consumption',
  templateUrl: './production-consumption.page.html',
  styleUrls: ['./production-consumption.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonMenuButton,
  ],
})
export class ProductionConsumptionPage {
  productionId = 0;

  rawMaterialId = 0;

  quantity = 0;

  consumedBy = '';

  productions: any[] = [];

  rawMaterials: any[] = [];

  consumptions: any[] = [];

  constructor(
    private rawMaterialService: RawMaterialService,

    private productionService: ProductionService,

    private consumptionService: ProductionConsumptionService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {

    this.productions = this.productionService.getProductions();

    this.rawMaterials = this.rawMaterialService.getRawMaterials();

    this.consumptions = this.consumptionService.getConsumptions().reverse();

  }

  registerConsumption() {
    const production = this.productions.find((p) => p.id == this.productionId);

    const material = this.rawMaterials.find((m) => m.id == this.rawMaterialId);

    if (!production || !material || this.quantity <= 0 || !this.consumedBy) {
      alert('Complete todos los campos');

      return;
    }

    this.rawMaterialService.consumeStock(material.id, this.quantity);

    this.consumptionService.addConsumption({
      id: Date.now(),

      productionId: production.id,

      productionPatient: production.patientName,

      batchNumber: production.batchNumber,

      rawMaterialId: material.id,

      rawMaterialName: material.name,

      lotNumber: material.lotNumber,

      quantity: this.quantity,

      unit: material.unit,

      consumedBy: this.consumedBy,

      date: new Date().toLocaleString(),
    });

    this.productionService.addRawMaterial(this.productionId, {
      materialName: material.name,

      quantity: this.quantity,

      unit: material.unit,

      lotNumber: material.lotNumber,

      consumedDate: new Date().toLocaleString(),

      consumedBy: this.consumedBy,
    });

    this.loadData();

    this.quantity = 0;

    this.consumedBy = '';

    alert('Consumo registrado correctamente');
  }
}
