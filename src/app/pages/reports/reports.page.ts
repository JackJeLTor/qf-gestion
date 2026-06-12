import { Component } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ProductionService } from '../../services/production.service';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { DeliveryService } from '../../services/delivery.service';
import { RawMaterialService } from '../../services/raw-material.service';
import * as XLSX from 'xlsx';

import { saveAs }
from 'file-saver';

import { AuditService }
from '../../services/audit.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
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
export class ReportsPage {

  totalProducts = 0;
  totalOrders = 0;
  totalSales = 0;

  lowStockProducts = 0;
  expiringProducts = 0;

  totalPrescriptions = 0;
  pendingPrescriptions = 0;
  deliveredPrescriptions = 0;

  activeProductions = 0;
  finishedProductions = 0;
  observedProductions = 0;

  totalPatients = 0;
  totalDoctors = 0;

  totalDeliveries = 0;
  pendingDeliveries = 0;
  deliveredOrders = 0;

  totalRawMaterials = 0;
  lowRawMaterials = 0;

  constructor(
  private productService:
    ProductService,

  private orderService:
    OrderService,

  public prescriptionService:
    PrescriptionService,

  public productionService:
    ProductionService,

  public patientService:
    PatientService,

  public doctorService:
    DoctorService,

  private deliveryService:
    DeliveryService,

  public rawMaterialService:
    RawMaterialService,

  private auditService:
    AuditService
) {}

exportExcel(
  data: any[],
  fileName: string
) {

  const worksheet =
    XLSX.utils.json_to_sheet(
      data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Datos'
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType: 'xlsx',
        type: 'array'
      }
    );

  const blob =
    new Blob(
      [excelBuffer],
      {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

  saveAs(
    blob,
    `${fileName}.xlsx`
  );

  const user =
    JSON.parse(
      localStorage.getItem(
        'currentUser'
      ) || '{}'
    );

  this.auditService.addLog(
    'Reportes',
    'Exportación Excel',
    user.fullName || 'Sistema',
    `Archivo exportado: ${fileName}.xlsx`
  );

}

  ionViewWillEnter() {

    const products =
      this.productService.getProducts();

    const orders =
      this.orderService.getOrders();

    const prescriptions =
      this.prescriptionService.getPrescriptions();

    const productions =
      this.productionService.getProductions();

    const patients =
      this.patientService.getPatients();

    const doctors =
      this.doctorService.getDoctors();

    const deliveries =
      this.deliveryService.getDeliveries();

    const rawMaterials =
      this.rawMaterialService.getRawMaterials();

    this.totalProducts =
      products.length;

    this.totalOrders =
      orders.length;

    this.totalPatients =
      patients.length;

    this.totalDoctors =
      doctors.length;

    this.totalPrescriptions =
      prescriptions.length;

    this.deliveredPrescriptions =
      prescriptions.filter(
        p => p.status === 'Entregada'
      ).length;

    this.pendingPrescriptions =
      prescriptions.filter(
        p => p.status !== 'Entregada'
      ).length;

    this.activeProductions =
      productions.filter(
        p => p.status !== 'Finalizado'
      ).length;

    this.finishedProductions =
      productions.filter(
        p => p.status === 'Finalizado'
      ).length;

    this.observedProductions =
      productions.filter(
        p => p.status === 'Observado'
      ).length;

    this.totalDeliveries =
      deliveries.length;

    this.pendingDeliveries =
      deliveries.filter(
        d => d.status !== 'Entregado'
      ).length;

    this.deliveredOrders =
      deliveries.filter(
        d => d.status === 'Entregado'
      ).length;

    this.totalRawMaterials =
      rawMaterials.length;

    this.lowRawMaterials =
      rawMaterials.filter(
        m => m.stock <= m.minimumStock
      ).length;

    this.totalSales =
      orders.reduce(
        (total, order) =>
          total + (order.total || 0),
        0
      );

    this.lowStockProducts =
      products.filter(
        product => product.stock < 10
      ).length;

    const currentDate =
      new Date();

    this.expiringProducts =
      products.filter(product => {

        const expirationDate =
          new Date(
            product.expirationDate
          );

        const difference =
          expirationDate.getTime() -
          currentDate.getTime();

        const days =
          difference /
          (1000 * 60 * 60 * 24);

        return days <= 180;

      }).length;
  }

}