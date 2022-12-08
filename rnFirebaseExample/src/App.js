import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Appearance } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
// create our app's navigation stack
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      SignUp,
      Login,
      Main
    },
    {
      initialRouteName: 'Loading'
    }
  )
)

function App() {

  return (
      <AppContainer/>
  )
}
export default App