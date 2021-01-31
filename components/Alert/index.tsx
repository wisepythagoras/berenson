import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export enum IAlertType {
    ERROR,
    SUCCESS,
};

export interface IAlertProps {
    type: IAlertType,
    children?: React.ReactChild | React.ReactChild[],
}

/**
 * Renders the alert field.
 */
export const Alert = (props: IAlertProps) => {
    // Get the appropriate styles.
    const style = props.type === IAlertType.ERROR ?
        styles.error :
        styles.success;

    return (
        <View style={style}>
            <Text>
                {props.children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    error: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#4e2c2c',
        backgroundColor: '#5c3030',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    success: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#607441',
        backgroundColor: '#55753d',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
