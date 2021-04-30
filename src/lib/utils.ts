import {
  drop,
  filter,
  omit,
  pathEq,
  complement,
  keys,
  pipe,
  join,
  map,
  sortBy,
  identity,
  mergeAll,
  propEq,
  prop,
  equals,
  where,
  ifElse,
  propOr,
  reject,
} from 'ramda';

export const omitChildren = omit(['children']);

export const removeFirstFromArray = drop(1);

export const removeFromListWhereId: (e: string) => (x: any[]) => any[] = (
  e: string,
) => filter(complement(pathEq(['props', 'id'], e)));

export const changeFromListWhereId = (newItem: any) =>
  map(ifElse(where({ id: equals(newItem.id) }), () => newItem, identity));

export const getKeys = keys;

export const getSortedKeys = <T>(x: T): string =>
  pipe(
    keys,
    sortBy(identity),
    map((e) => [`${e}="${x[e as keyof T]}"`]),
    join(','),
  )(x);

export function makeid(length = 5): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const makeType = <T extends string>(e: T): { [x: string]: string } => ({
  [e]: `DASHBOARD/${e}`,
});

export const createTypes = pipe(map(makeType), mergeAll);

export const removeFromArrayWhere = (url: string) =>
  filter(complement(propEq('url', url)));

export const getValuesFromOption = map(prop('value'));

export const todosAreDone = filter(propEq('done', true));

export const todosAreNotDone = filter(propEq('done', false));

export const defaultToC = propOr('c', 'u');

export const removeEmpty = reject(complement(Boolean));

export const fileToDataUrl = (file: File): Promise<string> =>
  // eslint-disable-next-line
  new Promise(async (resolve, rej) => {
    if (!file) rej();
    const blob = new Blob([new Uint8Array(await file.arrayBuffer())], {
      type: file.type,
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      rej(error);
    };
  });

export const byteSize = (str: string) => new Blob([str]).size;

export const parseBool = (str: any = 'FALSE') =>
  typeof str === 'string' ? str.toUpperCase() === 'TRUE' : Boolean(str);
