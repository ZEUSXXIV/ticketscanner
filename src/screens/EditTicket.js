import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Divider, Input} from '@rneui/themed';
import Api from '../helpers/Api';
import SelectDropdown from 'react-native-select-dropdown';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

const {width} = Dimensions.get('window');

export default function EditTicket({navigation}) {
  const [data, setData] = useState({});
  const [arrayOfVisited, setArrayOfVisited] = useState([]);

  const [visited, setVisited] = useState(0);

  async function readValue(key) {
    const v = await AsyncStorage.getItem(key);
    return v;
  }

  useEffect(async () => {
    ticketid = await readValue('ticketid');

    try {
      Api.get(`ticket/${ticketid}`)
        .then((res, err) => {
          setData(res.data[0]);
          console.log('data==>>', res.data[0]);

          AsyncStorage.getItem('monuid').then(id => {
            console.log('id==>>', id);
            if (id !== res.data[0]?.monument_id) {
              console.log("does not match")
              navigation.navigate('TabNav')
            };
          });

          setVisited(parseInt(res.data[0]?.tickets));

          for (var i = 0; i <= parseInt(res.data[0]?.tickets); i++) {
            console.log('i==>>', i);
            setArrayOfVisited(item => [...item, i]);
          }
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }
  }, []);

  const saveVisited = () => {
    var temp = {
      uid: data.uid,
      name: data.name,
      phone: data.phone,
      email: data.email,
      date: data.date,
      tickets: data.tickets,
      monument_id: data.monument_id,
      total: data.total,
      status: 'completed',
      visited: visited,
    };

    console.log('data to be sent==>>', temp);

    try {
      Api.put(`ticket/${ticketid}`, temp)
        .then((res, err) => {
          console.log('data==>>', res.data);

          navigation.navigate('TabNav')
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }
  };

  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}>
        {data !== [] ? (
          <View
            style={{
              width: '80%',
              height: '100%',
              //   backgroundColor:'red',
              // display:'flex',
              // flexDirection:'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#000',
                // textDecorationLine: 'underline',
                marginBottom: '5%',
              }}>
              Ticket Details
            </Text>

            <Divider width={5} color="#000" />
            <View style={{width: '100%'}}>
              <Text style={{fontSize: 15, color: '#000'}}>Ticket ID</Text>
              <Input placeholder="Ticket ID" disabled value={data?._id} />
            </View>
            <View style={{width: '100%'}}>
              <Text style={{fontSize: 15, color: '#000'}}>Name</Text>
              <Input placeholder="Name" disabled value={data?.name} />
            </View>

            <View style={{width: '100%'}}>
              <Text style={{fontSize: 15, color: '#000'}}>Phone</Text>
              <Input placeholder="Phone" disabled value={data?.phone} />
            </View>

            <View style={{width: '100%'}}>
              <Text style={{fontSize: 15, color: '#000'}}>Email</Text>
              <Input
                placeholder="eg. abc@example.com"
                disabled
                value={data?.email}
              />
            </View>

            <View style={{width: '100%'}}>
              <Text style={{fontSize: 15, color: '#000'}}>Tickets</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <SelectDropdown
                  data={arrayOfVisited}
                  defaultValue={arrayOfVisited[arrayOfVisited.length - 1]}
                  disabled
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

                <SelectDropdown
                  data={arrayOfVisited}
                  defaultValue={arrayOfVisited[arrayOfVisited.length - 1]}
                  //   disabled
                  onSelect={value => console.log('value==>', setVisited(value))}
                  defaultButtonText="-"
                  buttonStyle={styles.dropdownBtnStyle}
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
              </View>
              <View style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                <Button mode="contained" onPress={saveVisited}>
                  EDIT
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </>
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
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#ddd',
    // marginRight:'5%'
  },

  dropdownBtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginRight: '5%',
  },

  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});
