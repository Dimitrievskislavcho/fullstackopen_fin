import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as patientsService from '../../services/patients';
import {
  assertEntryType,
  Diagnosis,
  Entry,
  EntryDetailsIcons,
  Gender,
  Patient,
} from '../../types';
import {
  Male,
  Female,
  Transgender,
  Work,
  MedicalServices,
  WorkHistory,
} from '@mui/icons-material';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import { Paper } from '@mui/material';

const GENDERS: {
  [key in Gender]: ReactNode;
} = {
  female: <Female />,
  male: <Male />,
  other: <Transgender />,
};

const ENTRY_DETAILS_ICONS: EntryDetailsIcons = {
  HealthCheck: <WorkHistory />,
  Hospital: <MedicalServices />,
  OccupationalHealthcare: <Work />,
};

const PatientDetailsPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      patientsService
        .getPatient(id)
        .then((patientData) => setPatient(patientData));
    }
  }, [id]);

  if (!patient) {
    return;
  }

  const entryDetailsMapper = (entry: Entry) => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <HospitalEntryDetails
            icon={ENTRY_DETAILS_ICONS['Hospital']}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'HealthCheck':
        return (
          <HealthCheckEntryDetails
            icon={ENTRY_DETAILS_ICONS['HealthCheck']}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntryDetails
            icon={ENTRY_DETAILS_ICONS['OccupationalHealthcare']}
            entry={entry}
            diagnoses={diagnoses}
          />
        );
      default:
        return assertEntryType(entry);
    }
  };

  return (
    <div>
      <h3>
        {patient?.name} {patient?.gender && GENDERS[patient?.gender]}
      </h3>

      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>

      <h4>entries</h4>
      {patient?.entries.map((entry) => (
        <Paper key={entry.id} elevation={2} style={{ marginBottom: 10 }}>
          {entryDetailsMapper(entry)}
        </Paper>
      ))}
    </div>
  );
};

export default PatientDetailsPage;
