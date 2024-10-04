import { ReactNode } from 'react';
import { Diagnosis, HospitalEntry } from '../../types';

const HospitalEntryDetails = ({
  entry,
  diagnoses,
  icon,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
  icon: ReactNode;
}) => {
  return (
    <>
      <div>
        {entry.date} {icon}
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
      <div>
        discharged on: {entry.discharge.date}, with criteria:{' '}
        {entry.discharge.criteria}
      </div>
    </>
  );
};

export default HospitalEntryDetails;
