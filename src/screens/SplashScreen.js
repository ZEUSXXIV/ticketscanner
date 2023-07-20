import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'

import Logo from '../components/Logo'

const SplashScreen = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('LoginScreen')
        },1000)
    },[])

  return (
<View style={{justifyContent: 'center', alignItems: 'center', flex:1, backgroundColor:"#fff"}} >
  <Logo/>
</View>
  )
}

export default SplashScreen