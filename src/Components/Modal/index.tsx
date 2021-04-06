import { useSpring, animated } from '@react-spring/web';
import * as React from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../../Icons/CloseIcon';
import {
  MODAL_PARENT_ID,
  useModalContext,
} from '../../lib/global/ModalContext';
import useOutsideAlerter from '../../lib/hooks/useOutsideAlerter';
import Custombars from '../Custombars';
import { IconButton } from '../helpers';

export interface ModalProps {
  id: string;
  title: string;
}

const portalToParent = (element: React.ReactElement, id: string) => {
  const parent = document.querySelector(`#${MODAL_PARENT_ID}`);
  if (parent) {
    return createPortal(element, parent, id);
  }
  return element;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { modal, closeModal } = useModalContext();
  const [show, setShow] = React.useState<boolean>(false);
  const spring = useSpring<{ opacity: string; transform: string }>({
    to: async (next) => {
      if (modal === props.id) {
        setShow(true);
        await next({ opacity: 1, transform: 'translate(0%,0%)' });
        return;
      }
      await next({ opacity: 0, transform: 'translate(0%,20%)' });
      setShow(false);
    },
  });
  const ref = useOutsideAlerter(() => {
    closeModal();
  }) as React.MutableRefObject<HTMLDivElement>;
  if (!show) {
    return null;
  }
  return portalToParent(
    <animated.div style={{ opacity: spring.opacity }} className="modal">
      <Custombars
        height={window.innerHeight}
        autoHeight
        autoHeightMin={window.innerHeight}
      >
        <animated.div style={spring} ref={ref} className="modal-body">
          <IconButton onClick={closeModal} className="modal-close">
            <CloseIcon />
          </IconButton>
          <div className="modal-body__title">
            <h2>{props.title}</h2>
          </div>
          <div className="modal-body__content">{props.children}</div>
        </animated.div>
      </Custombars>
    </animated.div>,
    props.id,
  );
};

export default Modal;
