import { useDispatch } from 'react-redux';

const useAction = <T extends (input: Parameters<T>[0]) => void>(
  action: T,
): ((input: Parameters<T>[0]) => void) => {
  const dispatch = useDispatch();
  return (input: Parameters<T>[0]) => dispatch(action(input));
};

export default useAction;
