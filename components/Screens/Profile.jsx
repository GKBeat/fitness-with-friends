import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

import { Color } from '../Utils/constants';

export default function Profil() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textColor}>TODO: Show Profile</Text>
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