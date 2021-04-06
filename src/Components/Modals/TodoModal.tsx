import * as React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Modal from '../Modal';
import { FormButtons, TextInput } from '../Form';
import useAction from '../../lib/hooks/useAction';
import {
  addTodo,
  changeTodo,
} from '../../lib/global/redux/actions/rootActions';
import { useModalContext } from '../../lib/global/ModalContext';
import { Todo } from '../../lib/global/redux/reducers/rootReducerTypes';
import { makeid } from '../../lib/utils';

const TodoModal: React.FC<{ id: string; todo?: Todo }> = ({ id, todo }) => {
  const add = useAction(addTodo);
  const change = useAction(changeTodo);
  const { closeModal } = useModalContext();
  return (
    <Modal id={id} title="Add Todo">
      <p>Let&apos;s make a list to do.</p>
      <Formik
        initialValues={todo || { id: makeid(), done: false, content: '' }}
        validationSchema={yup.object().shape({
          content: yup
            .string()
            .required("We need the task you're trying to do!"),
        })}
        onSubmit={(values) => {
          if (todo) {
            change({
              ...values,
              content: values.content,
            });
          } else {
            add({
              ...values,
              content: values.content,
            });
          }
          closeModal();
        }}
      >
        <Form>
          <TextInput
            label="What are you trying to do?"
            name="content"
            placeholder="Pick up the kids."
          />
          <FormButtons />
        </Form>
      </Formik>
    </Modal>
  );
};

export default TodoModal;
