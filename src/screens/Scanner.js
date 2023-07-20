import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Scanner({navigation}) {

    // const onSuccess = e => {
    //     // if(e.data)
    //     console.log(e)
    //   };

  return (
    <>
    <QRCodeScanner
        onRead={async(e)=> {
          console.log("e==>>",e.data)
          await AsyncStorage.setItem("ticketid", e.data);

          navigation.navigate('EditTicket')
        }}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </>
  )
}

const styles = StyleSheet.create({})