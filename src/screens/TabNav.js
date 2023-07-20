import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './Home';
import Profile from './Profile';
import Bookings from './Bookings';

const TabArr = [
  {
    route: 'Tickets',
    label: 'Tickets',
    icon: <FontAwesome5 name="ticket-alt" color={'#444'} size={25} />,
    component: Bookings,
  },

  {
    route: 'Home',
    label: 'Home',
    icon: <MaterialCommunityIcons name="qrcode-scan" color={'#444'} size={25} />,
    component: Home,
  },

  {
    route: 'Profile',
    label: 'Profile',
    icon: <FontAwesome5 name="monument" color={'#444'} size={25} />,
    component: Profile,
  },

  //   {
  //     route: 'Search',
  //     label: 'Search',
  //     type: Icons.MaterialCommunityIcons,
  //     activeIcon: 'timeline-plus',
  //     inActiveIcon: 'timeline-plus-outline',
  //     icon:<Image source={require("../assets/icons/search.png")}  style={{height:25, width:25}}  />,
  //     activeIcon: <Image source={require("../assets/icons/search_active.png")}  style={{height:25, width:25}}  />,
  //     component: Home,
  //   },
  //   {
  //     route: 'Main',
  //     label: 'Main',
  //     type: Icons.MaterialCommunityIcons,
  //     activeIcon: 'timeline-plus',
  //     inActiveIcon: 'timeline-plus-outline',
  //     icon:<Image source={require("../assets/icons/gradient_circle.png")}  style={{height:40, width:40}}  />,
  //     activeIcon: <Image source={require("../assets/icons/gradient_circle.png")}  style={{height:40, width:40}}  />,
  //     component: Home,
  //   },
  //   {
  //     route: 'Account',
  //     label: 'Account',
  //     type: Icons.FontAwesome,
  //     activeIcon: 'user-circle',
  //     inActiveIcon: 'user-circle-o',
  //     icon:<Image source={require("../assets/icons/ticket.png")}  style={{height:20, width:20}}  />,
  //     activeIcon: <Image source={require("../assets/icons/ticket_active.png")}  style={{height:20, width:20}}  />,
  //     component: MyBookings,
  //   },
  //   {
  //     route: 'Cart',
  //     label: 'Cart',
  //     type: Icons.FontAwesome,
  //     activeIcon: 'user-circle',
  //     inActiveIcon: 'user-circle-o',
  //     icon:<Image source={require("../assets/icons/favourites.png")}  style={{height:25, width:25}}  />,
  //     activeIcon: <Image source={require("../assets/icons/favourites_active.png")}  style={{height:25, width:25}}  />,
  //     // activeIcon: <Image source={require("../assets/gifs/user-icon.gif")}  style={{height:25, width:25}}  />,
  //     component: Favourites,
  //   },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

//   useEffect(() => {
//     if (focused) {
//       viewRef.current.animate({
//         0: {scale: 1},
//         1: {scale: 1},
//       });
//     } else {
//       viewRef.current.animate({
//         0: {scale: 1},
//         1: {scale: 1},
//       });
//     }
//   }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <View  style={styles.container}>
        {item.icon}
      </View>
    </TouchableOpacity>
  );
};

export default function AnimTab1() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          // bottom: 16,
          // right: 16,
          // left: 16,
          // borderRadius: 16,
          backgroundColor: '#fff',
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor:'#28282B'
  },
});
