import React, { Component } from 'react';
import { View, Text, Image, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native';
import database from '@react-native-firebase/database';

export default class StealCheck extends Component {
    state = {
        pos : "",
        steal : ""
    }

    componentDidMount() {
        database()
            .ref('/user/abcd/babil_key/첫번째 오토바이')
            .on('value', snapshot => {
                const pos = snapshot.val().pos
                const steal = snapshot.val().steal
                console.log('pos: ', pos)
                console.log('steal: ', steal)
                this.setState({ pos, steal })
            })
    }

    render() {
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>pos : {this.state.pos}</Text>
                <Text>steal : {this.state.steal}</Text>
            </View>
        )
    }

}