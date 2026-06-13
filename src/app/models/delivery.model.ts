export interface Delivery {

  id: number;

  productionId: number;

  patientName: string;

  batchNumber: string;

  formula: string;

  responsible: string;

  deliveredBy: string;

  receivedBy: string;

  observation: string;

  deliveryDate: string;

  status: string;

  history: string[];

}