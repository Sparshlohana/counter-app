import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [increment, setIncrement] = useState(1);
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

        let newCount = count + increment;
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

    const handleDecrement = async () => {
        if (!isToday) return;

        let newCount = count - increment;
        if (newCount < 0) {
            newCount = 0;
        }

        setCount(newCount);
        try {
            await AsyncStorage.setItem(`counter_${selectedDate}`, newCount.toString());
        } catch (e) {
            console.error("Failed to save count.", e);
        }
    };


    const selectIncrement = (value) => {
        setIncrement(value);
        setModalVisible(false);
    };

    return (
        <SafeAreaView className="flex-1 justify-between bg-gray-50 px-4 relative">
            <TouchableOpacity onPress={handlePress} className="flex-1 justify-center items-center">
                <View className="justify-center items-center bg-white rounded-lg p-10 shadow-xl">
                    <Text className="text-lg text-gray-600 mb-5">
                        Date: {dayjs(selectedDate).format('D MMMM, YYYY')}
                    </Text>
                    <Text className="text-6xl font-bold text-blue-700">{count}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)} className="absolute top-12 right-5">
                <Entypo name="dots-three-vertical" size={27} color="black" />
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="fade"
            >
                <View className="flex-1 justify-center items-center bg-black/40">
                    <View className="bg-white rounded-lg p-6 w-3/4 shadow-lg">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-semibold">Select Increment</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialIcons name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        {[1, 25, 50, 100].map((value) => (
                            <TouchableOpacity
                                key={value}
                                onPress={() => selectIncrement(value)}
                                className="p-3 my-2 rounded-lg border border-gray-200 bg-gray-100"
                            >
                                <Text className="text-center text-lg text-gray-700 font-medium">{`+${value}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            {isToday && (
                <View className="flex-row justify-around mb-10">
                    <TouchableOpacity onPress={() => handleDecrement()} disabled={count === 0} className="bg-red-500 rounded-full h-14 w-14 justify-center items-center">
                        <Text className="text-white text-5xl">-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReset} disabled={count === 0} className="bg-gray-500 rounded-full justify-center items-center w-[100px] h-14">
                        <Text className="text-white text-2xl">Reset</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Counter;
