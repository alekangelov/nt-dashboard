import * as React from 'react';
import { makeid } from '../utils';

interface ModalState {
  modal: string;
  showModal: (e: string) => void;
  closeModal: () => void;
}

export const MODAL_PARENT_ID = 'modal-provider';

const defaultState: ModalState = {
  modal: '',
  showModal: () => {},
  closeModal: () => {},
};

const ModalContext = React.createContext(defaultState);
export const useModalContext: () => ModalState = () =>
  React.useContext(ModalContext);
export const useModal = (): [
  () => { id: string },
  () => { onClick: (e: React.MouseEvent) => any },
] => {
  const id = React.useRef(makeid());
  const { showModal } = useModalContext();
  return [
    () => ({
      id: id.current,
    }),
    () => ({
      onClick: (e: React.MouseEvent) => {
        if (typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        showModal(id.current);
      },
    }),
  ];
};

const ModalProvider: React.FC<any> = ({ children }) => {
  const [modal, setModal] = React.useState<string>('');
  const showModal = (e: string) => setModal(e);
  const closeModal = () => setModal('');
  return (
    <ModalContext.Provider value={{ modal, showModal, closeModal }}>
      <div id={MODAL_PARENT_ID} />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
