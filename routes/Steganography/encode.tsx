import React, { useState } from 'react';
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

/**
 * The encoding subroute.
 */
export const Encode = () => {
    const [state, setState] = useState({
        secret: '',
        cover: '',
        password: '',
        result: '',
        loading: false,
    });

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

                <Button
                    mode="outlined"
                    disabled={!state.secret || !state.cover || !state.password}
                    onPress={async () => {
                        setState({
                            ...state,
                            loading: true,
                            result: '',
                        });

                        try {
                            // Hide the text.
                            const result = await roll(state.secret, state.cover, state.password);

                            setState({
                                ...state,
                                result,
                                loading: false,
                            });
                        } catch (e) {
                            setState({
                                ...state,
                                loading: false,
                            });
                            alert(e);
                        }
                    }}
                >
                    Hide
                </Button>

                <ActivityIndicator animating={state.loading} />

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
