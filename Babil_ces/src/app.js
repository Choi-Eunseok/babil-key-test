import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {RootNavigator} from './routes';


export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        )
    }
}