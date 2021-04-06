import * as React from 'react';
import { shallowEqual } from 'react-redux';
import CloseIcon from '../../Icons/CloseIcon';
import PlusIcon from '../../Icons/PlusIcon';
import { useModal } from '../../lib/global/ModalContext';
import { removeFavorite } from '../../lib/global/redux/actions/rootActions';
import { useRootSelector } from '../../lib/global/redux/reducers';
import { Favorite } from '../../lib/global/redux/reducers/rootReducerTypes';
import useAction from '../../lib/hooks/useAction';
import useBtnClick from '../../lib/hooks/useBtnClick';
import { IconButton } from '../helpers';
import FavoriteModal from '../Modals/FavoriteModal';

const SingelFav = (fav: Favorite) => {
  const [elements, onClick] = useBtnClick();
  const remove = useAction(removeFavorite);
  return (
    <a
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        window.location.href = fav.url;
        onClick(e);
      }}
      href={fav.url}
      tabIndex={-1}
      role="button"
      className="btn btn-default favorites-single"
    >
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          remove(fav);
        }}
        className="favorites-single__remove"
      >
        <CloseIcon />
      </IconButton>
      <img src={fav.icon} alt="favorite" />
      {elements}
    </a>
  );
};

const Favicons: React.FC<any> = () => {
  const favorites = useRootSelector((state) => state.favorites, shallowEqual);
  const [bindModal, bindTrigger] = useModal();
  return (
    <div className="favorites">
      {favorites.map((fav) => {
        return <SingelFav key={`${fav.url}__${fav.icon}`} {...fav} />;
      })}

      {Boolean(favorites.length < 10) && (
        <div className="favorites-single">
          <IconButton {...bindTrigger()}>
            <PlusIcon />
          </IconButton>
        </div>
      )}
      <FavoriteModal {...bindModal()} />
    </div>
  );
};

export default Favicons;
