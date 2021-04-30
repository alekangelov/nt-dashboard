import { equals } from 'ramda';
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

function useDeepMemoSignal(dependencyArray: DependencyList): [number] {
  const value = useRef<DependencyList>();
  const signal = useRef<number>(0);

  if (!equals(value.current, dependencyArray)) {
    signal.current += 1;
    value.current = dependencyArray;
  }
  return [signal.current];
}

export default function useDeepEffect(
  callback: EffectCallback,
  dependencyArray: DependencyList,
): void {
  const deepMemoDeps = useDeepMemoSignal(dependencyArray);
  // eslint-disable-next-line
  return useEffect(callback, deepMemoDeps);
}
