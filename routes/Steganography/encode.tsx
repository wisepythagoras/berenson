import React, { useState, useCallback, useEffect } from 'react';
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
    Text,
} from 'react-native-paper';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';
import { roll } from '../../recipes/steganography';

interface IEncodeProps {
    secret: string
    cover: string
    password: string
    result: string
    loading: boolean
}

const onHide = (state: IEncodeProps) => {
    const [result, setResult] = useState('');

    if (state.loading && result) {
        setResult('');
    }

    useEffect(() => {
        if (!state.loading) {
            return;
        }

        const action = async () => {
            const result = await roll(state.secret, state.cover, state.password);
            setResult(result);
        };

        action();
    }, [state]);

    return result;
} ;

/**
 * The encoding subroute.
 */
export const Encode = () => {
    const [state, setState] = useState<IEncodeProps>({
        secret: '',
        cover: '',
        password: '',
        result: '',
        loading: false,
    });

    const result = onHide(state);

    // const hideCallback = useCallback(async () => {
    //     try {
    //         // Hide the text.
    //         const result = await roll(state.secret, state.cover, state.password);

    //         setState({
    //             ...state,
    //             result,
    //             loading: false,
    //         });
    //     } catch (e) {
    //         setState({
    //             ...state,
    //             loading: false,
    //         });
    //         alert(e);
    //     }
    // }, [state]);

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
