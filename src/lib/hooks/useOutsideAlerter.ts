import * as React from 'react';

export default function useOutsideAlerter<T extends HTMLElement>(
  onOutsideClick: (e: MouseEvent) => any,
): React.MutableRefObject<T | undefined> {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
  return ref;
}
