import React, { useState } from 'react';
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
import { unroll } from '../../recipes/steganography';

/**
 * The decoding subroute.
 */
export const Decode = () => {
    const [state, setState] = useState({
        cover: '',
        password: '',
        result: '',
        error: '',
        loading: false,
    });

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

                    <Button
                        mode="outlined"
                        disabled={!state.cover || !state.password}
                        onPress={async () => {
                            setState({
                                ...state,
                                loading: true,
                                result: '',
                            });

                            try {
                                // Reveal the text.
                                const result = await unroll(state.cover, state.password);

                                setState({
                                    ...state,
                                    error: '',
                                    result,
                                    loading: false,
                                });
                            } catch (e) {
                                setState({
                                    ...state,
                                    error: e.message.replace(/stegcloak/ig, 'cover'),
                                    loading: false,
                                });
                            }
                        }}
                    >
                        Uncover
                    </Button>

                    {state.result ? <ActivityIndicator animating={true} /> : null}

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
                        <Caption>Decoded Message</Caption>
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
