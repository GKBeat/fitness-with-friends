import {Text, View, SafeAreaView, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fontSizes, Color} from '../../Utils/constants';
import Button from '../../Utils/Button';
import backend from '../../Utils/backend';
import {useDispatch, useSelector} from 'react-redux';
import {log_in} from '../../../redux/actions/actions';
import AsyncStorage from '@react-native-community/async-storage';


const {width} = Dimensions.get("window");

export default function Login ({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let _checkStore =  async () => {
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (userId && token) {
        backend.setAuthHeader(token);
        let userData = await backend.post('user/one/', {
          query: {
            _id: userId
          }
        });
        dispatch(log_in(userData.user));
        navigation.navigate('Home');
      }
    }
  _checkStore();
  }, []);

  useEffect(() => {
    if (!user.isLogged) navigation.navigate('Login');
  }, [user])

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
    setUsername('');
    setPassword('');
    
  }

  const signup = () => {
    navigation.navigate('Signup');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      justifyContent: 'center',
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
      width: width-50, 
      height: 40, 
      borderColor: Color.FONT_COLOR, 
      borderWidth: 1, 
      padding: 5,
      marginTop: 15
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

      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}
      >
        <Button
          marginY={1}
          height={40}
          width={80}
          color={Color.TAB_BAR_BACKGROUND_COLOR}
          textColor={Color.BACKGROUND_COLOR}
          onPress={login}
          text={'login'}
        />
        <Button
          marginY={2}
          height={40}
          width={80}
          color={Color.TAB_BAR_BACKGROUND_COLOR}
          textColor={Color.BACKGROUND_COLOR}
          onPress={signup}
          text={'signup'}
        />
      </View>
      
    </SafeAreaView>
  )
}