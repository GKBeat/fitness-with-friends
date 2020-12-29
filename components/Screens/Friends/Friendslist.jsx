import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {StatusBar} from 'expo-status-bar';
import axios from 'axios';

import {themeArray, LoggedInUserID, iconSizes} from '../../Utils/constants';
import Button from '../../Utils/Button';

export default function Friendslist() {
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  useEffect(() =>{
    getFriends();
  }, []);

  const getFriends = (refresh) => {
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
    }).then(() => refresh && refresh());
  }

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFriends(() => setRefreshing(false));
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {
          friends.map((friend) => {
            return (
              <View style={styles.searchedFriends} key={friend._id.toString()}>
                <View>
                  <Text>Name: {friend.username}</Text>
                  <Text>Level: {friend.level}</Text>
                </View>
                <Button
                    marginY={10}
                    height={25}
                    width={25}
                    color={Color.TAB_BAR_BACKGROUND_COLOR}
                    onPress={() => addFriend(friend, false)}
                    text={<Icon name='minus' size={iconSizes.mini} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                    isRound={true}
                  />
              </View>
            )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

