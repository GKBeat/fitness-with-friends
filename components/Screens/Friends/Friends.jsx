import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {themeArray, iconSizes} from '../../Utils/constants';
import Search from './Search';
import Friendslist from './Friendslist';

const Tab = createMaterialTopTabNavigator();

export default function Friends() {
  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];
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
        tabBarIcon: ({color, size}) => (<Icon name='user-friends' size={iconSizes.mini} color={color}/>)
      }}/>
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
        tabBarIcon: ({color, size}) => (<Icon name='search' size={iconSizes.mini} color={color}/>)
      }}/>
    </Tab.Navigator>
  );
}
