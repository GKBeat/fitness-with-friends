import React, { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, Button, TextInput, View  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

import { Color } from '../Utils/constants';

export default function Friends() {
    const [search, setSearch] = useState('');
    const [latestWorkouts, setLatestWorkouts] = useState([]);
    
    
    useEffect(() => {
        axios.get('https://fit-in-time-server.herokuapp.com/user/friendsprogress/', {
            user: {
                _id: '5fe0d007f9d7d32652cefb60'
            }
        })
        .then( response => {
            console.log(response.data);
            setLatestWorkouts(response.data.listOfFriendsWorkout);

        }).catch( err=> {
            console.log(err);
        });
    }, []);

    const searchFriends = () => {
        console.log(search);
        /*let user, friend = {};
        axios.put('https://fit-in-time-server.herokuapp.com/user/add', {
            user,
            friend
        }).then( response => {
            if(response.data.status){
                console.log('added friend');
            }
        }).catch( err => {
            console.log(err);
        });*/
    }


    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}>TODO: Show Friends</Text>
            <View>
                <TextInput onChangeText={e =>setSearch(e)} />
                <Button onPress={searchFriends} title={<Icon name='search'/>}/>
            </View>
            {
                latestWorkouts.map((workout) => {
                  return (
                    <View key={workout._id}>
                      {
                        workout.map((exercise) => {
                            return (
                                <View key={exercise._id}>
                                    <Text>{exercise}</Text>
                                </View>
                            )
                        })
                      }
                    </View>
                  )
                })
              }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textColor: {
        color: Color.FONT_COLOR
    }
  });