import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import axios from 'axios';

import {Color, LoggedInUserID} from '../Utils/constants';

export default function Profil() {
  const [user,setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = (refresh) => {
    axios.post('https://fit-in-time-server.herokuapp.com/user/one', {
      query: {
        _id: LoggedInUserID
      }
    }).then(response => {
      if (response.data.status) {
        console.log(response.data.user);
        setUser({...response.data.user});
      }
    }).catch(err => {
      console.log(err);
    }).then(() => refresh && refresh());
  }

  const motivationText = (current, highest) => {
    if (current === 0) {
      return 'Starte dein Workout im Homescreen um mit deiner Streak zu starten.';
    } else if (current === highest - 1 || current === highest) {
      return 'Du bist kurz davor dein Rekord zu brechen, bloß nicht nachlassen!💪🏽';
    } else if (current > 14) {
      return 'YOU ARE ON 🔥🔥🔥';
    } else if (current > 7) {
      return 'Nicht nachlassen, du bist auf einem guten weg';
    } else if (current > 0) {
      return 'Weiter so!💪🏽';
    } else {
      return '😳 Das sohlte nicht pasieren, 🤡 <- Programierhrer';
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUser(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true}/>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Text style={styles.username}>{user.username}</Text>
          <View>
            <Text style={styles.textColor}>Trainingslevel: {user.level}</Text>
            <Text style={styles.textColor}>Höchste in folge Trainiertertage: {user.highestStreak}</Text>
            <Text style={styles.textColor}>
              Aktuelle in folge Trainiertertage: {user.workoutStreak}
            </Text>
          </View>
          <Text style={styles.motivation}>{motivationText(user.workoutStreak, user.highestStreak)}</Text>
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
  textColor: {
    color: Color.FONT_COLOR
  },
  motivation: {
    color: Color.FONT_COLOR,
    paddingTop: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    opacity: 0.8
  },
  username: {
    color: Color.FONT_COLOR,
    paddingBottom: 5,
    fontWeight: 'bold',
    opacity: 0.8
  }
});