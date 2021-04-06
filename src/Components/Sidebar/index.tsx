import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import useHotkeys from '@reecelucas/react-use-hotkeys';
import BookmarksIcon from '../../Icons/BookMarksIcon';
import Home from '../../Icons/Home';
import SettingsIcon from '../../Icons/SettingsIcon';
import TodoIcon from '../../Icons/TodoIcon';
import { useModal } from '../../lib/global/ModalContext';
import { IconButton } from '../helpers';
import SettingsModal from '../Modals/SettingsModal';

const useKeys = (props: {
  push: (path: string, state?: unknown) => void;
  settings: (e: React.MouseEvent<Element, MouseEvent>) => any;
}) => {
  useHotkeys('Control+Alt+b', function (e) {
    props.push('/bookmarks');
  });
  useHotkeys('Control+Alt+t', function (e) {
    props.push('/todos');
  });
  useHotkeys('Control+Alt+s', function (e) {
    props.settings({ preventDefautl: () => {} } as any);
  });
};

function Sidebar(): ReactElement {
  const [bindSettings, bindSettingsTrigger] = useModal();
  const { push } = useHistory();
  useKeys({ push, settings: bindSettingsTrigger().onClick });
  return (
    <div className="sidebar-inner">
      <div className="sidebar-inner__single">
        <IconButton
          onClick={() => {
            push('/');
          }}
        >
          <Home />
        </IconButton>
        <IconButton
          onClick={() => {
            push('/bookmarks');
          }}
        >
          <BookmarksIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            push('/todos');
          }}
        >
          <TodoIcon />
        </IconButton>
      </div>
      <div className="sidebar-inner__single">
        <IconButton {...bindSettingsTrigger()}>
          <SettingsIcon />
        </IconButton>
      </div>
      <SettingsModal {...bindSettings()} />
    </div>
  );
}

export default Sidebar;
