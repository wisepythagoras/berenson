import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export interface ITab {
    key: string | number,
    title: string | JSX.Element,
    icon?: string | undefined | null,
    component: JSX.Element,
}

export interface ITabAreaProps {
    tabs: ITab[],
    onSelect: (tab: ITab) => void
}

/**
 * Renders the horizontal tab area.
 * @param props The tabs and the handlers.
 */
export const TabArea = (props: ITabAreaProps) => {
    const [selected, setSelected] = useState(props.tabs[0]);

    return (
        <View style={styles.tabs}>
            {props.tabs.map((tab, i) => {
                return (
                    <Button
                        onPress={() => {
                            setSelected(tab);
                            props.onSelect(tab);
                        }}
                        color={tab.key === selected.key ? '#fff' : '#555'}
                        icon={tab.icon || 0}
                        style={styles.tabButton}
                        key={`${tab.key}-${i}`}
                    >
                        {tab.title}
                    </Button>
                );
            })}
        </View>
    );
};

export const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tabButton: {
        flexGrow: 1,
        flex: 1,
    },
});
