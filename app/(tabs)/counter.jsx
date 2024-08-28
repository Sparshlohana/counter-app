import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [action, setAction] = useState('increment');
    const route = useRoute();
    const { selectedDate } = route.params;

    const isToday = dayjs(selectedDate).isSame(dayjs(), 'day');

    useEffect(() => {
        const getCount = async () => {
            try {
                const savedCount = await AsyncStorage.getItem(`counter_${selectedDate}`);
                if (savedCount !== null) {
                    setCount(parseInt(savedCount));
                } else {
                    setCount(0);
                }
            } catch (e) {
                console.error("Failed to load count.", e);
            }
        };

        getCount();
    }, [selectedDate]);

    const handlePress = async () => {
        if (!isToday) return;

        let newCount = count;
        if (action === 'increment') {
            newCount += 1;
        } else if (action === 'decrement') {
            newCount = Math.max(newCount - 1, 0);
        }
        setCount(newCount);
        try {
            await AsyncStorage.setItem(`counter_${selectedDate}`, newCount.toString());
        } catch (e) {
            console.error("Failed to save count.", e);
        }
    };

    const handleReset = async () => {
        if (!isToday) return;

        setCount(0);
        try {
            await AsyncStorage.setItem(`counter_${selectedDate}`, '0');
        } catch (e) {
            console.error("Failed to reset count.", e);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-between bg-gray-50 px-4">
            <TouchableOpacity onPress={handlePress} className="flex-1 justify-center items-center">
                <View className="justify-center items-center bg-white rounded-lg p-10 shadow-xl">
                    <Text className="text-lg text-gray-600 mb-5">
                        Date: {dayjs(selectedDate).format('D MMMM, YYYY')}
                    </Text>
                    <Text className="text-6xl font-bold text-blue-700">{count}</Text>
                </View>
            </TouchableOpacity>

            {isToday && (
                <View className="flex-row justify-around mb-10">
                    <TouchableOpacity onPress={() => setAction('increment')} className="bg-blue-500 rounded-full px-6 py-3">
                        <Text className="text-white text-3xl">+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAction('decrement')} className="bg-red-500 rounded-full px-6 py-3">
                        <Text className="text-white text-3xl">-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReset} className="bg-gray-500 rounded-full justify-center items-center w-[100px]">
                        <Text className="text-white text-2xl">Reset</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Counter;
