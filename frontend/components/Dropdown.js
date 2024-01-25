// Add a new component named Dropdown.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dropdown = ({ label, selectedValue, onValueChange, items }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.picker}
            >
                {items.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};
const FONTS = {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 16,
    },
    body3: {
      fontSize: 14,
    },
  };
  const COLORS = {
    primary: '#007BFF',
    black: '#000000',
    gray: '#808080',
  };
    
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        ...FONTS.body2,
        color: COLORS.black,
        marginBottom: 6,
    },
    picker: {
        height: 40,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default Dropdown;
