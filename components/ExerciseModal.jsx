import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

import {Color, LoggedInUserID} from './Utils/constants';
import Button from './Utils/Button';
const {width} = Dimensions.get("window");

export default function ExerciseModal(props) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [amountBeginner, setAmountBeginner] = useState('');
  const [amountExpert, setAmountExpert] = useState('');

  const closeModal = () => {
    props.setShowModal(false);
    clearInput();
  }

  const addCategory = () => {
    axios.post(
      'https://fit-in-time-server.herokuapp.com/exercise/create/',
      {
        user: {
          _id: LoggedInUserID,
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

  return (
    <Modal
      style={{marginVertical: 175}}
      isVisible={props.showModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{props.category}</Text>
        </View>
        <View style={styles.inputContainer}>
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
            height={40}
            width={100}
            color={Color.TAB_BAR_ACTIVE_COLOR}
            onPress={() => closeModal()}
            text={'Cancel'}
            textColor={Color.FONT_COLOR}
            isRound={false}
          />
          <Button
            marginY={0}
            height={40}
            width={100}
            color={Color.TAB_BAR_BACKGROUND_COLOR}
            onPress={() => {
              addCategory();
              closeModal();
            }}
            text={'Save'}
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
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: { 
    width: width-90, 
    height: 40, 
    borderColor: Color.FONT_COLOR, 
    borderWidth: 1, 
    padding: 5,
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});