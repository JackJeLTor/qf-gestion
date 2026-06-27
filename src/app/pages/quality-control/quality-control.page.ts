import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonInput,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { ProductionService } from '../../services/production.service';

import { QualityControlService } from '../../services/quality-control.service';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.page.html',
  styleUrls: ['./quality-control.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonTextarea,
    IonItem,
    IonInput,
    IonMenuButton,
  ],
})
export class QualityControlPage {
  productions: any[] = [];

  observation = '';

  responsible = '';

  constructor(
    private productionService: ProductionService,

    private qualityService: QualityControlService
  ) {}

  ngOnInit() {
    this.loadProductions();
  }

  ionViewWillEnter() {
    this.loadProductions();
  }

  loadProductions() {
    this.productions = this.productionService
      .getProductions()
      .filter((p) => p.status === 'Control Calidad');
  }

  approve(id: number) {
    if (!this.responsible || this.responsible.trim().length < 3) {
      alert('Ingrese un responsable válido');

      return;
    }

    this.qualityService.approveProduction(
      id,
      this.responsible.trim()
    );

    this.responsible = '';

    this.observation = '';

    this.loadProductions();
  }

  observe(id: number) {
    if (!this.responsible || this.responsible.trim().length < 3) {
      alert('Ingrese un responsable válido');

      return;
    }

    if (!this.observation || this.observation.trim().length < 10) {
      alert('La observación debe tener mínimo 10 caracteres');

      return;
    }

    this.qualityService.observeProduction(
      id,
      this.observation.trim(),
      this.responsible.trim()
    );

    this.observation = '';

    this.responsible = '';

    this.loadProductions();
  }
}