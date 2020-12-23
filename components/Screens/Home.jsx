import React, {useEffect, useState} from "react";
import {StyleSheet, Text, SafeAreaView, View, FlatList} from 'react-native';
import axios from 'axios';
import {StatusBar} from 'expo-status-bar';

import {Color} from '../Utils/constants';

export default function Home() {
  const [latestWorkouts, setLatestWorkouts] = useState([]);

  useEffect(() => {
    axios.post('https://fit-in-time-server.herokuapp.com/user/friendsprogress/', {
      user: {
        _id: '5fe0d007f9d7d32652cefb60'
      }
    }).then(response => {
        console.log(response.data, 'data');
        setLatestWorkouts(response.data.listOfFriendsWorkout);
    }).catch(err => {
        console.log(err, 'err');
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={latestWorkouts}
        renderItem={({item}) => {
        return (
          <View key={item._id}>
            <Text>{item}</Text>
          </View>
        )
      }}
        keyExtractor={workout => workout._id}
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