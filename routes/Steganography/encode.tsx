import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
} from 'react-native';
import {
    ActivityIndicator,
    Button,
    Caption,
    TextInput,
} from 'react-native-paper';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';
import { Steganography } from '../../recipes/steganography';

interface IEncodeState {
    secret: string
    cover: string
    password: string
    result: string
    loading: boolean
}

/**
 * This should run when the user presses the "Hide" button.
 * @param state The state of the encode page.
 */
const useOnHide = (state: IEncodeState) => {
    const [result, setResult] = useState('');

    if (state.loading && result) {
        setResult('');
    }

    useEffect(() => {
        if (!state.loading) {
            return;
        }

        const action = async () => {
            const stego = new Steganography(state.password, state.cover, state.secret);
            const result = await stego.roll();

            setResult(result);
        };

        action();
    }, [state]);

    return result;
};

/**
 * The encoding subroute.
 */
export const Encode = () => {
    const [state, setState] = useState<IEncodeState>({
        secret: '',
        cover: '',
        password: '',
        result: '',
        loading: false,
    });
    const result = useOnHide(state);

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
                <TextInput
                    label="Text to hide"
                    value={state.secret}
                    onChangeText={(secret) => {
                        setState({
                            ...state,
                            secret,
                        });
                    }}
                />
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
                        disabled={!state.secret || !state.cover || !state.password || state.loading}
                        onPress={() => {
                            setState({
                                ...state,
                                loading: true,
                                result: '',
                            });
                        }}
                    >
                        Hide
                    </Button>
                ) : (
                    <ActivityIndicator animating={state.loading} />
                )}

                <PadSeparator />

                <View
                    style={{
                        display: !state.result || state.loading ? 'none' : 'flex',
                    }}
                >
                    <Alert type={IAlertType.SUCCESS}>
                        To send the cover message to someone, select the text in the box below and copy it.
                    </Alert>
                    <PadSeparator />
                    <Caption>Encoded Message</Caption>
                    <TextInput
                        label=""
                        value={state.result}
                        disabled={!state.result}
                    />
                    <PadSeparator />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
