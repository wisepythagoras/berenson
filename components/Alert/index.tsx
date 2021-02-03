import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export enum IAlertType {
    ERROR,
    SUCCESS,
    CODE,
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
    let style = styles.error;

    if (props.type === IAlertType.ERROR) {
        style = styles.error;
    } else if (props.type === IAlertType.SUCCESS) {
        style = styles.success;
    } else {
        style = styles.code;
    }

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
    code: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#485a63',
        backgroundColor: '#3a494e',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
