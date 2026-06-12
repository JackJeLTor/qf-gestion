import { Injectable } from '@angular/core';

import { ProductionCertificate }
from '../models/production-certificate.model';

@Injectable({
  providedIn: 'root'
})
export class ProductionCertificateService {

  private certificates:
    ProductionCertificate[] = [];

  constructor() {

    const data =
      localStorage.getItem(
        'productionCertificates'
      );

    if (data) {

      this.certificates =
        JSON.parse(data);

    }

  }

  getCertificates() {

    return this.certificates;

  }

  addCertificate(
    certificate:
    ProductionCertificate
  ) {

    this.certificates.push(
      certificate
    );

    this.save();

  }

  private save() {

    localStorage.setItem(
      'productionCertificates',
      JSON.stringify(
        this.certificates
      )
    );

  }

}