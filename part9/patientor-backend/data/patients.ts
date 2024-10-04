import {
  Patient,
  NewPatient,
  newPatientSchema,
  assertEntryType,
  Entry,
} from '../src/types/patients';

const data: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-07-09',
    ssn: '090786-122X',
    gender: 'male',
    occupation: 'New york city cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      },
    ],
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-01-30',
    ssn: '300179-777A',
    gender: 'male',
    occupation: 'Cop',
    entries: [
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        },
      },
    ],
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-04-25',
    ssn: '250470-555L',
    gender: 'other',
    occupation: 'Technician',
    entries: [],
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-01-05',
    ssn: '050174-432N',
    gender: 'female',
    occupation: 'Forensic Pathologist',
    entries: [
      {
        id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
        date: '2019-10-20',
        specialist: 'MD House',
        type: 'HealthCheck',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        healthCheckRating: 0,
      },
      {
        id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
        date: '2019-09-10',
        specialist: 'MD House',
        type: 'OccupationalHealthcare',
        employerName: 'FBI',
        description: 'Prescriptions renewed.',
      },
      {
        id: '37be178f-a432-4ba4-aac2-f86810e36a15',
        date: '2018-10-05',
        specialist: 'MD House',
        type: 'HealthCheck',
        description:
          'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
        healthCheckRating: 1,
      },
    ],
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-04-09',
    ssn: '090471-8890',
    gender: 'male',
    occupation: 'Digital evangelist',
    entries: [],
  },
].map((patient) => {
  const newPatient: NewPatient = newPatientSchema.parse(patient);
  const entries = (patient.entries as Entry[]).map((entry) => {
    if (entry.type === 'Hospital') {
      return entry;
    } else if (entry.type === 'OccupationalHealthcare') {
      return entry;
    } else if (entry.type === 'HealthCheck') {
      return entry;
    } else {
      return assertEntryType(entry);
    }
  });
  return { ...newPatient, id: patient.id, entries };
});

export { data };
