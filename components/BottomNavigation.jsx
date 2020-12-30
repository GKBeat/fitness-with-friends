import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useSelector} from 'react-redux';

import {themeArray, iconSizes} from './Utils/constants';
import ExerciseList from './Screens/ExerciseList/ExerciseList';
import Home from './Screens/Home';
import Friends from './Screens/Friends/Friends';
import Profile from './Screens/Profile/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigation(){
  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  return (
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
  )
}