import {
  Accessor,
  createEffect,
  createSignal,
  Setter,
  onMount,
} from 'solid-js';

const localStorageExists = () => {
  if (typeof window === 'undefined') return false;
  return typeof window.localStorage !== 'undefined';
};

const serialize = <T>(value: T): string => {
  return JSON.stringify({ value });
};

const deserialize = <T>(value: string): T => {
  return JSON.parse(value).value as T;
};

export const createStoredSignal = <T>(
  initialValue: T,
  name: string,
  options = { serialize, deserialize }
): [Accessor<T>, Setter<T>] => {
  if (!localStorageExists())
    return [() => initialValue, (() => initialValue) as Setter<T>];
  const val = localStorage.getItem(name);
  const deserialized: T = val ? options.deserialize(val) : initialValue;
  const [value, setValue] = createSignal<T>(deserialized);

  onMount(() => {
    addEventListener('storage', (e) => {
      if (e.key !== name) return;
      if (!e.newValue) return;
      setValue(options.deserialize(e.newValue));
    });
  });

  createEffect(() => {
    localStorage.setItem(name, options.serialize(value()));
  });

  return [value, setValue];
};
