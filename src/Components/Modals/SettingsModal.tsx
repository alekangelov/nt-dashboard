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
  DropZoneInput,
} from '../Form';
import Modal from '../Modal';
import { Settings } from '../../lib/global/redux/reducers/rootReducerTypes';

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
  console.log('RERENDERED');
  return (
    <Modal id={id} title="Dashboard Settings">
      <Formik
        validationSchema={yup.object().shape({
          name: yup.string().required('Gotta have a name.'),
          theme: yup.string().required("I won't know what your preference is."),
          background: yup.object().shape({
            url: yup
              .string()
              .url()
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
          console.log('RERENDER3');
          return (
            <Form>
              <TextInput name="name" label="What's your name?" />
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
              <DropZoneInput
                name="background.url"
                label="Drop background image here, or click to browse"
              />
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

(SettingsModal as any).whyDidYouRender = true;

export default SettingsModal;
