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
import { SHAHashRoute } from './routes/SHA';
import { BLAKEHashRoute } from './routes/BLAKE';

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
                        <Route exact path="/hashing/sha" component={SHAHashRoute} />
                        <Route exact path="/hashing/blake" component={BLAKEHashRoute} />
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
