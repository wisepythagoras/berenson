import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { Button, Caption, TextInput } from 'react-native-paper';
import StegCloak from 'stegcloak';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';

/**
 * The encoding subroute.
 */
export const Encode = () => {
    const [state, setState] = useState({
        secret: '',
        cover: '',
        password: '',
        result: '',
    });
    const stegcloak = new StegCloak(true, true);

    return (
        <KeyboardAvoidingView
            // style={{ flex: 1, height: '100%' }}
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
                    onPress={() => {
                        try {
                            // Hide the text.
                            const result = stegcloak.hide(state.secret, state.password, state.cover);

                            setState({
                                ...state,
                                result,
                            });
                        } catch (e) {
                            alert(e);
                        }
                    }}
                >
                    Hide
                </Button>

                <PadSeparator />

                <View
                    style={{
                        display: !state.result ? 'none' : 'flex',
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