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
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  closeOutline,
  addOutline,
} from 'ionicons/icons';

import { RawMaterialService }
from '../../services/raw-material.service';

import { AuditService }
from '../../services/audit.service';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.page.html',
  styleUrls: ['./raw-materials.page.scss'],
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
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
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

  showMaterialModal = false;

  rawMaterials: any[] = [];

  constructor(
    private rawMaterialService:
      RawMaterialService,

    private auditService:
      AuditService
  ) {

    addIcons({
      closeOutline,
      addOutline,
    });

  }

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

    if (
      this.stock <=
      this.minimumStock
    ) {

      return 'Stock Bajo';

    }

    if (days <= 90) {

      return 'Próximo a Vencer';

    }

    return 'Disponible';

  }

  addRawMaterial() {

    if (
      !this.name ||
      !this.category ||
      !this.laboratoryName ||
      !this.lotNumber ||
      !this.unit ||
      !this.expirationDate
    ) {

      alert(
        'Complete todos los campos'
      );

      return;

    }

    const material = {

      id: Date.now(),

      code:
        'MP-' +
        Date.now(),

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

    };

    this.rawMaterialService
      .addRawMaterial(
        material
      );

    this.auditService
      .addLog(
        'Materias Primas',
        'Crear',
        'Administrador',
        `Materia prima ${material.name} registrada`
      );

    this.loadRawMaterials();

    this.closeMaterialModal();

  }

  openNewMaterialModal() {

    this.name = '';
    this.category = '';
    this.laboratoryName = '';
    this.lotNumber = '';
    this.stock = 0;
    this.unit = '';
    this.expirationDate = '';
    this.minimumStock = 10;

    this.showMaterialModal = true;

  }

  closeMaterialModal() {

    this.showMaterialModal = false;

  }

  deleteRawMaterial(
    id: number
  ) {

    const material =
      this.rawMaterials.find(
        m => m.id === id
      );

    if (material) {

      this.auditService
        .addLog(
          'Materias Primas',
          'Eliminar',
          'Administrador',
          `Materia prima ${material.name} eliminada`
        );

    }

    this.rawMaterialService
      .deleteRawMaterial(
        id
      );

    this.loadRawMaterials();

  }

}