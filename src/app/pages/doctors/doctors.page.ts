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
  searchOutline,
  createOutline,
  addOutline,
  closeOutline,
} from 'ionicons/icons';

import { DoctorService }
from '../../services/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
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
  ],
})
export class DoctorsPage {

  documentType = 'DNI';

  documentNumber = '';

  firstName = '';

  lastName = '';

  cmp = '';

  rne = '';

  specialty = '';

  phone = '';

  email = '';

  doctors: any[] = [];

  filteredDoctors: any[] = [];

  searchTerm = '';

  showSearch = false;

  showDoctorModal = false;

  editingDoctorId:
    number | null = null;

  constructor(
    private doctorService:
      DoctorService,
  ) {

    addIcons({
      searchOutline,
      createOutline,
      addOutline,
      closeOutline,
    });

  }

  ngOnInit() {

    this.loadDoctors();

  }

  loadDoctors() {

    this.doctors =
      this.doctorService.getDoctors();

    this.filteredDoctors =
      [...this.doctors];

  }

  toggleSearch() {

    this.showSearch =
      !this.showSearch;

    if (!this.showSearch) {

      this.searchTerm = '';

      this.filteredDoctors =
        [...this.doctors];

    }

  }

  searchDoctors() {

    const term =
      this.searchTerm
        .toLowerCase()
        .trim();

    if (!term) {

      this.filteredDoctors =
        [...this.doctors];

      return;

    }

    this.filteredDoctors =
      this.doctors.filter(
        doctor =>

          doctor.firstName
            .toLowerCase()
            .includes(term)

          ||

          doctor.lastName
            .toLowerCase()
            .includes(term)

          ||

          doctor.documentNumber
            .includes(term)

          ||

          doctor.cmp
            .includes(term)
      );

  }

  openNewDoctorModal() {

    this.clearForm();

    this.editingDoctorId =
      null;

    this.showDoctorModal =
      true;

  }

  closeDoctorModal() {

    this.showDoctorModal =
      false;

  }

  private isValidEmail(
    email: string,
  ): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email,
    );

  }

  addDoctor() {

    if (
      !this.documentNumber ||
      !this.firstName ||
      !this.lastName ||
      !this.cmp ||
      !this.specialty ||
      !this.phone ||
      !this.email
    ) {

      alert(
        'Complete todos los campos',
      );

      return;

    }

    if (
      this.documentType === 'DNI'
    ) {

      if (
        !/^\d{8}$/.test(
          this.documentNumber,
        )
      ) {

        alert(
          'El DNI debe tener 8 dígitos',
        );

        return;

      }

    }

    if (
      !/^\d{5,7}$/.test(
        this.cmp,
      )
    ) {

      alert(
        'CMP inválido',
      );

      return;

    }

    if (
      this.rne &&
      !/^\d+$/.test(
        this.rne,
      )
    ) {

      alert(
        'RNE inválido',
      );

      return;

    }

    if (
      !/^\d{9}$/.test(
        this.phone,
      )
    ) {

      alert(
        'El teléfono debe tener 9 dígitos',
      );

      return;

    }

    if (
      !this.isValidEmail(
        this.email,
      )
    ) {

      alert(
        'Correo inválido',
      );

      return;

    }

    if (
      this.editingDoctorId
    ) {

      this.doctorService
        .updateDoctor({

          id:
            this.editingDoctorId,

          documentType:
            this.documentType,

          documentNumber:
            this.documentNumber,

          firstName:
            this.firstName,

          lastName:
            this.lastName,

          cmp:
            this.cmp,

          rne:
            this.rne,

          specialty:
            this.specialty,

          phone:
            this.phone,

          email:
            this.email,

        });

    } else {

      this.doctorService
        .addDoctor({

          id: Date.now(),

          documentType:
            this.documentType,

          documentNumber:
            this.documentNumber,

          firstName:
            this.firstName,

          lastName:
            this.lastName,

          cmp:
            this.cmp,

          rne:
            this.rne,

          specialty:
            this.specialty,

          phone:
            this.phone,

          email:
            this.email,

        });

    }

    this.loadDoctors();

    this.closeDoctorModal();

    this.clearForm();

  }

  editDoctor(
    doctor: any,
  ) {

    this.editingDoctorId =
      doctor.id;

    this.documentType =
      doctor.documentType;

    this.documentNumber =
      doctor.documentNumber;

    this.firstName =
      doctor.firstName;

    this.lastName =
      doctor.lastName;

    this.cmp =
      doctor.cmp;

    this.rne =
      doctor.rne;

    this.specialty =
      doctor.specialty;

    this.phone =
      doctor.phone;

    this.email =
      doctor.email;

    this.showDoctorModal =
      true;

  }

  deleteDoctor(
    id: number,
  ) {

    const confirmed =
      confirm(
        '¿Eliminar médico?',
      );

    if (!confirmed) {

      return;

    }

    this.doctorService
      .deleteDoctor(id);

    this.loadDoctors();

  }

  clearForm() {

    this.documentType =
      'DNI';

    this.documentNumber =
      '';

    this.firstName =
      '';

    this.lastName =
      '';

    this.cmp =
      '';

    this.rne =
      '';

    this.specialty =
      '';

    this.phone =
      '';

    this.email =
      '';

  }

}