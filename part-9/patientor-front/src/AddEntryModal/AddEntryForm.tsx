import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { DiagnosisSelection, RatingOption, SelectField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';

export type EntryFormValues = Omit<HealthCheckEntry, 'id'>;

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export function AddEntryForm(p: Props) {
  const [{ diagnoses }] = useStateValue();

  const onSubmit = (values: EntryFormValues) => {
    p.onSubmit({
      ...values,
      type: 'HealthCheck'
    });
  };

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string; } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }
      }
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <SelectField
              label='Health Check Rating'
              name='healthCheckRating'
              options={ratingOptions}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button type='button' onClick={p.onCancel} color='secondary' style={{ float: 'left' }}>
                  Cancel
                </Button>
              </Grid>
              <Grid item style={{ float: 'right' }}>
                <Button type='submit' variant='contained' disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}

