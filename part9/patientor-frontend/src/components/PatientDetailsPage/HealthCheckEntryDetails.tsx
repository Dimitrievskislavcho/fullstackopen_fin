import { ReactNode } from 'react';
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from '../../types';
import { FavoriteBorderTwoTone } from '@mui/icons-material';

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
  icon,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
  icon: ReactNode;
}) => {
  const healthStatusColor = ['success', 'info', 'warning', 'error'] as const;
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
      <div>
        {
          <FavoriteBorderTwoTone
            color={healthStatusColor[entry.healthCheckRating]}
          />
        }{' '}
        {HealthCheckRating[entry.healthCheckRating]}
      </div>
      <div>diagnose by {entry.specialist}</div>
    </>
  );
};

export default HealthCheckEntryDetails;
