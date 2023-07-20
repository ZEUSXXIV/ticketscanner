import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../helpers/Api';
import axios from 'axios';
import Button from '../components/Button';

export default function Home({navigation}) {
  const {height, width} = useWindowDimensions();


  return (
    <View style={{display: 'flex', 
    backgroundColor: '#fff'
    }}>
      <View
        style={{
          height: height ,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#d4f1f9',
            height: height * 0.3,
            borderRadius: 500,
            width: height * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity

          onPress={()=> navigation.navigate('Scanner')}

            style={{
              backgroundColor: '#f3f3f3',
              height: height * 0.25,
              borderRadius: 500,
              width: height * 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: height * 0.15, width: height * 0.15}}
              source={require('../assets/qr.png')}
            />
            <Text style={{color: '#000'}}>SCAN QR</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{height: height / 2, flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button mode="contained" style={{backgroundColor: '#0D98BA'}}>
            Bookings
          </Button>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button mode="contained" style={{backgroundColor: '#0D98BA'}}>
            Profile
          </Button>
        </View>
      </View> */}
      {/* <View 
      // style={{height: height / 4, backgroundColor: 'pink'}}
      style={styles.bgcolor}
      ></View> */}
    </View>
  );
}

const styles = StyleSheet.create({

   bgcolor : {
    backgroundColor:'hotpink',
    height:100
  }

});
