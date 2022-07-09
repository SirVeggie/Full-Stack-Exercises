import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AddEntryForm, EntryFormValues } from './AddEntryForm';

interface ModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export function AddEntryModal(p: ModalProps) {
  return (
    <Dialog fullWidth={true} open={p.modalOpen} onClose={p.onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {p.error && <Alert severity='error'>{`Error: ${p.error}`}</Alert>}
        <AddEntryForm onSubmit={p.onSubmit} onCancel={p.onClose} />
      </DialogContent>
    </Dialog>
  );
}