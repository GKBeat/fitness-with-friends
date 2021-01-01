import {Text, View, SafeAreaView, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {fontSizes, Color} from '../../Utils/constants';
import Button from '../../Utils/Button';
import backend from '../../Utils/backend';
import {useDispatch} from 'react-redux';
import {log_in} from '../../../redux/actions/actions';
const {width} = Dimensions.get("window");

export default function Login ({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const login = async () => {
    let data = await backend.login('login/', {
      user: {
        username,
        password,
      }
    });

    if (data.status) {
      dispatch(log_in(data.user));
      navigation.navigate('Home');
    }
    
  }

  const signup = () => {
    navigation.navigate('Signup');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingHorizontal: 25,
      paddingTop: 25  
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
      width: width-90, 
      height: 40, 
      borderColor: Color.FONT_COLOR, 
      borderWidth: 1, 
      padding: 5 
    }
  })


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Login
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
        <Button
          marginY={1}
          height={40}
          width={80}
          color={Color.COLOR}
          onPress={login}
          text={'login'}
        />
      </View>
      <View>
        <Button
          marginY={2}
          height={30}
          width={80}
          color={Color.COLOR}
          onPress={signup}
          text={'signup'}
        />
      </View>
      
    </SafeAreaView>
  )
}