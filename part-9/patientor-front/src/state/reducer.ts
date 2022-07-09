import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

export type Action =
  | {
    type: 'SET_PATIENT_LIST';
    payload: Patient[];
  }
  | {
    type: 'ADD_PATIENT';
    payload: Patient;
  }
  | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_ENTRY';
    payload: Entry & { patientId: string; };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case 'ADD_ENTRY':
      const patient = state.patients[action.payload.patientId];
      if (patient) {
        const updatedPatient = {
          ...patient,
          entries: patient.entries.concat(action.payload)
        };
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.patientId]: updatedPatient
          }
        };
      }
      return state;
    default:
      return assertNever(action);
  }
};

function assertNever(x: never): never {
  throw new Error('Unexpected action: ' + JSON.stringify(x));
}

export function setPatientList(patientList: Patient[]): Action {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientList
  };
}

export function addPatient(patient: Patient): Action {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
}

export function setDiagnosisList(diagnosisList: Diagnosis[]): Action {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisList
  };
}

export function addEntry(entry: Entry, patientId: string): Action {
  return {
    type: 'ADD_ENTRY',
    payload: { ...entry, patientId }
  };
}
