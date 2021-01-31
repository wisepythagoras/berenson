import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Appbar, Text, List, useTheme } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { Options } from './options';
import crypto from 'crypto';

console.log('Test', crypto.randomBytes(16).toString('hex'));

/**
 * Definition of the Home route component.
 */
export const Home = () => {
    const theme = useTheme();
    const history = useHistory();

    return (
        <SafeAreaView forceInset={{ top: 'never' }}>
            <Appbar.Header>
                <Appbar.Content title="Berenson" subtitle={'A universal encoding and encryption tool'} />
            </Appbar.Header>
            <ScrollView>
                <View style={{
                    ...styles.container,
                    backgroundColor: theme.colors.background,
                }}>
                    <View>
                        {Options.map((option, j) => {
                            return (
                                <List.Section key={j}>
                                    <List.Subheader>{option.title}</List.Subheader>
                                    {option.list.map((listItem, i) => {
                                        return (
                                            <List.Item
                                                key={i}
                                                title={listItem.title}
                                                onPress={() => history.push(listItem.path)}
                                            />
                                        );
                                    })}
                                </List.Section>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
    },
});
