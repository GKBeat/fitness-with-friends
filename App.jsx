import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import {BASE_URL} from 'react-native-dotenv';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducer';

import BottomNavigation from './components/BottomNavigation'
import Startup from './components/Screens/Startup/Startup';
import {StatusBar} from 'expo-status-bar';



export default function App() {

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <StatusBar hidden={true}/>
      <NavigationContainer>
        <Startup/>
      </NavigationContainer>
    </Provider>
  );
}
