export * from './stored';
export * from './color';
export * from './search';

const createGenId = () => {
  const cache: Record<string, number> = {};
  return (name: string) => {
    cache[name] |= 0;
    return `${name}-${cache[name]++}`;
  };
};

export const genId = createGenId();

export const lerp = (
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outmax: number
) => {
  return ((num - inMin) * (outmax - outMin)) / (inMax - inMin) + outMin;
};
