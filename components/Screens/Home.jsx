import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {fontSizes, iconSizes, themeArray} from '../Utils/constants';
import Exercise from '../Exercise';
import Button from '../Utils/Button';

import backend from '../Utils/backend';
import {useSelector} from 'react-redux';

export default function Home() {
  const [latestWorkout, setLatestWorkout] = useState(false);
  const [latestFriendsWorkouts, setLatestFriendsWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showWorkout, setShowWorkout] = useState(true);
  const [showFriendsProgress, setShowFriendsProgress] = useState(true);

  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  useEffect(() => {
    getAllWorkouts();
  }, []);

  const getAllWorkouts = (refresh) => {
    const requestOne = axios.post('https://fit-in-time-server.herokuapp.com/workout/', {
      user
    })
    const requestTwo = axios.post('https://fit-in-time-server.herokuapp.com/user/friendsprogress/', {
      user
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

  const cheer = async (friendId) => {
    console.log(friendId);
    let data = await backend.put('workout/cheer/', {
      user,
      friend: {
        _id: friendId
      }
    });
    console.log(data);
  } 

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllWorkouts(() => setRefreshing(false));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingHorizontal: 25,
      paddingTop: 25
    },
    friendWorkouts: {
      marginTop: 25
    },
    friendWorkoutsText: {
      marginBottom: 10,
      fontSize: fontSizes.small,
      fontWeight: 'bold'
    }
  });

  return (
    <SafeAreaView style={styles.container}>
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
            showWorkout ? <Icon name={'chevron-down'} size={iconSizes.medium} color={Color.FONT_COLOR}/> : <Icon name={'chevron-right'} size={iconSizes.medium} color={Color.FONT_COLOR}/>
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
            showFriendsProgress ? <Icon name={'chevron-down'} size={iconSizes.medium} color={Color.FONT_COLOR}/> : <Icon name={'chevron-right'} size={iconSizes.medium} color={Color.FONT_COLOR}/>
          }
        </TouchableOpacity>
        {
          showFriendsProgress && latestFriendsWorkouts.map((friendWorkout) => {
            return (
              <View key={friendWorkout._id.toString()}>
                <Text>Name: {friendWorkout.username}</Text>
                <Text>Fortschritt: {friendWorkout.progress}/{friendWorkout.exercises.length}</Text>
                <Button
                  marginY={10}
                  height={25}
                  width={25}
                  color={Color.TAB_BAR_BACKGROUND_COLOR}
                  onPress={() => { cheer(friendWorkout.userId) }}
                  text={ <Icon name='bullhorn' size={iconSizes.mini} color={Color.TAB_BAR_INACTIVE_COLOR}/>}/>
              </View>
            )
          })
        }
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

