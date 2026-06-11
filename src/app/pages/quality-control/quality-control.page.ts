import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';

import { ProductionService }
from '../../services/production.service';

import { QualityControlService }
from '../../services/quality-control.service';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.page.html',
  styleUrls: ['./quality-control.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent,
    IonButton,
    IonTextarea,
    IonItem,
    IonInput
  ]
})
export class QualityControlPage {

  productions: any[] = [];

  observation = '';

  responsible = '';

  constructor(
    private productionService:
      ProductionService,

    private qualityService:
      QualityControlService
  ) {}

  ngOnInit() {

    this.loadProductions();

  }

  ionViewWillEnter() {

    this.loadProductions();

  }

  loadProductions() {

    this.productions =
      this.productionService
        .getProductions()
        .filter(
          p =>
            p.status ===
            'Control Calidad'
        );

  }

  approve(
    id: number
  ) {

    if (
      !this.responsible
    ) {

      alert(
        'Ingrese el responsable del control de calidad'
      );

      return;

    }

    this.qualityService
      .approveProduction(
        id,
        this.responsible
      );

    this.loadProductions();

  }

  observe(
    id: number
  ) {

    if (
      !this.responsible
    ) {

      alert(
        'Ingrese el responsable del control de calidad'
      );

      return;

    }

    if (
      !this.observation
    ) {

      alert(
        'Ingrese una observación'
      );

      return;

    }

    this.qualityService
      .observeProduction(
        id,
        this.observation,
        this.responsible
      );

    this.observation = '';

    this.loadProductions();

  }

}