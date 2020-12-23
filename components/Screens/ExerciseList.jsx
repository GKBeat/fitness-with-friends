import React, {useEffect, useState} from "react";
import {StyleSheet, Text, SafeAreaView, FlatList, View} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar} from 'expo-status-bar';

import {Color} from '../Utils/constants';
import Button from '../Utils/Button';
import ExersiceModal from "../ExersiceModal";

export default function ExerciseList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('https://fit-in-time-server.herokuapp.com/exercise/listaftercat/')
      .then(function (response) {
        setCategories([...response.data.categories]);
      })
      .catch(function (error) {
        console.log(error, 'err');
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ExersiceModal
        showModal={showModal}
        setShowModal={(isShow) => setShowModal(isShow)}
        category={category}
        categories={categories}
        setCategories={(categories) => setCategories([...categories])}
      />
      <FlatList
        data={categories}
        renderItem={({item}) => {
        return (
          <View>
            <View style={styles.header}>
              <Text style={styles.headerText}>{item.name}</Text>
              <Button
                marginY={10}
                size={25}
                color={Color.TAB_BAR_BACKGROUND_COLOR}
                onPress={() => {
                  setShowModal(true);
                  setCategory(item.name);
                }}
                text={<Icon name='plus' size={10} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                isRound={true}
              />
            </View>
            <View>
              {
                item.exercises.map((exercise) => {
                  return (
                    <View style={styles.exercise} key={exercise._id}>
                      <Text style={styles.contentText}>Name: {exercise.exercise}</Text>
                      {exercise.description && <Text style={styles.contentText}>Beschreibung: {exercise.description}</Text>}
                      <Text style={styles.contentText}>Level 1: {exercise.amount[0].Beginner}</Text>
                      <Text style={styles.contentText}>Level 2: {exercise.amount[1].Expert}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        )
      }}
        keyExtractor={category => category.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_COLOR,
    paddingHorizontal: 25,
  },
  headerText: {
    color: Color.FONT_COLOR,
    fontSize: 20
  },
  contentText: {
    color: Color.FONT_COLOR
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomColor: Color.FONT_COLOR,
    borderBottomWidth: 2
  },
  exercise: {
    marginVertical: 5,
  }
});