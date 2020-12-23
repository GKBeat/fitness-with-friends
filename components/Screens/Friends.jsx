import React, {useState} from "react";
import {StyleSheet, Text, SafeAreaView, Dimensions, View, TextInput, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar} from 'expo-status-bar';
import axios from 'axios';

import {Color} from '../Utils/constants';
import Button from '../Utils/Button';
const {width} = Dimensions.get("window");

export default function Friends() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const searchFriends = () => {
    axios.post('https://fit-in-time-server.herokuapp.com/user/search', {
      query: {
        username: search
      }
    }).then( response => {
      if(response.data.status){
        setUsers([...response.data.users]);
      }
    }).catch( err => {
      console.log(err);
    }).then(() => setSearch(''));
  }

  const addFriend = (friend) => {
    axios.put('https://fit-in-time-server.herokuapp.com/user/add', {
        user: {
          _id: '5fe0d007f9d7d32652cefb60'
        },
        friend: {
          _id: friend._id
        }
    }).then( response => {
        if(response.data.status){
          let tmp = users;
          let index = tmp.findIndex((user) => {
            if (user._id === friend._id) {
              return true;
            }
          });
          tmp.splice(index, 1);
          setUsers([...tmp]);
        }
    }).catch( err => {
        console.log(err);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder={'Freunde Suchen'}
        />  
        <Button
          marginY={0}
          size={40}
          color={Color.TAB_BAR_BACKGROUND_COLOR}
          onPress={searchFriends}
          text={<Icon name='search' size={10} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
          isRound={false}
        />
      </View>
      <FlatList
        data={users}
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
                  onPress={() => addFriend(item)}
                  text={<Icon name='plus' size={10} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                  isRound={true}
                />
            </View>
          )
        }}
        keyExtractor={user => user._id}
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
  search: {
    flexDirection: 'row'
  },
  searchedFriends: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: { 
    width: width-90, 
    height: 40, 
    borderColor: Color.FONT_COLOR, 
    borderWidth: 1, 
    padding: 5 
  }
});