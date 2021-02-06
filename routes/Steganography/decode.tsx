import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Caption,
    TextInput,
    Text,
} from 'react-native-paper';
// import Clipboard from '@react-native-community/clipboard';
import { PadSeparator } from '../../components/PadSeparator';
import { Alert, IAlertType } from '../../components/Alert';
import { Steganography } from '../../recipes/steganography';

interface IDecodeProps {
    cover: string
    password: string
    result: string
    error: string
    loading: boolean
}

/**
 * This should run when the user presses the "Reveal" button.
 * @param state The state of the encode page.
 */
const useOnReveal = (state: IDecodeProps) => {
    const [result, setResult] = useState('');

    if (state.loading && result) {
        setResult('');
    }

    useEffect(() => {
        if (!state.loading) {
            return;
        }

        const action = async () => {
            const stego = new Steganography(state.password, state.cover);
            const result = await stego.unroll();

            setResult(result);
        };

        action();
    }, [state]);

    return result;
};

/**
 * The decoding subroute.
 */
export const Decode = () => {
    const [state, setState] = useState<IDecodeProps>({
        cover: '',
        password: '',
        result: '',
        error: '',
        loading: false,
    });
    const result = useOnReveal(state);

    if (result && state.loading) {
        setState({
            ...state,
            loading: false,
            result,
        });
    }

    return (
        <KeyboardAvoidingView
            behavior="height"
            enabled={true}
        >
            <ScrollView>
                <View>
                    <TextInput
                        label="Cover text"
                        value={state.cover}
                        onChangeText={(cover) => {
                            setState({
                                ...state,
                                cover,
                            });
                        }}
                    />
                    <TextInput
                        label="Password"
                        value={state.password}
                        onChangeText={(password) => {
                            setState({
                                ...state,
                                password,
                            });
                        }}
                    />

                    <PadSeparator />

                    {!state.loading ? (
                        <Button
                            mode="outlined"
                            disabled={!state.cover || !state.password}
                            onPress={async () => {
                                setState({
                                    ...state,
                                    loading: true,
                                    result: '',
                                });
                            }}
                        >
                            Reveal
                        </Button>
                    ) : (
                        <ActivityIndicator animating={true} />
                    )}

                    <PadSeparator />

                    {state.error ? (
                        <View>
                            <Alert type={IAlertType.ERROR}>
                                {state.error}
                            </Alert>
                            <PadSeparator />
                        </View>
                    ): null}

                    <View
                        style={{
                            display: !state.result ? 'none' : 'flex',
                        }}
                    >
                        <Caption>Recovered Message</Caption>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            {/* <IconButton
                                icon="clipboard"
                                size={12}
                                onPress={() => Clipboard.setString(state.result)}
                            /> */}
                            <Text>{state.result}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
