import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/de';

import {Color, iconSizes} from '../../Utils/constants';

export default function workoutHistory(props){
  const [history, setHistory] = useState(props.history);
  const [showExercises, setShowExercises] = useState(false);

  useEffect(() => {
    moment.locale('de');
    setHistory(props.history);
  }, [props.history])

  return (
    <View>
      <View style={styles.history}>
        <TouchableOpacity
          onPress={() => setShowExercises(!showExercises)}
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
        >
          <View>
            <Text><Text style={styles.bold}>Beendet am:</Text> {moment(history.updatedAt).format('DD.MM.YY HH:mm')}</Text>
            <Text><Text style={styles.bold}>Level:</Text> {history.level}</Text>
            <Text><Text style={styles.bold}>Übungen geschafft:</Text> {history.progress} / {history.exercises.length}</Text>
          </View>
          {
            showExercises ? <Icon name={'chevron-down'} size={iconSizes.medium} color={Color.FONT_COLOR}/> : <Icon name={'chevron-right'} size={iconSizes.medium} color={Color.FONT_COLOR}/>
          }
        </TouchableOpacity>
      </View>
      {
        showExercises && history.exercises.map((exercise) => {
          return (
            <View style={styles.historyItem} key={exercise._id}>
              <View>
                <Text><Text style={styles.bold}>Übung:</Text> {exercise.exercise}</Text>
                <Text><Text style={styles.bold}>Categorie:</Text> {exercise.category}</Text>
              </View>
              {
                exercise.absolved ? <Icon name={'check-square'} size={iconSizes.medium} color={Color.TAB_BAR_ACTIVE_COLOR}/> : <Icon name={'square'} size={iconSizes.medium} color={Color.TAB_BAR_ACTIVE_COLOR}/>
              }
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  history: {
    marginVertical: 10,
    borderBottomColor: Color.FONT_COLOR,
    borderBottomWidth: 2,
  },
  historyItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: Color.FONT_COLOR,
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row'
  },
  bold: {
    fontWeight: 'bold'
  }
});