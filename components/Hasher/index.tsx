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
    Portal,
} from 'react-native-paper';
import Clipboard from '@react-native-community/clipboard';
import { Alert, IAlertType } from '../../components/Alert';
import { PadSeparator } from '../../components/PadSeparator';
import { ISelectDialogOption, SelectDialog } from '../../components/SelectDialog';
import { hashTypes, SHAHash, SHAHashType } from '../../recipes/hashing/sha';
import { styles as tabsStyles } from '../../components/TabArea';
import { BLAKEHash, BLAKEHashType } from '../../recipes/hashing/blake';

export interface IHasherProps {
    hashingOptions: ISelectDialogOption[]
    handler: typeof SHAHash | typeof BLAKEHash
    defaultOption: SHAHashType | BLAKEHashType
};

export interface IHasherState {
    text: string
    type: SHAHashType | BLAKEHashType
    result: string
    loading: boolean
    error: string
    showSelectType: boolean
    copyIndicator: boolean
};

/**
 * Renders the tab that performs the hashing.
 */
export const Hasher = (props: IHasherProps) => {
    const [state, setState] = useState<IHasherState>({
        text: '',
        type: props.defaultOption,
        result: '',
        loading: false,
        error: '',
        showSelectType: false,
        copyIndicator: false,
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

                    <View style={tabsStyles.tabs}>
                        <Button
                            mode="outlined"
                            style={{
                                ...tabsStyles.tabButton,
                                marginRight: 10
                            }}
                            onPress={() => setState({ ...state, showSelectType: true })}
                        >
                            Type: {state.type.toUpperCase()}
                        </Button>

                        {!state.loading ? (
                            <Button
                                mode="outlined"
                                style={tabsStyles.tabButton}
                                disabled={!state.text || state.loading}
                                onPress={async () => {
                                    setState({
                                        ...state,
                                        loading: true,
                                        result: '',
                                    });

                                    // Create a new instance of the SHA hashing module so we can
                                    // carry out the op.
                                    // @ts-ignore
                                    const hasher = new props.handler(state.text, state.type);

                                    try {
                                        // The roll function always performs the operation.
                                        const result = await hasher.roll();

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
                    </View>

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
                        <Alert type={IAlertType.CODE}>
                            {state.result}
                        </Alert>
                        <PadSeparator />
                        <View>
                            <Button
                                icon={state.copyIndicator ? 'check' : 'clipboard'}
                                mode="outlined"
                                style={{ width: 100 }}
                                onPress={() => {
                                    Clipboard.setString(state.result);
                                    setState({
                                        ...state,
                                        copyIndicator: true,
                                    });

                                    setTimeout(() => {
                                        setState({
                                            ...state,
                                            copyIndicator: false,
                                        });
                                    }, 2000);
                                }}
                            >
                                {state.copyIndicator ? 'Copied' : 'Copy'}
                            </Button>
                        </View>
                    </View>

                    {/* This is the dialog with all the hashing type options. */}
                    <Portal>
                        <SelectDialog
                            visible={state.showSelectType}
                            options={props.hashingOptions}
                            onDismiss={() => {
                                setState({
                                    ...state,
                                    showSelectType: false,
                                });
                            }}
                            onSelect={(option) => {
                                setState({
                                    ...state,
                                    type: option.value as SHAHashType | BLAKEHashType,
                                    showSelectType: false,
                                });
                            }}
                            title="Select a SHA hash type"
                        />
                    </Portal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
