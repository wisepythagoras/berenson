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
    Text,
} from 'react-native-paper';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';
import { SHAHash, SHAHashType } from '../../recipes/hashing/sha';

export interface IHashState {
    text: string
    type: SHAHashType
    result: string
    loading: boolean
    error: string,
};

/**
 * Renders the tab that performs the hashing.
 */
export const Hash = () => {
    const [state, setState] = useState<IHashState>({
        text: '',
        type: 'sha3-256',
        result: '',
        loading: false,
        error: '',
    });

    return (
        <KeyboardAvoidingView
            behavior="height"
            enabled={true}
        >
            <ScrollView>
                <View>
                    <TextInput
                        label="Text to hash"
                        value={state.text}
                        onChangeText={(text) => {
                            setState({
                                ...state,
                                text,
                            });
                        }}
                    />

                    <PadSeparator />

                    {!state.loading ? (
                        <Button
                            mode="outlined"
                            disabled={!state.text || state.loading}
                            onPress={async () => {
                                setState({
                                    ...state,
                                    loading: true,
                                    result: '',
                                });

                                // Create a new instance of the SHA hashing module so we can
                                // carry out the op.
                                const shaHash = new SHAHash(state.text, state.type);

                                try {
                                    // The roll function always performs the operation.
                                    const result = await shaHash.roll();

                                    setState({
                                        ...state,
                                        loading: false,
                                        result,
                                    });
                                } catch (e) {
                                    setState({
                                        ...state,
                                        loading: false,
                                        error: e,
                                    });
                                }
                            }}
                        >
                            Hash
                        </Button>
                    ) : (
                        <ActivityIndicator animating={state.loading} />
                    )}

                    <PadSeparator />

                    <View
                        style={{
                            display: !state.error || state.loading ? 'none' : 'flex',
                        }}
                    >
                        <Alert type={IAlertType.ERROR}>
                            {state.error}
                        </Alert>
                    </View>

                    <View
                        style={{
                            display: !state.result || state.loading ? 'none' : 'flex',
                        }}
                    >
                        <Alert type={IAlertType.SUCCESS}>
                            Your {state.type.toUpperCase()} hash can be copied from the box below.
                        </Alert>
                        <PadSeparator />
                        <Caption>Hash</Caption>
                        <TextInput
                            label=""
                            value={state.result}
                            disabled={!state.result}
                        />
                        <PadSeparator />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
