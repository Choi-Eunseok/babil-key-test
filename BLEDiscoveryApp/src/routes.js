import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BLEList from './components/BLEList';
import BLEReadCharacteristic from './components/BLEReadCharacteristic';

const Stack = createStackNavigator();

export const RootNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BLEDevices" component={BLEList} />
            <Stack.Screen
                name="BLEReadCharacteristic"
                component={BLEReadCharacteristic}
            />
        </Stack.Navigator>
    )
}