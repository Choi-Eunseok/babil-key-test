import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FirstPage from './components/FirstPage';
import MainPage from './components/MainPage';
import MainControl from './components/MainControl';
import { createStackNavigator } from '@react-navigation/stack';
import MenuSvg from '../assets/img/btn_menu_42_01.svg';
import LogoSvg from '../assets/img/logo_babil_04.svg';
import StealCheck from './components/StealCheck';

const FirstStack = createStackNavigator();
const MainStack = createStackNavigator();

class Main extends React.Component {
    render() {
        return(
            <MainStack.Navigator>
                <MainStack.Screen name="MainPage" component={MainPage}
                options={{
                    headerTitle: () => (
                      <View>
                        <LogoSvg/>
                      </View>
                    ),
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{ marginHorizontal: 10 }}
                      >
                          <MenuSvg/>
                      </TouchableOpacity>
                    )
                  }}/>
                <MainStack.Screen name="MainControl" component={MainControl}
                options={{
                    headerTitle: () => (
                      <View>
                        <Text>상세제어</Text>
                      </View>
                    ),
                }}/>
                <MainStack.Screen name="StealCheck" component={StealCheck}
                options={{
                    headerTitle: () => (
                      <View>
                        <Text>도난확인</Text>
                      </View>
                    ),
                }}/>
            </MainStack.Navigator>
        )
    }
}

export const RootNavigator = () => {
    return (
        <FirstStack.Navigator screenOptions={{headerShown: false}}>
            <FirstStack.Screen name="FirstPage" component={FirstPage}/>
            <FirstStack.Screen name="Main" component={Main}/>
        </FirstStack.Navigator>
    )
}