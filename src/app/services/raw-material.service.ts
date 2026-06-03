import { Injectable } from '@angular/core';

import { RawMaterial }
from '../models/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  private rawMaterials:
    RawMaterial[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'rawMaterials'
      );

    if (data) {

      this.rawMaterials =
        JSON.parse(data);

    }

  }

  getRawMaterials() {

    return this.rawMaterials;

  }

  addRawMaterial(
    material: RawMaterial
  ) {

    this.rawMaterials.push(
      material
    );

    this.save();

  }

  deleteRawMaterial(
    id: number
  ) {

    this.rawMaterials =
      this.rawMaterials.filter(
        material =>
          material.id !== id
      );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'rawMaterials',
      JSON.stringify(
        this.rawMaterials
      )
    );

  }

}