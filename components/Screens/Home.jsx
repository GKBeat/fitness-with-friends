import React from "react";
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import { Color } from '../Utils/constants';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}>TODO: Show Home</Text>
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