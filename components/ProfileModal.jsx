import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

import {Color, LoggedInUserID} from './Utils/constants';
import Button from './Utils/Button';
const {width} = Dimensions.get("window");

export default function ProfileModal(props){

  // todo: instead of 0 current value
  const [theme, setTheme] = useState(0);
  const [level, setLevel] = useState(0);
  const [amount, setAmount] = useState(5);
  
  const closeModal = () => {
    props.setShowModal(false);
  }

  const updateUser = () => {
    const update = {};
    if (theme !== 0) update['theme'] = theme;
    if (level !== 0) update['level'] = level;
    if (amount !== 5) update['amount'] = amount;
    if(!update) return;

    axios.put(
      'https://fit-in-time-server.herokuapp.com/user/update/',
      {
        user: {
          _id: LoggedInUserID
        },
        update
      }
    )
    .then(function (response) {
      console.log(response);
      })
    .catch(function (error) {
      console.log(error, 'err');
    });
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
        <Text style={styles.headerText}> Update Profile </Text>
        <Text style={styles.contentText}> Theme: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setTheme(text)}
          value={theme.toString()}
        />

        <Text style={styles.contentText}> Level: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLevel(text)}
          value={level.toString()}
        />

        <Text style={styles.contentText}> Amount: </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setAmount(text)}
          value={amount.toString()}
        />
        <View style={styles.buttonContainer}>
          <Button
            marginY={0}
            height={40}
            width={100}
            color={Color.TAB_BAR_ACTIVE_COLOR}
            onPress={closeModal}
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
              updateUser();
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
  headerText: {
    fontSize: 16,
    color: Color.FONT_COLOR,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  contentText: {
    color: Color.FONT_COLOR
  },
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center'
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