import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { LaboratoryService } from '../../services/laboratory.service';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.page.html',
  styleUrls: ['./laboratories.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonMenuButton,
  ],
})
export class LaboratoriesPage {
  name = '';
  ruc = '';
  contact = '';
  phone = '';
  email = '';
  address = '';
  laboratories: any[] = [];

  constructor(private laboratoryService: LaboratoryService) {}

  ngOnInit() {
    this.loadLaboratories();
  }

  loadLaboratories() {
    this.laboratories = this.laboratoryService.getLaboratories();
  }

  addLaboratory() {
    if (!this.name) {
      return;
    }

    this.laboratoryService.addLaboratory({
      id: Date.now(),
      name: this.name,
      ruc: this.ruc,
      contact: this.contact,
      phone: this.phone,
      email: this.email,
      address: this.address,
      status: 'Activo',
    });

    this.loadLaboratories();
    this.name = '';
    this.ruc = '';
    this.contact = '';
    this.phone = '';
    this.email = '';
    this.address = '';
  }

  deleteLaboratory(id: number) {
    this.laboratoryService.deleteLaboratory(id);
    this.loadLaboratories();
  }
}
