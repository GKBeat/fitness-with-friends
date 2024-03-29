import React, {useEffect, useState, useCallback} from "react";
import {StyleSheet, Text, SafeAreaView, View, ScrollView, RefreshControl} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import {themeArray, fontSizes, iconSizes} from '../../Utils/constants';
import Button from '../../Utils/Button';
import ExerciseModal from "../../ExerciseModal";

export default function ExerciseList() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector(state => state.user);
  const Color = useState(themeArray[user.theme])[0];

  useEffect(() => {
    getExerciseList()
  }, []);

  const getExerciseList = (refresh) => {
    axios.get('https://fit-in-time-server.herokuapp.com/exercise/listaftercat/')
      .then( (response) => {
        if(response.data.status){
          setCategories([...response.data.categories]);
        }
      })
      .catch(function (error) {
        console.log(error, 'err');
    }).then(() => refresh && refresh());
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getExerciseList(() => setRefreshing(false));
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingHorizontal: 25,
    },
    headerText: {
      color: Color.FONT_COLOR,
      fontSize: fontSizes.large
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps='handled'
      >
        <ExerciseModal
          showModal={showModal}
          setShowModal={(isShow) => setShowModal(isShow)}
          category={category}
          categories={categories}
          setCategories={(categories) => setCategories([...categories])}
        />
        {
          categories.map((category) => {
            return (
            <View key={category.name.toString()}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{category.name}</Text>
                <Button
                  marginY={10}
                  height={25}
                  width={25}
                  color={Color.TAB_BAR_BACKGROUND_COLOR}
                  onPress={() => {
                    setShowModal(true);
                    setCategory(category.name);
                  }}
                  text={<Icon name='plus' size={iconSizes.mini} color={Color.TAB_BAR_INACTIVE_COLOR}/>}
                  isRound={true}
                />
              </View>
              <View>
                {
                  category.exercises.map((exercise) => {
                    return (
                      <View style={styles.exercise} key={exercise._id}>
                        <Text style={styles.contentText}>Name: {exercise.exercise}</Text>
                        {exercise.description && <Text style={styles.contentText}>Beschreibung: {exercise.description}</Text>}
                        {
                          exercise.amount.map((data, index) => {
                            return (
                              <Text key={index} style={styles.contentText}> {data.name}: {data.level} </Text>
                            )
                          })
                        }
                      </View>
                    )
                  })
                }
              </View>
            </View>
          )
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}

