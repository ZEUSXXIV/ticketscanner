import React from 'react'
import { Image, StyleSheet, useWindowDimensions } from 'react-native'





export default function Logo() {
    const {height, width} = useWindowDimensions();
  return <Image source={require('../assets/logo.png')} style={{height: height / 3, width : width * 0.8 }} />
}

