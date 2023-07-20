import React, {useEffect, useState} from 'react';
import {Tab, Text, TabView, StyleSheet, ListItem, Avatar} from '@rneui/themed';
import Api from '../helpers/Api';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Bookings() {
  const [index, setIndex] = React.useState(0);

  const [data, setData] = useState({});

  const [ongoing, setOngoing] = useState([]);

  const [completed, setCompleted] = useState([]);

  

  useEffect(async() => {

    const monuId  = await AsyncStorage.getItem('monuid')

  console.log("monuId==>>", monuId)

    try {
      Api.get(`ticketmon/${monuId}`)
        .then((res, err) => {
          setData(res.data[0]);
          console.log('data==>>', res.data);
          var tempOng = [];
          var tempCom = [];
          res.data?.map(item => {
            item?.status == 'ongoing' ? tempOng.push(item) : tempCom.push(item);
          });

          setOngoing(tempOng);
          setCompleted(tempCom);
        })
        .catch(error => console.log('eeeee', JSON.stringify(error)));
    } catch (e) {
      console.log('err==>>', JSON.stringify(e));
    }
  }, []);

  const UserList = ({data}) => {
    return (
      <>
      <ScrollView>
        {data.map((item) => {
            const [expanded, setExpanded] = useState(false)
       return (

        <ListItem.Accordion noIcon
  content={
    <>
          <Avatar
              rounded
              title={item.name[0].toUpperCase()}
              containerStyle={{backgroundColor: 'grey'}}
            />
      <ListItem.Content style={{marginLeft:'2%'}}>

      <ListItem.Title >{item.name.toUpperCase()}</ListItem.Title>
        <ListItem.Subtitle>Tickets booked : {item.tickets}</ListItem.Subtitle>
      </ListItem.Content>
    </>
  }
  isExpanded={expanded}
  onPress={() => {
    setExpanded(!expanded);
  }}
>

    <ListItem  bottomDivider>
      <ListItem.Content>
        <ListItem.Subtitle>Phone</ListItem.Subtitle>
        <ListItem.Title>{item.phone}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>

    <ListItem  bottomDivider>
      <ListItem.Content>
        <ListItem.Subtitle>Email</ListItem.Subtitle>
        <ListItem.Title>{item.email}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>

    <ListItem  bottomDivider>
      <ListItem.Content>
        <ListItem.Subtitle>Date</ListItem.Subtitle>
        <ListItem.Title>{item.date}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>

    <ListItem  bottomDivider>
      <ListItem.Content>
        <ListItem.Subtitle>Tickets booked</ListItem.Subtitle>
        <ListItem.Title>{item.tickets}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>

    {
        item?.visited && (
            <ListItem  bottomDivider>
            <ListItem.Content>
              <ListItem.Subtitle>Visited</ListItem.Subtitle>
              <ListItem.Title>{item.visited}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )
    }


</ListItem.Accordion>
       

        )})}
        </ScrollView>
      </>
    );
  };

  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary">
        <Tab.Item title="ONGOING" titleStyle={{fontSize: 12}} />
        <Tab.Item title="COMPLETED" titleStyle={{fontSize: 12}} />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%'}}>
          <UserList data={ongoing} />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <UserList data={completed} />

          

        </TabView.Item>
      </TabView>
    </>
  );
}

// const styles = StyleSheet.create({})
