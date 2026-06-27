export interface ProductionMaterial {

  materialName: string;

  quantity: number;

  unit: string;

  lotNumber: string;

  consumedDate: string;

  consumedBy: string;

}

export interface ProductionHistory {

  date: string;

  action: string;

  description: string;

}

export interface Production {

  id: number;

  /*==============================
    RELACIÓN CON RECETA
  ==============================*/

  prescriptionId: number;

  prescriptionCode: string;

  /*==============================
    PACIENTE
  ==============================*/

  patientId: number;

  patientName: string;

  /*==============================
    MÉDICO
  ==============================*/

  doctorId: number;

  doctorName: string;

  doctorCmp: string;

  /*==============================
    PRODUCCIÓN
  ==============================*/

  formula: string;

  pharmaceuticalForm: string;

  specialty: string;

  priority: string;

  responsible: string;

  batchNumber: string;

  quantity: number;

  /*==============================
    FECHAS
  ==============================*/

  createdDate: string;

  startDate: string;

  endDate: string;

  estimatedDuration: number;

  productionDate: string;

  deliveryDate: string;

  /*==============================
    CALIDAD
  ==============================*/

  qualityDate: string;

  qualityResponsible: string;

  qualityStatus: string;

  qualityResult: string;

  observations: string;

  /*==============================
    ESTADO
  ==============================*/

  status: string;

  /*==============================
    MATERIAS PRIMAS
  ==============================*/

  rawMaterialsUsed: ProductionMaterial[];

  /*==============================
    HISTORIAL
  ==============================*/

  history: ProductionHistory[];

}