import { useStateValue } from '../state';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalEntry } from '../types';

export function EntryComponent({ data }: { data: Entry; }) {
  const [{ diagnoses }] = useStateValue();

  return (
    <div style={{ backgroundColor: 'lightcyan', padding: 10, marginBottom: 10 }}>
      {entrySwitch(data)}
      <div>Specialist: {data.specialist}</div>
      {!data.diagnosisCodes ? null :
        <div style={{ marginLeft: 10 }}>
          {data.diagnosisCodes.map(code => <div key={code}>- {code}: {diagnoses[code]?.name}</div>)}
        </div>
      }
    </div>
  );
}

function entrySwitch(entry: Entry) {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck data={entry} />;
    case 'Hospital':
      return <HospitalVisit data={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare data={entry} />;
    default:
      return assertNever(entry);
  }
}

function HealthCheck({ data }: { data: HealthCheckEntry; }) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Health Check</div>
      <div>{data.date}</div>
      <div>{data.description}</div>
      <div>HealthCheckRating: {data.healthCheckRating}</div>
    </div>
  );
}

function HospitalVisit({ data }: { data: HospitalEntry; }) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Hospital Visit</div>
      <div>{data.date}</div>
      <div>{data.description}</div>
      <div>Discharge: {data.discharge.date} | {data.discharge.criteria}</div>
    </div>
  );
}

function OccupationalHealthcare({ data }: { data: OccupationalEntry; }) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Occupational Healthcare</div>
      <div>{data.date}</div>
      <div>{data.description}</div>
      <div>Employer: {data.employerName}</div>
      {!data.sickLeave ? null :
        <div>SickLeave: {data.sickLeave.startDate + ' - ' + data.sickLeave.endDate}</div>
      }
    </div>
  );
}

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + JSON.stringify(x));
}