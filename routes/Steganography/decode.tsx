import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Caption,
    TextInput,
    Text,
    IconButton,
} from 'react-native-paper';
import StegCloak from 'stegcloak';
import Clipboard from '@react-native-community/clipboard';
import { PadSeparator } from '../../components/PadSeparator';
import { Alert, IAlertType } from '../../components/Alert';

/**
 * The decoding subroute.
 */
export const Decode = () => {
    const [state, setState] = useState({
        cover: '',
        password: '',
        result: '',
        error: '',
    });
    const stegcloak = new StegCloak(true, true);

    return (
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
                    onPress={() => {
                        try {
                            // Reveal the text.
                            const result = stegcloak.reveal(state.cover, state.password);

                            setState({
                                ...state,
                                error: '',
                                result,
                            });
                        } catch (e) {
                            setState({
                                ...state,
                                error: e.message.replace(/stegcloak/ig, 'cover'),
                            });
                        }
                    }}
                >
                    Uncover
                </Button>

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
    );
}