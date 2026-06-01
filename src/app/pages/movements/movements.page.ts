import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { MovementService }
from '../../services/movement.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardContent
  ]
})
export class MovementsPage {

  movements: any[] = [];

  constructor(
    private movementService:
      MovementService
  ) {}

  ngOnInit() {

    this.movements =
      this.movementService
        .getMovements();
  }
}