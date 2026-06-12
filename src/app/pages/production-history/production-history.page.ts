import { Component } from '@angular/core';

import { ActivatedRoute }
from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { ProductionService }
from '../../services/production.service';

@Component({
  selector: 'app-production-history',
  templateUrl:
    './production-history.page.html',
  styleUrls:
    ['./production-history.page.scss'],
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
export class ProductionHistoryPage {

  production: any;

  constructor(
    private route:
      ActivatedRoute,
    private productionService:
      ProductionService
  ) {}

  ngOnInit() {

    const id =
      Number(
        this.route.snapshot.paramMap.get(
          'id'
        )
      );

    this.production =
      this.productionService
        .getProductions()
        .find(
          p => p.id === id
        );

  }

}