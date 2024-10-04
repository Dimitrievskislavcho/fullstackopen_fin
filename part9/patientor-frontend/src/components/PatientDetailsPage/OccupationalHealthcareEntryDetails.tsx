import { ReactNode } from 'react';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
  icon,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
  icon: ReactNode;
}) => {
  return (
    <>
      <div>
        {entry.date} {icon} {entry.employerName}
      </div>
      <div>{entry.description}</div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code}{' '}
              {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
      <div>diagnose by {entry.specialist}</div>
      {entry.sickLeave && (
        <div>
          sick leave starts on: {entry.sickLeave.startDate}, ends on:{' '}
          {entry.sickLeave.endDate}
        </div>
      )}
    </>
  );
};

export default OccupationalHealthcareEntryDetails;
