import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CounterLogo from '../../assets/images/counterIcon.png';
import CalenderIcon from '../../assets/images/calenderIcon.png';

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    height: 60,
                    borderTopWidth: 0,
                    elevation: 4,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: -1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                },
            }}
        >
            <Tabs.Screen
                name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={CalenderIcon}
                            style={[
                                styles.icon,
                                { tintColor: focused ? '#007bff' : '#8e8e93' },
                            ]}
                            resizeMode='contain'
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='counter'
                options={{
                    title: 'Counter',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={CounterLogo}
                            style={[
                                styles.icon,
                                { tintColor: focused ? '#007bff' : '#8e8e93' },
                            ]}
                            resizeMode='contain'
                        />
                    ),
                    tabBarButton: (props) => <View {...props} />
                }}
            />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default _layout;
