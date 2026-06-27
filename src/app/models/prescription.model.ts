export interface Prescription {

  /*==================================
    IDENTIFICACIÓN
  ==================================*/

  id: number;

  code: string;

  date: string;

  /*==================================
    PACIENTE
  ==================================*/

  patientId: number;

  patientName: string;

  /*==================================
    MÉDICO
  ==================================*/

  doctorId: number;

  doctorName: string;

  doctorCmp: string;

  specialty: string;

  /*==================================
    RECETA
  ==================================*/

  formula: string;

  pharmaceuticalForm: string;

  priority: string;

  /*==================================
    RESPONSABLE
  ==================================*/

  responsible: string;

  /*==================================
    FECHAS
  ==================================*/

  createdDate: string;

  deliveryDate: string;

  /*==================================
    ESTADO
  ==================================*/

  status: string;

}