import clsx from 'clsx';
import { Form, Formik, useFormikContext } from 'formik';
import { pathOr } from 'ramda';
import * as React from 'react';
import Folder from '../../Icons/FolderIcon';
import LinkIcon from '../../Icons/LinkIcon';
import { useRootSelector } from '../../lib/global/redux/reducers';
import Custombars from '../Custombars';
import { TextInput } from '../Form';

const BookmarkLink: React.FC<chrome.bookmarks.BookmarkTreeNode> = ({
  url,
  title,
}) => {
  const {
    values: { search },
  } = useFormikContext<{ search: string }>();
  if (
    !(
      url?.toLowerCase().includes(search.toLowerCase()) ||
      title.toLowerCase().includes(search.toLowerCase())
    )
  )
    return null;
  return (
    <a href={url} className="bookmarks-link">
      <span className="icon">
        <LinkIcon />
      </span>
      <span className="title">{title}</span>
    </a>
  );
};

function BookmarkFolder({
  title,
  children,
}: chrome.bookmarks.BookmarkTreeNode): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className={clsx('bookmarks-folder', open && 'open')}>
      <div
        role="button"
        tabIndex={-1}
        className="bookmarks-folder__title"
        onClick={() => setOpen((state) => !state)}
      >
        <span className="icon">
          <Folder open={open} />
        </span>
        <span className="title">{title}</span>
      </div>
      {open && (
        <div className="bookmarks-folder__children">
          {children &&
            children.map((e) => {
              if (e.children) {
                return <BookmarkFolder {...e} key={e.id} />;
              }
              return <BookmarkLink {...e} key={e.id} />;
            })}
        </div>
      )}
    </div>
  );
}

const pathOrFalse = pathOr(false);

const Bookmarks: React.FC<any> = () => {
  const bookmarks = useRootSelector((store) => store.bookmarks);
  const bookmarksOrFalse = pathOrFalse(
    ['0', 'children'],
    bookmarks,
  ) as chrome.bookmarks.BookmarkTreeNode[];
  if (!bookmarksOrFalse) {
    return (
      <div className="page bookmarks">
        <div className="page-header">
          <h1>Bookmarks</h1>
        </div>
        <div className="page-content">
          <p>You don't have any bookmarks 😞</p>
        </div>
      </div>
    );
  }
  return (
    <Formik initialValues={{ search: '' }} onSubmit={() => {}}>
      <Form style={{ height: '100%' }}>
        <div className="page bookmarks">
          <div className="page-header bookmarks-header">
            <h1>Bookmarks</h1>
            <div className="bookmarks-search">
              <TextInput name="search" label="Search" />
            </div>
          </div>
          <Custombars
            className="page-content bookmarks-scrollable"
            autoHide
            autoHeightMin="100%"
            autoHeightMax="100%"
            autoHeight
          >
            {Boolean(bookmarksOrFalse?.map) &&
              bookmarksOrFalse.map((e) => {
                return <BookmarkFolder {...e} key={e.id} />;
              })}
          </Custombars>
        </div>
      </Form>
    </Formik>
  );
};

export default Bookmarks;
