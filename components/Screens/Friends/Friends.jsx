import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Color} from '../../Utils/constants';
import Search from './Search';
import Friendslist from './Friendslist';

const Tab = createMaterialTopTabNavigator();

export default function Friends() {
  return (
    <Tab.Navigator
      initialRouteName="Friendlist"
      backBehavior='history'
      tabBarOptions={{
      activeTintColor: Color.TAB_BAR_ACTIVE_COLOR,
      inactiveTintColor: Color.TAB_BAR_INACTIVE_COLOR,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: Color.TAB_BAR_BACKGROUND_COLOR
      }
    }}>
      <Tab.Screen
        name="Friendlist"
        component={Friendslist}
        options={{
        tabBarIcon: ({color, size}) => (<Icon name='user-friends' size={size} color={color}/>)
      }}/>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
        tabBarIcon: ({color, size}) => (<Icon name='search' size={size} color={color}/>)
      }}/>
    </Tab.Navigator>
  );
}
