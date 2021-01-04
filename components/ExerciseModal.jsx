import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux'
import axios from 'axios';

import {fontSizes, themeArray} from './Utils/constants';
import Button from './Utils/Button';
const {width} = Dimensions.get("window");

export default function ExerciseModal(props) {
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [amountLevel0, setAmountLevel0] = useState('');
  const [amountLevel1, setAmountLevel1] = useState('');
  const [amountLevel2, setAmountLevel2] = useState('');
  const [amountLevel3, setAmountLevel3] = useState('');
  
  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  const closeModal = () => {
    props.setShowModal(false);
    clearInput();
  }

  const addCategory = () => {
    axios.post(
      'https://fit-in-time-server.herokuapp.com/exercise/create/',
      {
        user,
        exercise: {
          exercise: exerciseName,
          description: exerciseDescription,
          category: props.category,
          amount:[
            {
              Level0: amountLevel0,
            },
            {
              Level1: amountLevel1,
            },
            {
              Level2: amountLevel2,
            },
            {
              Level3: amountLevel3,
            },
          ]
        }
      }
    )
    .then(function (response) {
      // TODO: maybe only close modal if it was succesfull and show error msg if err
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
    setAmountLevel0('');
    setAmountLevel1('');
    setAmountLevel2('');
    setAmountLevel3('');
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
      fontSize: fontSizes.large,
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
      justifyContent: 'space-between',
    }
  });

  return (
    <Modal
      style={{marginVertical: 100}}
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
            onChangeText={text => setAmountLevel0(text)}
            value={amountLevel0.toString()}
            placeholder={'Anzahl der Wiederholungen Level 0'}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setAmountLevel1(text)}
            value={amountLevel1.toString()}
            placeholder={'Anzahl der Wiederholungen Level 1'}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setAmountLevel2(text)}
            value={amountLevel2.toString()}
            placeholder={'Anzahl der Wiederholungen Level 2'}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setAmountLevel3(text)}
            value={amountLevel3.toString()}
            placeholder={'Anzahl der Wiederholungen Level 3'}
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
