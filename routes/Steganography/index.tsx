import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { Appbar, Subheading, Text, Button } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import { Steganography as StegOption } from '../Home/options';
import { Encode } from './encode';
import { Decode } from './decode';
import { Info } from './info';
import { ITab, TabArea } from '../../components/TabArea';

const tabs: ITab[] = [{
    key: 'encode',
    title: 'Hide Text',
    icon: 'lock',
    component: <Encode />,
}, {
    key: 'decode',
    title: 'Decode',
    icon: 'lock-open',
    component: <Decode />,
}, {
    key: 'info',
    title: 'Info',
    icon: 'information',
    component: <Info />,
}];

/**
 * Definition of the Steganography route component.
 */
export const Steganography = () => {
    const history = useHistory();
    const [selected, setSelected] = useState(tabs[0]);

    return (
        <SafeAreaView forceInset={{ top: 'never' }}>
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={history.goBack} />
                    <Appbar.Content title={StegOption.title} subtitle={StegOption.subtitle} />
                </Appbar.Header>

                <TabArea tabs={tabs} onSelect={setSelected} />

                <View style={{ padding: 10 }}>
                    {selected.component}
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    subheading: {
        paddingLeft: 12,
        paddingTop: 10,
        paddingBottom: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tabButton: {
        flexGrow: 1,
        flex: 1,
    },
    container: {},
});
