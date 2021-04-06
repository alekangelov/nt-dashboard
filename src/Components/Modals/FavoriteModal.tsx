import * as React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import { FormButtons, TextInput } from '../Form';
import useAction from '../../lib/hooks/useAction';
import { addFavorite } from '../../lib/global/redux/actions/rootActions';
import { useModalContext } from '../../lib/global/ModalContext';

const FavoriteModal: React.FC<{ id: string }> = ({ id }) => {
  const add = useAction(addFavorite);
  const { closeModal } = useModalContext();
  return (
    <Modal id={id} title="Add Favorite">
      <p>Let&apos;s add some favorites, shall we?</p>
      <Formik
        initialValues={{ url: '' }}
        validationSchema={yup.object().shape({
          url: yup
            .string()
            .url('Has to be a valid URL.')
            .required('Website is required!'),
        })}
        onSubmit={(values) => {
          add(values);
          closeModal();
        }}
      >
        <Form>
          <TextInput
            label="Website URL"
            name="url"
            placeholder="https://google.com"
          />
          <FormButtons />
        </Form>
      </Formik>
    </Modal>
  );
};

export default FavoriteModal;
