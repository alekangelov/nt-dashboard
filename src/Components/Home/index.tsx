import * as React from 'react';
import Clock from '../Clock';
import Favicons from '../Favicons';
import SearchBar from '../Search';
import Weather from '../Weather';

const Home = () => {
  return (
    <div className="homepage">
      <div className="search">
        <div className="search-time">
          <Clock />
          <Weather />
        </div>
        <SearchBar />
      </div>
      <div className="stickies">
        <Favicons />
      </div>
    </div>
  );
};

export default Home;
