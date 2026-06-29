import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';

import {
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuButton,
} from '@ionic/angular/standalone';

import { PrescriptionService } from '../../services/prescription.service';
import { ProductionService } from '../../services/production.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { LaboratoryService } from '../../services/laboratory.service';
import { RawMaterialService } from '../../services/raw-material.service';
import { DeliveryService } from '../../services/delivery.service';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
  IonContent,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonMenuButton,
],
})
export class DashboardPage {
  canPrescriptions = false;

  canProductions = false;

  canQuality = false;

  canDeliveries = false;

  canRawMaterials = false;

  totalPrescriptions = 0;
  pendingPrescriptions = 0;

  activeProductions = 0;
  finishedProductions = 0;

  qualityProductions = 0;
  observedProductions = 0;

  totalPatients = 0;
  totalDoctors = 0;
  totalLaboratories = 0;
  totalRawMaterials = 0;

  lowRawMaterials = 0;
  expiringRawMaterials = 0;

  pendingDeliveries = 0;
  deliveredOrders = 0;

  recentLogs: any[] = [];

  currentUser: any = null;

  isAdmin = false;

  constructor(
    private router: Router,
    private prescriptionService: PrescriptionService,
    private productionService: ProductionService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private laboratoryService: LaboratoryService,
    private rawMaterialService: RawMaterialService,
    private deliveryService: DeliveryService,
    private auditService: AuditService,
    private permissionService: PermissionService,
  ) {}

  ionViewWillEnter() {
    this.currentUser = JSON.parse(
      localStorage.getItem('currentUser') || 'null',
    );

    this.isAdmin = this.currentUser?.role === 'Administrador';

    const prescriptions = this.prescriptionService.getPrescriptions();

    const productions = this.productionService.getProductions();

    const patients = this.patientService.getPatients();

    const doctors = this.doctorService.getDoctors();

    const laboratories = this.laboratoryService.getLaboratories();

    const rawMaterials = this.rawMaterialService.getRawMaterials();

    const deliveries = this.deliveryService.getDeliveries();

    this.totalPatients = patients.length;
    this.totalDoctors = doctors.length;
    this.totalLaboratories = laboratories.length;
    this.totalRawMaterials = rawMaterials.length;

    this.totalPrescriptions = prescriptions.length;

    this.pendingPrescriptions = prescriptions.filter(
      (p) => p.status !== 'Entregada',
    ).length;

    this.activeProductions = productions.filter(
      (p) => p.status !== 'Finalizado' && p.status !== 'Lista para Entrega',
    ).length;

    this.finishedProductions = productions.filter(
      (p) => p.status === 'Finalizado' || p.status === 'Lista para Entrega',
    ).length;

    this.qualityProductions = productions.filter(
      (p) => p.status === 'Control Calidad',
    ).length;

    this.observedProductions = productions.filter(
      (p) => p.status === 'Observado',
    ).length;

    this.pendingDeliveries = deliveries.filter(
      (d) => d.status !== 'Entregado',
    ).length;

    this.deliveredOrders = deliveries.filter(
      (d) => d.status === 'Entregado',
    ).length;

    const today = new Date();

    this.lowRawMaterials = rawMaterials.filter(
      (m) => m.stock <= m.minimumStock,
    ).length;

    this.expiringRawMaterials = rawMaterials.filter((material) => {
      const expiration = new Date(material.expirationDate);

      const days =
        (expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

      return days <= 90;
    }).length;

    this.recentLogs = this.auditService
      .getLogs()
      .slice(-5)
      .reverse();

    this.canPrescriptions = this.permissionService.hasAccess('prescriptions');

    this.canProductions = this.permissionService.hasAccess('productions');

    this.canQuality = this.permissionService.hasAccess('quality-control');

    this.canDeliveries = this.permissionService.hasAccess('delivery');

    this.canRawMaterials = this.permissionService.hasAccess('raw-materials');
  }

  canAccess(module: string): boolean {
    return this.permissionService.hasAccess(module);
  }

  goReports() {
    this.router.navigate(['/reports']);
  }

  goPrescriptions() {
    this.router.navigate(['/prescriptions']);
  }

  goProductions() {
    this.router.navigate(['/productions']);
  }

  goPatients() {
    this.router.navigate(['/patients']);
  }

  goDoctors() {
    this.router.navigate(['/doctors']);
  }

  goLaboratories() {
    this.router.navigate(['/laboratories']);
  }

  goRawMaterials() {
    this.router.navigate(['/raw-materials']);
  }

  goProductionConsumption() {
    this.router.navigate(['/production-consumption']);
  }

  goQualityControl() {
    this.router.navigate(['/quality-control']);
  }

  goDeliveries() {
    this.router.navigate(['/delivery']);
  }

  goAudit() {
    this.router.navigate(['/audit']);
  }

  goBackup() {
    this.router.navigate(['/backup']);
  }
  goUsers() {
    this.router.navigate(['/users']);
  }

  goAccessHistory() {
    this.router.navigate(['/access-history']);
  }
}
