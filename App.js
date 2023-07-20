import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
import * as React from "react"
import LoginScreen from './src/screens/Login';
import Scanner from './src/screens/Scanner';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Bookings from './src/screens/Bookings';
import EditTicket from './src/screens/EditTicket';

import TabNav from './src/screens/TabNav'

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        initialRouteName="SplashScreen"
        >

<Stack.Screen
          options={{headerShown: false}}
          name="SplashScreen"
          component={SplashScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />

<Stack.Screen
          options={{headerShown: false}}
          name="TabNav"
          component={TabNav}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="LoginScreen"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Scanner"
          component={Scanner}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Bookings"
          component={Bookings}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="EditTicket"
          component={EditTicket}
        />
      </Stack.Navigator>
      {/* <View style={{backgroundColor: '#fff', flex: 1}}> */}
        {/* <LoginScreen/> */}
        {/* <Scanner/> */}
        {/* <Home/> */}
        {/* <Profile/> */}
        {/* <Bookings/> */}
        {/* <EditTicket/> */}
      {/* </View> */}
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});
