import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Api from '../helpers/Api';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const {width, height} = useWindowDimensions();

  const [data, setData] = useState({});

  const [image, setImage] = useState('');
  useEffect(async() => {

    const monuId  = await AsyncStorage.getItem('monuid')

    console.log("monuId==>>", monuId)

    try {
      Api.get(`gallery/${monuId}`)
        .then((res, err) => {
          setImage(res.data[0]?.main_img);
          console.log('data==>>', res.data[0]?.main_img);
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }

    try {
      Api.get(`monument/${monuId}`)
        .then((res, err) => {
          setData(res.data[0]);
          console.log('data==>>', res.data[0]);
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#d4f1f9',
      }}>
      <Text
        style={{
          fontSize: 25,
          color: '#0D98BA',
          fontWeight: 'bold',
          marginBottom: '10%',
        }}>
        MONUMENT
      </Text>

      <Image
        // source={require('../assets/logo.png')}
        source={{uri: image}}
        style={{height: width / 3, width: width / 3, borderRadius: 500}}
      />

      <View style={{width: '80%', flexDirection: 'row', margin: '5%'}}>
        <Image
          source={require('../assets/museum.png')}
          style={{height: width * 0.1, width: width * 0.1}}
        />
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: '#0D98BA'}}>{data?.site}</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          borderColor: '#0D98BA',
          backgroundColor: '#0D98BA',
        }}
      />

      <View style={{width: '80%', flexDirection: 'row', margin: '5%'}}>
        <Image
          source={require('../assets/time.png')}
          style={{height: width * 0.1, width: width * 0.1}}
        />
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: '#0D98BA'}}>
            {data?.visitingTime ? data?.visitingTime : 'Not Specified'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          borderColor: '#0D98BA',
          backgroundColor: '#0D98BA',
        }}
      />

      <View style={{width: '80%', flexDirection: 'row', margin: '5%'}}>
        <Image
          source={require('../assets/location.png')}
          style={{height: width * 0.1, width: width * 0.1}}
        />
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: '#0D98BA'}}>{`${data?.village} ${
            data?.taluka
          } ${data?.district ? data?.district + ' Goa' : ''} `}</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          borderColor: '#0D98BA',
          backgroundColor: '#0D98BA',
        }}
      />

      <View style={{width: '80%', flexDirection: 'row', margin: '5%'}}>
        <Image
          source={require('../assets/price.png')}
          style={{height: width * 0.1, width: width * 0.1}}
        />
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: '#0D98BA'}}>
            {data?.price ? '₹' + data?.price + '/- per ticket' : '-'}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          borderColor: '#0D98BA',
          backgroundColor: '#0D98BA',
        }}
      />

      <Button mode="contained" onPress={()=> 
      {
        AsyncStorage.clear()
        navigation.navigate('LoginScreen')
      }} style={{backgroundColor: '#0D98BA'}}>
        LOGOUT
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
