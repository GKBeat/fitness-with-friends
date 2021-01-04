import {Text, View, SafeAreaView, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {fontSizes, Color} from '../../Utils/constants';
import Button from '../../Utils/Button';
const {width} = Dimensions.get("window");
import {Picker} from '@react-native-picker/picker';
import backend from '../../Utils/backend';

export default function Signup ({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('0');
  const [amount, setAmount] = useState('5');
  const [error, setError] = useState('');

  const signup = async () => {
    if (username.length < 2 || username.length > 64 || password.length < 5 || password.length > 255) {
      setError('username mind. 2 max 64 \npassword mind. 5 max 255 ');
      setTimeout(() => {
        setError('');
      }, 2000)
    } else {
      let data = await backend.post('signup/', {
        user: {
          username,
          password,
          level,
          amount
        }
      });
      if (data.status) {
        navigation.navigate('Login');
      }
    }
    
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingHorizontal: 25,
      paddingTop: 25,
      justifyContent: 'center',
      display: 'flex' 
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    headerText: {
      fontSize: fontSizes.large,
    },
    input: { 
      width: width-50, 
      height: 40, 
      borderColor: Color.FONT_COLOR, 
      borderWidth: 1, 
      padding: 5,
      marginTop: 30
    },
    picker: {
      width: width-90,
      height: 40,
      borderColor: Color.FONT_COLOR,
      borderWidth: 1,
      padding: 5,
    },
    contentText: {
      color: Color.FONT_COLOR,
      marginTop: 20
    },
  })


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Sign Up
        </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          value={username}
          placeholder={'Username'}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder={'password'}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Text style={styles.contentText}> Level: </Text>
        <Picker
          selectedValue={level}
          style={styles.picker}
          onValueChange={text => setLevel(text)}
        >
          {/*TODO: make this variable from backendInfo*/}
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>

        <Text style={styles.contentText}> Anzahl der Übungen: </Text>
        <Picker
          selectedValue={amount}
          style={styles.picker}
          onValueChange={text => setAmount(text)}
        >
          {/*TODO: make this variable from backendInfo*/}
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="8" value="8" />
          <Picker.Item label="9" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
        <View
          style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}
        >
          <Button
            marginY={1}
            height={40}
            width={80}
            color={Color.TAB_BAR_BACKGROUND_COLOR}
            textColor={Color.BACKGROUND_COLOR}
            text={'create'}
            onPress={signup}
          />
        </View>

        <View>
          <Text>
            {error}
          </Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

