export interface ProductionMaterial {

  materialName: string;

  quantity: number;

  unit: string;

  lotNumber: string;

  consumedDate: string;

  consumedBy: string;

}

export interface Production {

  id: number;

  prescriptionId: number;

  patientName: string;

  formula: string;

  responsible: string;

  startDate: string;

  endDate: string;

  qualityDate: string;

  qualityResponsible: string;

  qualityStatus: string;

  qualityResult: string;

  observations: string;

  status: string;

  batchNumber: string;

  quantity: number;

  productionDate: string;

  pharmaceuticalForm: string;

  specialty: string;

  priority: string;

  rawMaterialsUsed: ProductionMaterial[];

  history: string[];

}