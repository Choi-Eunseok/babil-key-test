import React, { Component } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Toast, Center, NativeBaseProvider } from "native-base"
import { RootNavigator } from './routes';

class App extends Component {
  render() {
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Bluetooth Permissions',
          message: 'We need access to bluetooth permissions',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Permission Granted
        console.log('granted');
      }
    }
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}

export default App;