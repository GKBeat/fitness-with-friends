import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import axios from 'axios';
import {StatusBar} from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Color, LoggedInUserID} from '../Utils/constants';
import Button from '../Utils/Button';

export default function Home() {
  const [latestWorkout, setLatestWorkout] = useState(false);
  const [latestFriendsWorkouts, setLatestFriendsWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const getAllWorkouts = (refresh) => {
    const requestOne =axios.post('https://fit-in-time-server.herokuapp.com/workout/', {
      user: {
        _id: LoggedInUserID
      }
    })
    const requestTwo = axios.post('https://fit-in-time-server.herokuapp.com/user/friendsprogress/', {
      user: {
        _id: LoggedInUserID
      }
    })
    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      if(responseOne.data.status && responseTwo.data.status){
        setLatestWorkout(responseOne.data.latestWorkout);
        setLatestFriendsWorkouts([...responseTwo.data.listOfFriendsWorkout]);
      }
    })).catch(errors => {
      console.log(errors, 'err');
    }).then(() => refresh && refresh())
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllWorkouts(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <View>
        <Text style={styles.friendWorkoutsText}>Dein heutiges Workout:</Text>
          {
            latestWorkout && latestWorkout.exercises.map((exercise) => {
              return (
                <View style={styles.checkExercise} key={exercise._id.toString()}>
                  <View>
                    <Text>exercise: {exercise.exercise}</Text>
                    <Text>category: {exercise.category}</Text>
                  </View>
                  <Button
                    marginY={10}
                    size={25}
                    color={Color.TAB_BAR_BACKGROUND_COLOR}
                    onPress={() => {
                      console.log('MarkAsChecked');
                    }}
                    text={<Icon name='check' size={10} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                    isRound={true}
                  />
                </View>
              )
            })
          }
      </View>

      <View style={styles.friendWorkouts}>
        <Text style={styles.friendWorkoutsText}>Die Workouts deiner Freunde:</Text>
        {
          latestFriendsWorkouts.map((friendWorkout) => {
            return (
              <View key={friendWorkout._id.toString()}>
                <Text>Friend: {friendWorkout.username}</Text>
                <Text>Progress: {friendWorkout.progress}/{friendWorkout.exercises.length}</Text>
              </View>
            )
          })
        }
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    padding: 25
  },
  checkExercise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Color.FONT_COLOR,
    borderBottomWidth: 2,
    marginBottom: 10
  }, 
  friendWorkouts: {
    marginTop: 25
  },
  friendWorkoutsText: {
    marginBottom: 10
  }
});