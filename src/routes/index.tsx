import * as React from 'react';
import { useTransition, animated } from '@react-spring/web';
import { Switch, Route, useLocation } from 'react-router-dom';
import Bookmarks from '../Components/Bookmarks';
import TodoList from '../Components/TodoList';
import Home from '../Components/Home';

const AnimatedSwitch: React.FC<any> = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    key: (e) => e.pathname,
    initial: {
      opacity: 1,
    },
    expires: 0,
    from: {
      position: 'relative',
      opacity: 0,
    },
    enter: {
      position: 'absolute',
      opacity: 1,
    },
    leave: {
      position: 'absolute',
      opacity: 0,
    },
  });
  return (
    <>
      {transitions((style, item) => {
        return (
          <animated.div
            key={item.pathname}
            className="animated-router"
            style={{
              position: 'absolute',
              opacity: style.opacity,
            }}
          >
            <Switch location={item}>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/todos" exact>
                <TodoList />
              </Route>
              <Route path="/bookmarks" exact>
                <Bookmarks />
              </Route>
            </Switch>
          </animated.div>
        );
      })}
    </>
  );
};
const Routes: React.FC<any> = () => {
  return (
    <div className="App_inner--router">
      <AnimatedSwitch />
    </div>
  );
};

export default Routes;
