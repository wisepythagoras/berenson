import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SHA as SHAOption } from '../Home/options';
import { ITab, TabArea } from '../../components/TabArea';
import { ISelectDialogOption } from '../../components/SelectDialog';
import { hashTypes, SHAHash } from '../../recipes/hashing/sha';
import { Hasher } from '../../components/Hasher';
import { Info } from './info';
import { Hash } from './hash';

// Convert the hashing types to options for the dialog.
const hashingOptions: ISelectDialogOption[] = hashTypes.map((option) => {
    return {
        title: option.toUpperCase(),
        value: option,
    };
});

const tabs: ITab[] = [{
    key: 'hash',
    title: 'Hash',
    icon: 'fingerprint',
    component: (
        <Hasher
            hashingOptions={hashingOptions}
            handler={SHAHash}
            defaultOption="sha3-256"
        />
    ),
}, {
    key: 'info',
    title: 'Info',
    icon: 'information',
    component: <Info />,
}];

/**
 * Renders the SHA hashing route.
 */
export const SHAHashRoute = () => {
    const history = useHistory();
    const [selected, setSelected] = useState(tabs[0]);

    return (
        <SafeAreaView forceInset={{ top: 'never' }}>
            <View>
                <Appbar.Header>
                    <Appbar.BackAction onPress={history.goBack} />
                    <Appbar.Content title={SHAOption.title} subtitle={SHAOption.subtitle} />
                </Appbar.Header>

                <TabArea tabs={tabs} onSelect={setSelected} />

                <View style={{ padding: 10 }}>
                    {selected.component}
                </View>
            </View>
        </SafeAreaView>
    );
};
