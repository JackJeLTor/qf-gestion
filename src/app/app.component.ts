import { Component } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  barChartOutline,
  beakerOutline,
  businessOutline,
  carOutline,
  checkmarkDoneOutline,
  clipboardOutline,
  cloudUploadOutline,
  constructOutline,
  documentTextOutline,
  flaskOutline,
  homeOutline,
  lockClosedOutline,
  logOutOutline,
  medkitOutline,
  peopleOutline,
  personAddOutline,
  personOutline,
} from 'ionicons/icons';

import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AuthService } from './services/auth.service';
import { AppModulePermission, PermissionService } from './services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonIcon,
    RouterLink,
    BottomNavComponent,
  ],
})
export class AppComponent {
  currentUser: any = null;

  menuItems: AppModulePermission[] = [];

  showBottomNav = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService,
  ) {
    addIcons({
      barChartOutline,
      beakerOutline,
      businessOutline,
      carOutline,
      checkmarkDoneOutline,
      clipboardOutline,
      cloudUploadOutline,
      constructOutline,
      documentTextOutline,
      flaskOutline,
      homeOutline,
      lockClosedOutline,
      logOutOutline,
      medkitOutline,
      peopleOutline,
      personAddOutline,
      personOutline,
    });

    this.refreshShell(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.refreshShell(event.urlAfterRedirects);
      });
  }

  refreshShell(url: string) {
    this.currentUser = this.authService.getCurrentUser();
    this.menuItems = this.permissionService.getVisibleMenuItems();
    this.showBottomNav = !!this.currentUser && !url.startsWith('/login');
  }

  logout() {
    this.authService.logout();
    this.refreshShell('/login');
    this.router.navigate(['/login']);
  }
}
