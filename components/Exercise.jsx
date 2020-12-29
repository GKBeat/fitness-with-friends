import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {themeArray, fontSizes} from './Utils/constants';
import Button from './Utils/Button';

export default function Exercise(props) {
  const [absolved, setAbsolved] = useState(props.exercise.absolved);
  const exercise = props.exercise;

  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  useEffect(() => {
    absolve();
  }, [absolved]); 

  const absolve = () => {
    axios.post('https://fit-in-time-server.herokuapp.com/workout/absolvedexercise', {
      workout: {
        _id: props.workoutId
      },
      exercise: {
        _id: exercise._id,
        // TODO: ugly
        absolved: absolved
      }
    }).then( response => {
      //console.log(response.data.updatedWorkout);
    }).catch( err => {
      console.log(err);
    });
  }

  const styles = StyleSheet.create({
    checkExercise: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomColor: Color.FONT_COLOR,
      borderBottomWidth: 2,
      marginBottom: 10
    }, 
  });

  return (
    <TouchableWithoutFeedback       
      onPress={() => {
        setAbsolved(!absolved);
      }}
    >
      <View 
        style={styles.checkExercise} 
        key={exercise._id.toString()}

      >
        <View>
          <Text>exercise: {exercise.exercise}</Text>
          <Text>category: {exercise.category}</Text>
        </View>
        <Button
          marginY={10}
          height={25}
          width={25}
          color={Color.TAB_BAR_BACKGROUND_COLOR}
          onPress={() => {
            setAbsolved(!absolved);
          }}
          text={absolved ? <Icon name='check' size={fontSizes.mini} color={Color.TAB_BAR_INACTIVE_COLOR}/> : ''}
          isRound={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}