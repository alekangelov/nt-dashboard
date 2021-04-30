import clsx from 'clsx';
import * as React from 'react';
import CloseIcon from '../../Icons/CloseIcon';
import PlusIcon from '../../Icons/PlusIcon';
import { useModal } from '../../lib/global/ModalContext';
import {
  changeTodo,
  removeTodo,
} from '../../lib/global/redux/actions/rootActions';
import { useRootSelector } from '../../lib/global/redux/reducers';
import { Todo } from '../../lib/global/redux/reducers/rootReducerTypes';
import useAction from '../../lib/hooks/useAction';
import Custombars from '../Custombars';
import { Checkbox } from '../Form';
import { IconButton } from '../helpers';
import TodoModal from '../Modals/TodoModal';

const SingleTodo = (props: Todo) => {
  const remove = useAction(removeTodo);
  const change = useAction(changeTodo);
  const [bindTodoModal, bindTodoModalTrigger] = useModal();
  const { id, content, done } = props;
  return (
    <>
      <div
        {...bindTodoModalTrigger()}
        key={id}
        className={clsx('todos-single', done && 'done')}
      >
        <div className="todos-single__check">
          <Checkbox
            initialValue={done}
            onChange={(newVal) => {
              change({
                ...props,
                done: newVal,
              });
            }}
          />
        </div>
        <div className="todos-single__content">
          <p>{content}</p>
        </div>
        <IconButton
          className="todos-single__remove"
          onClick={(e) => {
            e.stopPropagation();
            remove(props);
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <TodoModal {...bindTodoModal()} todo={props} />
    </>
  );
};
const TodoList: React.FC<any> = () => {
  const [bindTodoModal, bindTodoModalTrigger] = useModal();
  const todos = useRootSelector((state) => state.todos);
  return (
    <>
      <div className="page">
        <div className="page-header">
          <h1>Todos</h1>
          <IconButton {...bindTodoModalTrigger()} style={{ marginRight: '0' }}>
            <PlusIcon />
          </IconButton>
        </div>
        <Custombars
          className="page-content"
          autoHeight
          autoHeightMin="100%"
          autoHeightMax="100%"
        >
          <div className="todos">
            {todos.map((e) => (
              <SingleTodo key={e.id} {...e} />
            ))}
          </div>
        </Custombars>
      </div>
      <TodoModal {...bindTodoModal()} />
    </>
  );
};

export default TodoList;
