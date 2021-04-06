import { EffectCallback, useEffect } from 'react';

export default function useMount(func: EffectCallback): void {
  useEffect(
    func,
    //eslint-disable-next-line
    [],
  );
}
