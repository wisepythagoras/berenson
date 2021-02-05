import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useHistory } from 'react-router-native';
import SafeAreaView from 'react-native-safe-area-view';
import { BLAKE as BLAKEOption } from '../Home/options';
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
