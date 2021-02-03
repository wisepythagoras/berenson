import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import SafeAreaView from 'react-native-safe-area-view';
import { SHA as SHAOption } from '../Home/options';
import { ITab, TabArea } from '../../components/TabArea';
import { Info } from './info';
import { Hash } from './hash';

const tabs: ITab[] = [{
    key: 'hash',
    title: 'Hash',
    icon: 'fingerprint',
    component: <Hash />,
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
