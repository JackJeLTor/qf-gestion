import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonButton,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption
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
    IonSelectOption
  ]
})
export class ProductionMaterialsPage {

  productionId = 0;

  rawMaterialId = 0;

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
        p => p.id ==
        this.productionId
      );

    const material =
      this.rawMaterials.find(
        m => m.id ==
        this.rawMaterialId
      );

    if (
      !production ||
      !material
    ) {
      return;
    }

    this.productionService
      .addRawMaterial(
        production.id,
        material.name
      );

    alert(
      'Materia prima asignada'
    );

  }

}