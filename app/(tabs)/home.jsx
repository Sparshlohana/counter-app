import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

const CalendarComponent = () => {
    const [totalCount, setTotalCount] = useState(0);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            const calculateTotalCount = async () => {
                try {
                    const allKeys = await AsyncStorage.getAllKeys();
                    const counterKeys = allKeys.filter(key => key.startsWith('counter_'));

                    const allValues = await AsyncStorage.multiGet(counterKeys);
                    const total = allValues.reduce((sum, [key, value]) => {
                        return sum + parseInt(value || 0, 10);
                    }, 0);

                    setTotalCount(total);
                } catch (e) {
                    console.error('Failed to load counts.', e);
                }
            };

            calculateTotalCount();
        }, [])
    );

    const handleDayPress = (day) => {
        navigation.navigate('counter', { selectedDate: day.dateString });
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="p-4">
                <Calendar
                    onDayPress={handleDayPress}
                    style={{
                        borderRadius: 10,
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                    }}
                />
            </View>

            <View className="flex-1 justify-center items-center">
                <View className="bg-white rounded-xl p-6 shadow-lg w-4/5 h-1/2 items-center justify-center">
                    <Text className="text-2xl font-bold text-gray-800">
                        Total Count
                    </Text>
                    <View className="mt-8">
                        <Text className="text-5xl font-semibold text-blue-600">
                            {totalCount}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CalendarComponent;
