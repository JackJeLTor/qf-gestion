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

import { LaboratoryService }
from '../../services/laboratory.service';

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

  laboratoryId = 0;

  laboratoryName = '';

  stock = 0;

  unit = '';

  expirationDate = '';

  rawMaterials: any[] = [];

  laboratories: any[] = [];

  constructor(
    private rawMaterialService:
      RawMaterialService,

    private laboratoryService:
      LaboratoryService
  ) {}

  ngOnInit() {

    this.loadRawMaterials();

    this.loadLaboratories();

  }

  loadRawMaterials() {

    this.rawMaterials =
      this.rawMaterialService
        .getRawMaterials();

  }

  loadLaboratories() {

    this.laboratories =
      this.laboratoryService
        .getLaboratories();

  }

  addRawMaterial() {

    if (
      !this.name ||
      !this.laboratoryName
    ) {
      return;
    }

    this.rawMaterialService
      .addRawMaterial({

        id: Date.now(),

        code:
          'MP' + Date.now(),

        name:
          this.name,

        laboratoryId:
          this.laboratoryId,

        laboratoryName:
          this.laboratoryName,

        stock:
          this.stock,

        unit:
          this.unit,

        expirationDate:
          this.expirationDate

      });

    this.loadRawMaterials();

    this.name = '';

    this.laboratoryId = 0;

    this.laboratoryName = '';

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