import { Injectable } from '@angular/core';

import { Movement } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  private movements: Movement[] = [];

  constructor() {

    const savedMovements =
      localStorage.getItem('movements');

    if (savedMovements) {

      this.movements =
        JSON.parse(savedMovements);
    }
  }

  getMovements() {

    return this.movements;
  }

  addMovement(
    movement: Movement
  ) {

    this.movements.push(
      movement
    );

    localStorage.setItem(
      'movements',
      JSON.stringify(this.movements)
    );
  }
}