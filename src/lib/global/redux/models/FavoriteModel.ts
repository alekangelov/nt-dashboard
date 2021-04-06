import { Favorite } from '../reducers/rootReducerTypes';

const makeFav = (url: string): string =>
  `https://api.faviconkit.com/${url}/144`;

export default function FavoriteModel({ url }: Favorite): Favorite {
  const newUrl = new URL(url).host;
  return {
    url,
    icon: makeFav(newUrl),
  };
}
