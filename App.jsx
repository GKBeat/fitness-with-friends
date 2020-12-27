import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Color} from './components/Utils/constants';
import ExerciseList from './components/Screens/ExerciseList/ExerciseList';
import Home from './components/Screens/Home';
import Friends from './components/Screens/Friends/Friends';
import Profile from './components/Screens/Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
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
          tabBarIcon: ({color, size}) => (<Icon name='dumbbell' size={size} color={color}/>)
        }}/>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
          tabBarIcon: ({color, size}) => (<Icon name='home' size={size} color={color}/>)
        }}/>
        <Tab.Screen
          name="Friends"
          component={Friends}
          options={{
          tabBarIcon: ({color, size}) => (<Icon name='users' size={size} color={color}/>)
        }}/>
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
          tabBarIcon: ({color, size}) => (<Icon name='user-alt' size={size} color={color}/>)
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
