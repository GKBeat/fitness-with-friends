import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

import {themeArray, fontSizes} from '../../Utils/constants';
import Button from '../../Utils/Button';

export default function ProfileModal(props){
  const [theme, setTheme] = useState(props.theme);
  const [level, setLevel] = useState(props.level);
  const [amount, setAmount] = useState(props.amount);

  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];
  
  const closeModal = () => {
    props.setShowModal(false);
  }

  const updateUser = () => {
    let update = {};

    if(theme != props.theme) update['theme'] = theme;
    if(level != props.level) update['level'] = level;
    if(amount != props.amount) update['amount'] = amount;

    if(!update.theme && !update.level && !update.amount) return;

    axios.put(
      'https://fit-in-time-server.herokuapp.com/user/update/',
      {
        user,
        update
      }
    )
    .then(function (response) {
      // TODO: maybe only close modal if it was succesfull and show error msg if err
    })
    .catch(function (error) {
      console.log(error, 'err');
    });
  }

  const styles = StyleSheet.create({
    headerText: {
      fontSize: fontSizes.large,
      color: Color.FONT_COLOR,
      marginVertical: 10,
      alignSelf: 'center'
    },
    contentText: {
      color: Color.FONT_COLOR
    },
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingHorizontal: 25,
    },
    input: { 
      height: 40, 
      padding: 5,
      marginBottom: 20
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
  });

  return (
    <Modal
      style={{marginVertical: 180}}
      isVisible={props.showModal}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      hideModalContentWhileAnimating={true}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}> Update Profile </Text>
        <Text style={styles.contentText}> Theme: </Text>
        <Picker
          selectedValue={theme}
          style={styles.input}
          onValueChange={text => setTheme(text)}
        >
          {/*TODO: make this variable from backendInfo*/}
          <Picker.Item label="Black Roast" value="0" />
          <Picker.Item label="Blue Sunrise" value="1" />
        </Picker>

        <Text style={styles.contentText}> Level: </Text>
        <Picker
          selectedValue={level}
          style={styles.input}
          onValueChange={text => setLevel(text)}
        >
          {/*TODO: make this variable from backendInfo*/}
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>

        <Text style={styles.contentText}> Amount: </Text>
        <Picker
          selectedValue={amount}
          style={styles.input}
          onValueChange={text => setAmount(text)}
        >
          {/*TODO: make this variable from backendInfo*/}
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
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