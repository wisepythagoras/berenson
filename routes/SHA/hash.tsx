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
import { accessibilityProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';
import { ISelectDialogOption, SelectDialog } from '../../components/SelectDialog';
import { hashTypes, SHAHash, SHAHashType } from '../../recipes/hashing/sha';

export interface IHashState {
    text: string
    type: SHAHashType
    result: string
    loading: boolean
    error: string,
    showSelectType: boolean,
};

// Convert the hashing types to options for the dialog.
const hashingOptions: ISelectDialogOption[] = hashTypes.map((option) => {
    return {
        title: option.toUpperCase(),
        value: option,
    };
});

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
        showSelectType: false,
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

                    <Button onPress={() => setState({ ...state, showSelectType: true })}>
                        {state.type.toUpperCase()}
                    </Button>

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

                    {/* This is the dialog with all the hashing type options. */}
                    <SelectDialog
                        visible={state.showSelectType}
                        options={hashingOptions}
                        onDismiss={() => {
                            setState({
                                ...state,
                                showSelectType: false,
                            });
                        }}
                        onSelect={(option) => {
                            setState({
                                ...state,
                                type: option.value as SHAHashType,
                                showSelectType: false,
                            });
                        }}
                        title="Select a SHA hash type"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
