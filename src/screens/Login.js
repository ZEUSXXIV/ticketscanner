import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import SelectDropdown from 'react-native-select-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import Api from '../helpers/Api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

export default function Login({navigation}) {

  const [password, setPassword] = useState({value: '', error: ''});

  const [arrayOfVisited, setArrayOfVisited] = useState([]);
  const [visited, setVisited] = useState(0);

  const [data, setData] = useState([])

  async function readValue(key) {
    const v = await AsyncStorage.getItem(key);
    return v;
  }



  useEffect(async () => {

    if(await readValue('monuid')){
      console.log("besto chalta mhare",await readValue('monuid'))
      navigation.navigate('TabNav')
    }

    try {
      Api.get('monument')
        .then((res, err) => {
          console.log('data==>>', res.data[0]);
          setData(res.data)

          res.data?.map((monu)=> setArrayOfVisited(item => [...item, monu.site]))
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }
  }, []);


  const onLoginPressed = async() => {
    const passwordError = passwordValidator(data[visited],password.value);
    
    if (passwordError !='') {
      setPassword({...password, error: passwordError});
      return;
    }

    console.log("safe to continue")
    await AsyncStorage.setItem("monuid", data[visited]._id);


    navigation.navigate("TabNav")


  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex:1}}>
      <Logo />
      {/* <TextInput
        label="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
      /> */}

<SelectDropdown
                  data={arrayOfVisited}
                  defaultValue={arrayOfVisited[0]}
                  //   disabled
                  onSelect={(value, i)=> setVisited(i)}
                  defaultButtonText="-"
                  buttonStyle={styles.dropdown2BtnStyle}
                  buttonTextStyle={styles.dropdown2BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-circle-up' : 'chevron-down'}
                        color={'#444'}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown2DropdownStyle}
                  rowStyle={styles.dropdown2RowStyle}
                  rowTextStyle={styles.dropdown2RowTxtStyle}
                />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onLoginPressed}>
        LOGIN
      </Button>
    </View>

  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    // flex: 1,
    height: 50,
    width:'80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor:'#fff',
    // marginRight:'5%'
  },

  dropdownBtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginRight:'5%'
  },

  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', borderRadius: 8},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});

