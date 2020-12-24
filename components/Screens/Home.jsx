import React, {useEffect, useState} from "react";
import {StyleSheet, Text, SafeAreaView, View, FlatList} from 'react-native';
import axios from 'axios';
import {StatusBar} from 'expo-status-bar';

import {Color, LoggedInUserID} from '../Utils/constants';

export default function Home() {
  const [latestWorkout, setLatestWorkout] = useState({});
  const [latestFriendsWorkouts, setLatestFriendsWorkouts] = useState([]);

  useEffect(() => {
    axios.post('https://fit-in-time-server.herokuapp.com/user/friendsprogress/', {
      user: {
        _id: LoggedInUserID
      }
    }).then(response => {
        setLatestFriendsWorkouts([...response.data.listOfFriendsWorkout]);
    }).catch(err => {
        console.log(err, 'err');
    });

    axios.post('https://fit-in-time-server.herokuapp.com/workout/', {
      user: {
        _id: '5fe4dc661c914a00172146f6'
      }
    }).then(response => {
        setLatestWorkout(response.data.latestWorkout);
    }).catch(err => {
        console.log(err, 'err');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={latestWorkout.exercises}
        renderItem={({item}) => {
          return (
            <View>
              <Text>exercise: {item.exercise}</Text>
              <Text>category: {item.category}</Text>
            </View>
          )
        }}
        keyExtractor={workout => workout._id.toString()}
      />
      <FlatList
        data={latestFriendsWorkouts}
        renderItem={({item}) => {
          return (
            <View>
              <Text>Friend: {item.username}</Text>
              <Text>Progress: {item.progress}/{item.exercises.length}</Text>
            </View>
          )
        }}
        keyExtractor={workout => workout._id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    padding: 25
  },
});