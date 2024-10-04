import { Entry, NewEntry, NewPatient, Patient } from '../types/patients';
import { data as patients } from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ ssn: _ommited, ...patient }) => patient);
};

const getPatientById = (id: string): Patient | null => {
  return patients.find((patient) => patient.id === id) || null;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { ...patient, id: uuid(), entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry | null => {
  const newEntry: Entry = { ...entry, id: uuid() };
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient) {
    patient.entries = [...patient.entries, newEntry];
    console.log(patient.entries);
    return newEntry;
  }

  return null;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntry,
};
