import React, { useState } from 'react';
import {StyleSheet, Text, View, Modal, TouchableHighlight, TextInput, Dimensions} from 'react-native';
import axios from 'axios';

import {Color} from './Utils/constants';
import Button from './Utils/Button';
const {width} = Dimensions.get("window");

export default function ExersiceModal(props) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [amountBeginner, setAmountBeginner] = useState('');
  const [amountExpert, setAmountExpert] = useState('');

  const addCategory = () => {
    axios.post(
      'https://fit-in-time-server.herokuapp.com/exercise/create/',
      {
        user: {
          _id: '5fe0d007f9d7d32652cefb60',
          isAdmin: true
        },
        exercise: {
          exercise: exerciseName,
          description: exerciseDescription,
          category: props.category,
          amount:[
            {
              Beginner: amountBeginner,
            },
            {
              Expert: amountExpert,
            },
          ]
        }
      }
    )
    .then(function (response) {
      props.setCategories(props.categories.map((category) => {
        if(category.name === response.data.exercise.category){
          category.exercises.push(response.data.exercise);
        }
        return category;
      }));
    })
    .catch(function (error) {
      console.log(error, 'err');
    });
  }

  const clearInput = () => {
    setExerciseName('');
    setExerciseDescription('');
    setAmountBeginner('');
    setAmountExpert('');
  }

  // TODO: maybe use https://www.npmjs.com/package/react-native-modal (looks better)
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.showModal}
    >
    {/*TODO: Fix styling of modal*/}
      <View style={styles.conatiner}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{props.category}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => setExerciseName(text)}
            value={exerciseName}
            placeholder={'Übungs name'}
          />    
          <TextInput
            style={styles.input}
            onChangeText={text => setExerciseDescription(text)}
            value={exerciseDescription}
            placeholder={'Übungs beschreibung'}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setAmountBeginner(text)}
            value={amountBeginner.toString()}
            placeholder={'Anzahl der Wiederholungen Level 0'}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setAmountExpert(text)}
            value={amountExpert.toString()}
            placeholder={'Anzahl der Wiederholungen Level 1'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            marginY={0}
            size={40}
            color={Color.TAB_BAR_BACKGROUND_COLOR}
            onPress={() => {
              addCategory();
              props.setShowModal(false);
              clearInput();
            }}
            text={'SendData'}
            textColor={Color.TAB_BAR_INACTIVE_COLOR}
            isRound={false}
          />
          <Button
            marginY={0}
            size={40}
            color={Color.TAB_BAR_BACKGROUND_COLOR}
            onPress={() => {
              props.setShowModal(false);
              clearInput();
            }}
            text={'CloseModal'}
            textColor={Color.TAB_BAR_INACTIVE_COLOR}
            isRound={false}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    paddingHorizontal: 25,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 25,
  },
  input: { 
    width: width-90, 
    height: 40, 
    borderColor: Color.FONT_COLOR, 
    borderWidth: 1, 
    padding: 5 
  },
  buttonContainer: {
    flexDirection: 'row'
  }
});