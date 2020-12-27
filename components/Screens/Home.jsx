import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar} from 'expo-status-bar';

import {Color, LoggedInUserID} from '../Utils/constants';
import Exercise from '../Exercise';

export default function Home() {
  const [latestWorkout, setLatestWorkout] = useState(false);
  const [latestFriendsWorkouts, setLatestFriendsWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showWorkout, setShowWorkout] = useState(true);
  const [showFriendsProgress, setShowFriendsProgress] = useState(true);

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const getAllWorkouts = (refresh) => {
    const requestOne = axios.post('https://fit-in-time-server.herokuapp.com/workout/', {
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

  const checkAllAbsolved = () => {
    if(latestWorkout){
      let absolvedExercises = latestWorkout.exercises.filter((exercise) => {
        return exercise.absolved;
      })
      if(absolvedExercises.length === latestWorkout.exercises.length){
        return <Text>Du hast dein heutiges Training geschafft🔥🔥🔥</Text>
      }
    }
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
        <TouchableOpacity
          onPress={() => setShowWorkout(!showWorkout)}
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <Text style={styles.friendWorkoutsText}>Dein heutiges Workout</Text>
          {
            showWorkout ? <Icon name={'chevron-down'} size={24} color={Color.FONT_COLOR}/> : <Icon name={'chevron-right'} size={24} color={Color.FONT_COLOR}/>
          }
        </TouchableOpacity>
        
          {
            latestWorkout && showWorkout && latestWorkout.exercises.map((exercise) => {
              return (
                <Exercise
                  key={exercise._id}
                  exercise={exercise}
                  workoutId={latestWorkout._id}
                />
              )
            })
          }
          {
            checkAllAbsolved()
          }
      </View>

      <View style={styles.friendWorkouts}>
        <TouchableOpacity
          onPress={() => setShowFriendsProgress(!showFriendsProgress)}
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <Text style={styles.friendWorkoutsText}>Der Workoutfortschritt deiner Freunde:</Text>
          {
            showFriendsProgress ? <Icon name={'chevron-down'} size={24} color={Color.FONT_COLOR}/> : <Icon name={'chevron-right'} size={24} color={Color.FONT_COLOR}/>
          }
        </TouchableOpacity>
        {
          showFriendsProgress && latestFriendsWorkouts.map((friendWorkout) => {
            return (
              <View key={friendWorkout._id.toString()}>
                <Text>Name: {friendWorkout.username}</Text>
                <Text>Fortschritt: {friendWorkout.progress}/{friendWorkout.exercises.length}</Text>
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
  friendWorkouts: {
    marginTop: 25
  },
  friendWorkoutsText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
});