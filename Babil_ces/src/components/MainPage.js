import React, { Component } from 'react';
import { View, Text, Image, StatusBar, FlatList, TouchableOpacity, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import styles from '../styles';
import Base64 from '../Base64';
import { BleManager } from 'react-native-ble-plx';

function str2ab(str) {
    console.log("string to send: ", str)
    var bufView = new Uint8Array(str.length);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}

export default class MainPage extends Component {
    constructor() {
        super();
        this.manager = new BleManager()
    }

    state = {
        arr: [[,,]]
    }

    Item = ({ arr }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.manager.stopDeviceScan()
                    this.props.navigation.navigate('MainControl', {arr: arr})}}
                style={[{ marginTop: 20, flexDirection: 'row', height: 125, borderWidth: 2, borderRadius: 15, borderColor: '#F3F3F3', }, arr[2] ? { backgroundColor: '#FFFFFF' } : { backgroundColor: '#F3F3F3' }]}>
                <View style={{ width: 120, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 75, height: 75, backgroundColor: '#F8F8F8' }} source={require("../../assets/img/img_motorcycle02.png")} />
                </View>
                <View style={{ flex: 1, marginRight: 70, justifyContent: 'center', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: '#E6E6E6' }}>KR 모터스 </Text>
                        <Text style={[{ marginBottom: 1, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 12, }, arr[2] ? { color: '#0FC760' } : { color: '#00000029' }]}>Yamaha</Text>
                    </View>
    
                    <Text style={[{ marginTop: 5, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 20}, arr[2] ? { color: 'black' } : { color: '#9B9B9D' }]}>{arr[0]}</Text>
                    <Text style={[{ marginTop: 10, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 10}, arr[2] ? { color: '#4E77FF' } : { color: '#00000029' }]}>{arr[2] ? '연결됨' : '연결안됨'}</Text>
                </View>
                <View style={{ width: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F3F3' }}>
                    <Image style={{ width: 20, height: 20, transform: [{ rotate: '90deg' }] }} source={require("../../assets/img/ic_move_20_01.png")} />
                </View>
            </TouchableOpacity>
        );
    };

    scanAndConnect(json) {
        this.manager.startDeviceScan(null, null, (error, device) => {
            for(let i = 0; i < Object.keys(json).length; i++) {
                let name = json[Object.keys(json)[i]].bleName
                if(device.name !== null) {
                    console.log(name + ' : ' + device.name)
                    if (device.name == name) {
                        console.log('found ' + name)
                        const arr = this.state.arr
                        arr[i][1] = device
                        arr[i][2] = true
                        this.setState({ arr })
                    }
                }
                
            }
        })
    }

    componentDidMount() {
        database()
            .ref('/user/abcd/babil_key')
            .once('value')
            .then(snapshot => {
                const arr = []
                console.log('User data: ', Object.keys(snapshot.val()));
                for(let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    arr.push([Object.keys(snapshot.val())[i], null, false])
                }
                this.scanAndConnect(snapshot.val())
                this.setState({ arr })
            });
    }

    writeCharacteristic = (text) => {
        let buffer = str2ab(text)
        let packetsize = 20;
        let offset = 0;
        let packetlength = packetsize;
        do {
            if (offset + packetsize > buffer.length) {
                packetlength = buffer.length;
            } else {
                packetlength = offset + packetsize;
            }
            let packet = buffer.slice(offset, packetlength);
            console.log("packet: ", packet)
            let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
            this.state.arr[0][1].writeCharacteristicWithoutResponseForService('0000FFE0-0000-1000-8000-00805F9B34FB', '0000FFE1-0000-1000-8000-00805F9B34FB', base64packet)
            offset += packetsize;
        } while (offset < buffer.length)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <View style={{ flex: 1, margin: 20 }}>
                    <StatusBar barStyle={"dark-content"} backgroundColor={'transparent'} translucent={true} />
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={{
                                marginTop: 10,
                                marginBottom: 5,
                                height: 50,
                                paddingHorizontal: 15,
                                borderWidth: 2,
                                borderRadius: 15,
                                borderColor: '#F3F3F3',
                                backgroundColor: '#FFFFFF',
                                fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15,
                            }}
                            placeholder="바이크를 검색해주세요."
                        />

                        <FlatList
                            data={this.state.arr}
                            renderItem={({ item }) => <this.Item arr={item} />}
                        />

                    </View>
                    <View style={{ height: 100, backgroundColor: 'green' }}>
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.navigate('StealCheck')}}
                        style={{ flex:1, backgroundColor: 'black'}}>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}