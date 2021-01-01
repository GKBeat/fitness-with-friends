
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import BottomNavigation from '../../BottomNavigation';
import React from 'react';

const Stack = createStackNavigator();

export default function Startup() {
 return (
   <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Signup" component={Signup}/>
    <Stack.Screen name="Home" component={BottomNavigation}/>
   </Stack.Navigator>
 ) 
}