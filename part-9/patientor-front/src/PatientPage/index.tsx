import { Button } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddEntryModal } from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { addEntry, addPatient, useStateValue } from '../state';
import { HealthCheckEntry, Patient } from '../types';
import { EntryComponent } from './EntryComponent';

export function PatientPage() {
  const id = useParams().id;
  const [{ patients }, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');
  const patient = patients[id ?? ''];

  useEffect(() => {
    if (patient)
      return;
    axios.get<Patient>(`http://localhost:3001/api/patients/${id ?? ''}`)
      .then(res => dispatch(addPatient(res.data)))
      .catch(err => console.error(err));
  }, []);

  if (!id || !patient) {
    return <div>Patient id not found</div>;
  }

  const openModal = () => setShowModal(true);

  const closeModal = (): void => {
    setShowModal(false);
    setError('');
  };

  const submitEntry = async (values: EntryFormValues) => {
    console.log(values);

    try {
      const { data: newEntry } = await axios.post<HealthCheckEntry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>entries:{!patient.entries.length && ' No entries'}</div>
      {patient.entries.map(entry => <EntryComponent key={entry.id} data={entry} />)}
      <AddEntryModal
        modalOpen={showModal}
        error={error}
        onSubmit={submitEntry}
        onClose={closeModal}
      />
      <Button variant='contained' onClick={openModal}>
        Add new entry
      </Button>
    </div>
  );
}