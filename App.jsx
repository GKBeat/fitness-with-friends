import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducer';

import BottomNavigation from './components/BottomNavigation'


export default function App() {

  const store = createStore(rootReducer);
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomNavigation/>
      </NavigationContainer>
    </Provider>
  );
}
