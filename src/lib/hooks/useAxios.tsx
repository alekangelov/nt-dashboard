import { useState } from 'react';
import { delay } from '../libhelpers';

interface IState<T extends any> {
  error?: string;
  result?: T;
  loading: boolean;
}
export default function useAxios<T, Y>(
  request: (body: T) => any,
  initialState: IState<Y> = {
    error: undefined,
    result: undefined,
    loading: false,
  },
): [IState<Y>, (body: T) => Promise<IState<Y>>] {
  const [state, setState] = useState<IState<Y>>(initialState);

  const req = async (body: T) => {
    setState((prevState) => ({
      ...prevState,
      result: undefined,
      error: undefined,
      loading: true,
    }));
    await delay(0.05);
    let retstate: IState<Y> = { loading: true };
    try {
      const result: ReturnType<typeof request> = await request(body);
      setState((prevState) => ({ ...prevState, result }));
      retstate = { ...retstate, result };
    } catch (e) {
      setState((prevState) => ({
        ...prevState,
        error: e instanceof Error ? e.message : e,
      }));
      retstate = {
        ...retstate,
        error: e instanceof Error ? e.message : e,
      };
    } finally {
      retstate = {
        ...retstate,
        loading: false,
      };
      setState((prevState) => ({ ...prevState, loading: false }));
    }
    return Promise.resolve(retstate);
  };
  return [state, req];
}
