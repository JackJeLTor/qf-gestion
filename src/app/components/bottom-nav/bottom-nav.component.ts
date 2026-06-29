import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  carOutline,
  documentTextOutline,
  flaskOutline,
  homeOutline,
  personOutline,
} from 'ionicons/icons';

import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon],
})
export class BottomNavComponent implements OnInit {
  canPrescriptions = false;

  canProductions = false;

  canDeliveries = false;

  activeRoute = '';

  constructor(
    private router: Router,
    private permissionService: PermissionService,
  ) {
    addIcons({
      carOutline,
      documentTextOutline,
      flaskOutline,
      homeOutline,
      personOutline,
    });
  }

  ngOnInit() {
    this.refresh(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.refresh(event.urlAfterRedirects);
      });
  }

  refresh(url: string) {
    this.activeRoute = url;
    this.canPrescriptions = this.permissionService.hasAccess('prescriptions');
    this.canProductions = this.permissionService.hasAccess('productions');
    this.canDeliveries = this.permissionService.hasAccess('delivery');
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.activeRoute.startsWith(path);
  }
}
