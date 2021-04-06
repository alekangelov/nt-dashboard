import React, { ReactElement, useCallback, useRef } from 'react';
import { getKeys } from '../../lib/utils';
import { Select } from '../helpers';

interface SearchFunctions {
  Google: (e: string) => string;
  DuckDuckGo: (e: string) => string;
  Bing: (e: string) => string;
  Yahoo: (e: string) => string;
  YouTube: (e: string) => string;
}

const SEARCH_FUNCTIONS: SearchFunctions = {
  Google: (e: string) => `https://www.google.com/search?q=${encodeURI(e)}`,
  YouTube: (e: string) =>
    `https://www.youtube.com/results?search_query=${encodeURI(e)}`,
  DuckDuckGo: (e: string) => `https://www.google.com/search?q=${encodeURI(e)}`,
  Bing: (e: string) => `https://www.google.com/search?q=${encodeURI(e)}`,
  Yahoo: (e: string) => `https://www.google.com/search?q=${encodeURI(e)}`,
};

const SEARCH_ENGINES = getKeys(SEARCH_FUNCTIONS);

const changeLocation = (e: string) => {
  window.location.href = e;
};

function SearchBar(): ReactElement {
  const searchFunction = useRef(SEARCH_FUNCTIONS[SEARCH_ENGINES[0]]);
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const search: string = (data.get('search') as string) || '';
      changeLocation(searchFunction.current(search));
    },
    [searchFunction],
  );
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          placeholder="Search..."
          className="search-bar__real"
        />
        <Select
          className="search-select"
          initialValue={SEARCH_ENGINES[0]}
          items={SEARCH_ENGINES.map((e) => ({
            label: e,
            value: e,
          }))}
          onChange={(e) => {
            searchFunction.current =
              SEARCH_FUNCTIONS[e as keyof SearchFunctions];
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
