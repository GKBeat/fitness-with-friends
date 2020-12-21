import React, { useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, FlatList, View } from 'react-native';
import axios from 'axios';

import { Color } from '../Utils/constants';

let categories;

export default function ExerciseList() {
    
    useEffect(() => {
        axios.get('https://fit-in-time-server.herokuapp.com/exercise/listaftercat/')
        .then(function (response) {
          categories = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error, 'err');
        })
        .then(function () {
          // always executed
          categories = categories ? categories : [];
          console.log(categories);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={categories}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{item.name}</Text>
                            </View>
                            <View>
                                {
                                    item.excercises.map((excercise) => {
                                        return (
                                            <View key={excercise.id}>
                                                <Text style={styles.contentText}>{excercise.name}</Text>
                                                <Text style={styles.contentText}>DummDumms: {excercise.amount.beginner}</Text>
                                                <Text style={styles.contentText}>AdvancedDummDumms: {excercise.amount.expert}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    )
                }}
                keyExtractor={category => category.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.BACKGROUND_COLOR,
      paddingTop: 25,
    },
    headerText: {
        color: Color.FONT_COLOR,
        fontSize: 20
    },
    contentText: {
        color: Color.FONT_COLOR,
    },
    header: {
        marginVertical: 10,
        borderBottomColor: Color.FONT_COLOR,
        borderBottomWidth: 2
    }
  });