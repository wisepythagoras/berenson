import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import SafeAreaView from 'react-native-safe-area-view';
import { BLAKE as BLAKEOption } from '../Home/options';
import { ITab, TabArea } from '../../components/TabArea';
import { Info } from './info';
import { Hasher } from '../../components/Hasher';
import { ISelectDialogOption } from '../../components/SelectDialog';
import { BLAKEHash } from '../../recipes/hashing/blake';

const hashingOptions: ISelectDialogOption[] = [{
    title: 'BLAKE2b',
    value: 'blake2b',
}, {
    title: 'BLAKE2s',
    value: 'blake2s',
}];

const tabs: ITab[] = [{
    key: 'hash',
    title: 'Hash',
    icon: 'fingerprint',
    component: (
        <Hasher
            hashingOptions={hashingOptions}
            handler={BLAKEHash}
            defaultOption="blake2b"
        />
    ),
}, {
    key: 'info',
    title: 'Info',
    icon: 'information',
    component: <Info />,
}];

/**
 * Renders the BLAKE hashing route.
 */
export const BLAKEHashRoute = () => {
    const history = useHistory();
    const [selected, setSelected] = useState(tabs[0]);

    return (
        <SafeAreaView forceInset={{ top: 'never' }}>
            <View>
                <Appbar.Header>
                    <Appbar.BackAction onPress={history.goBack} />
                    <Appbar.Content title={BLAKEOption.title} subtitle={BLAKEOption.subtitle} />
                </Appbar.Header>

                <TabArea tabs={tabs} onSelect={setSelected} />

                <View style={{ padding: 10 }}>
                    {selected.component}
                </View>
            </View>
        </SafeAreaView>
    );
};
