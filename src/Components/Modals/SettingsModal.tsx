import * as React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { equals, reject } from 'ramda';
import {
  FormButtons,
  TextInput,
  SelectInput,
  SliderInput,
  SwitchInput,
} from '../Form';
import Modal from '../Modal';
import { Settings } from '../../lib/global/redux/reducers/rootReducerTypes';
import {
  countries,
  countriesDataList,
  getCitiesDataList,
  allCities,
} from '../../lib/data/LocationData';
import useAction from '../../lib/hooks/useAction';
import { changeSettings } from '../../lib/global/redux/actions/rootActions';
import { useModalContext } from '../../lib/global/ModalContext';
import { useRootSelector } from '../../lib/global/redux/reducers';

const initialValues: Settings = {
  name: '',
  city: '',
  country: '',
  theme: 'dark',
  degreeFormat: '',
  background: {
    url: '',
    opacity: 0,
  },
};

const SettingsModal: React.FC<{ id: string }> = ({ id }) => {
  const settingsAction = useAction(changeSettings);
  const initialSettings = useRootSelector((state) => state.settings);
  const { closeModal } = useModalContext();
  return (
    <Modal id={id} title="Dashboard Settings">
      <Formik
        validationSchema={yup.object().shape({
          name: yup.string().required('Gotta have a name.'),
          city: yup
            .string()
            .required()
            .oneOf(allCities, 'Please enter a valid city.'),
          country: yup
            .string()
            .required()
            .oneOf(countries, 'Please enter a valid country.'),
          theme: yup.string().required("I won't know what your preference is."),
          background: yup.object().shape({
            url: yup
              .string()
              .required(
                'Hey, this is literally the main point of this whole thing.',
              ),
            opacity: yup.number().required().min(0).max(1),
          }),
        })}
        onSubmit={(e) => {
          settingsAction(e);
          closeModal();
        }}
        initialValues={{
          ...initialValues,
          ...reject(equals(''))(initialSettings as any),
        }}
      >
        {(formik) => {
          return (
            <Form>
              <TextInput name="name" label="What's your name?" />
              <SelectInput
                name="country"
                label="Choose your country"
                options={countriesDataList}
              />
              <SelectInput
                disabled={!formik.values.country}
                name="city"
                label="Choose your city"
                options={getCitiesDataList(formik.values.country)}
              />
              <SwitchInput
                label="Dark Theme?"
                off="light"
                on="dark"
                name="theme"
              />
              <SelectInput
                name="degreeFormat"
                label="Pick a format for the degrees"
                options={[
                  {
                    label: 'Celcius',
                    value: 'c',
                  },
                  {
                    label: 'Farenheit',
                    value: 'f',
                  },
                ]}
              />
              <TextInput name="background.url" label="Background Image URL" />
              <SliderInput
                min={0}
                max={1}
                name="background.opacity"
                label="Background Overlay Opacity"
              />
              <FormButtons />
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default SettingsModal;
