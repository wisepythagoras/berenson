//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
    DarkTheme,
    Provider as PaperProvider,
} from 'react-native-paper';
import {
    NativeRouter,
    BackButton,
    Route,
} from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './shim';
import { Home } from './routes/Home';
import { Steganography } from './routes/Steganography';

const theme = {
    ...DarkTheme,
    roundness: 2,
    dark: true,
};

export default function App() {
    return (
        <SafeAreaProvider style={styles.container}>
            <PaperProvider theme={theme}>
                <NativeRouter>
                    <BackButton>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/steganography" component={Steganography} />
                    </BackButton>
                </NativeRouter>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
    },
});
