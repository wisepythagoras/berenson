import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    Button,
    Dialog,
    Portal,
    Provider,
    RadioButton,
    Text,
} from 'react-native-paper';

export interface ISelectDialogOption {
    title: string
    value: string
}

export interface ISelectDialogProps {
    visible: boolean
    title: string
    options: ISelectDialogOption[]
    selectedOption?: string
    onDismiss: () => void
    onSelect: (option: ISelectDialogOption) => void
}

/**
 * Renders a dialog with a bunch of radio options.
 * @param props The input props.
 */
export const SelectDialog = (props: ISelectDialogProps) => {
    const [selectedOption, setSelectedOption] = useState(props.selectedOption);

    return (
        <Provider>
            <View style={{ minHeight: 300 }}>
                <Portal>
                    <Dialog visible={props.visible} onDismiss={props.onDismiss}>
                        <Dialog.Title>{props.title}</Dialog.Title>
                            <Dialog.ScrollArea>
                                <ScrollView>
                                    <Dialog.Content>
                                        <RadioButton.Group onValueChange={setSelectedOption} value={selectedOption || ''}>
                                            {props.options.map((option, i) => {
                                                return (
                                                    <View style={{ flexDirection: 'row' }} key={i}>
                                                        <RadioButton value={option.value} />
                                                        <Text style={{ paddingTop: 10 }}>{option.title}</Text>
                                                    </View>
                                                );
                                            })}
                                        </RadioButton.Group>
                                    </Dialog.Content>
                            </ScrollView>
                        </Dialog.ScrollArea>
                        <Dialog.Actions style={{ paddingRight: 15 }}>
                            <Button onPress={props.onDismiss}>Cancel</Button>
                            <Button onPress={() => {
                                const option = props.options.find((opt) => opt.value === selectedOption);

                                if (!!option) {
                                    props.onSelect(option);
                                }
                            }}>
                                Select
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};
