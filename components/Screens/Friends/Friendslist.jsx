import React, {useEffect, useState} from "react";
import {StyleSheet, Text, SafeAreaView, Dimensions, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar} from 'expo-status-bar';
import axios from 'axios';

import {Color, LoggedInUserID} from '../../Utils/constants';
import Button from '../../Utils/Button';
const {width} = Dimensions.get("window");

export default function Friendslist() {
  const [friends, setFriends] = useState([]);

  useEffect(() =>{
    axios.post('https://fit-in-time-server.herokuapp.com/user/friends', {
      user: {
        _id: LoggedInUserID
      }
    }).then( response => {
      if(response.data.status){
        setFriends(response.data.friends);  
      }
    }).catch( err => {
      console.log(err);
    });
  }, [])

  const addFriend = (friend) => {
    axios.put('https://fit-in-time-server.herokuapp.com/user/add', {
        user: {
          _id: LoggedInUserID
        },
        friend: {
          _id: friend._id
        }
    }).then( response => {
        if(response.data.status){
          let tmp = friends;
          let index = tmp.findIndex((user) => {
            if (user._id === friend._id) {
              return true;
            }
          });
          tmp.splice(index, 1);
          setFriends([...tmp]);
        }
    }).catch( err => {
        console.log(err);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={friends}
        renderItem={({item}) => {
          return (
            <View style={styles.searchedFriends}>
              <View>
                <Text>Name: {item.username}</Text>
                <Text>Level: {item.level}</Text>
              </View>
              <Button
                  marginY={10}
                  size={25}
                  color={Color.TAB_BAR_BACKGROUND_COLOR}
                  onPress={() => addFriend(item, false)}
                  text={<Icon name='minus' size={10} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                  isRound={true}
                />
            </View>
          )
        }}
        keyExtractor={friend => friend._id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    paddingHorizontal: 25,
    paddingTop: 25  
  },
  textColor: {
    color: Color.FONT_COLOR
  },
  searchedFriends: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});