import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={{
          marginVertical: props.marginY,
          height: props.size,
          width: props.size,
          backgroundColor: props.color,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: props.isRound ? 50 : 0
      }}
      onPress={props.onPress}>
      <Text style={{color: props.textColor}}>{props.text}</Text>
    </TouchableOpacity>
  );
}