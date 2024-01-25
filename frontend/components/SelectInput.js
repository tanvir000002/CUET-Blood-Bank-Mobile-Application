import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { COLORS, SIZES } from '../constants';

const SelectInput = (props) => {
    // Destructure props with default values to handle potential undefined/null
    const {
        id,
        label = '',
        selectedValue = '',
        onSelectChanged = () => {}, // Provide a default function if onSelectChanged is not provided
        errorText,
    } = props || {};

    const onValueChange = (itemValue) => {
        onSelectChanged(id, itemValue);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>{label}</Text>
                <RNPickerSelect
                    value={selectedValue} // Use 'value' instead of 'selectedValue'
                    style={styles.input}
                    onValueChange={onValueChange}
                    items={[
                        { label: 'Select Option', value: '' },
                        { label: 'Yes', value: 'true' },
                        { label: 'No', value: 'false' },
                    ]}
                />
            </View>
            {errorText && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorText[0]}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: COLORS.gray,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderRadius: 12,
        borderColor: COLORS.primary,
        borderWidth: 1,
        marginVertical: 5,
    },
    label: {
        color: COLORS.primary,
        fontFamily: 'regular',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        color: COLORS.primary,
        fontFamily: 'regular',
    },
    errorContainer: {
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
});

export default SelectInput;
