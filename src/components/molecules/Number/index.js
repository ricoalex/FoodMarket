import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NumberFormat from 'react-number-format';

const Number = ({number, type, style}) => {
  if (type === 'decimal') {
    return (
      <NumberFormat
        value={number}
        displayType="text"
        renderText={value => <Text style={style}>{value}</Text>}
        decimalSeparator="."
        decimalScale={1}
        fixedDecimalScale
      />
    );
  }
  return (
    <View>
      <NumberFormat
        value={number}
        thousandSeparator="."
        displayType="text"
        prefix="IDR "
        renderText={value => <Text style={style}>{value}</Text>}
        decimalSeparator=","
      />
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({});
