import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './redux/reducer';

import {Color, iconSizes} from './components/Utils/constants';
import ExerciseList from './components/Screens/ExerciseList/ExerciseList';
import Home from './components/Screens/Home';
import Friends from './components/Screens/Friends/Friends';
import Profile from './components/Screens/Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const store = createStore(rootReducer);
  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          backBehavior='history'
          shifting={true}
          activeColor={Color.TAB_BAR_ACTIVE_COLOR}
          inactiveColor={Color.TAB_BAR_INACTIVE_COLOR}
          barStyle={{
          backgroundColor: Color.TAB_BAR_BACKGROUND_COLOR
        }}>
          <Tab.Screen
            name="Exercise List"
            component={ExerciseList}
            options={{
            tabBarIcon: ({color}) => (<Icon name='dumbbell' size={iconSizes.mini} color={color}/>)
          }}/>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
            tabBarIcon: ({color}) => (<Icon name='home' size={iconSizes.mini} color={color}/>)
          }}/>
          <Tab.Screen
            name="Friends"
            component={Friends}
            options={{
            tabBarIcon: ({color}) => (<Icon name='users' size={iconSizes.mini} color={color}/>)
          }}/>
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarIcon: ({color}) => (<Icon name='user-alt' size={iconSizes.mini} color={color}/>)
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
