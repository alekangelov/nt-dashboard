import countriesWithCities from 'all-countries-and-cities-json';
import { map, path, uniq } from 'ramda';
import { getKeys } from '../utils';
import { Option } from '../../Components/Form';

export const countries = getKeys(countriesWithCities);

export const arrayToDataList = map((e) => ({
  value: e as string,
  label: e as string,
}));

const mergeArrays = (...args: any[]) =>
  args.reduce((acc: any[], curr: any[]) => [...acc, ...curr]);

export const allCities = mergeArrays(...Object.values(countriesWithCities));

export const getCitiesFromCountry = (e: string): string[] => {
  const cities = path([e], countriesWithCities);
  if (!cities) {
    return [];
  }
  return cities as string[];
};

export const getCitiesDataList = (e: string): Option[] =>
  arrayToDataList(uniq(getCitiesFromCountry(e)) as any);

export const countriesDataList = arrayToDataList(countries) as Option[];
