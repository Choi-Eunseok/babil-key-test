import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import styles from '../styles';
import Base64 from '../Base64';
import PowerOnSvg from '../../assets/img/ic_boot_off_22_01.svg';
import PowerOffSvg from '../../assets/img/ic_boot_on_22_01.svg';

function str2ab(str) {
    console.log("string to send: ", str)
    var bufView = new Uint8Array(str.length);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}

export default class MainControl extends Component {

    state = {
        arr: [],
        device: null,
        onoff: ''
    }

    componentDidMount() {
        const { arr } = this.props.route.params
        this.setState({ arr })
        if (arr[1] !== null) {
            arr[1].connect().then(() => {
                arr[1].discoverAllServicesAndCharacteristics().then(() => {
                    this.setState({ arr })
                    this.writeCharacteristic('\n')
                    arr[1].monitorCharacteristicForService('0000FFE0-0000-1000-8000-00805F9B34FB', '0000FFE1-0000-1000-8000-00805F9B34FB',
                        (error, characteristic) => {
                            if (characteristic !== null){
                                const onoff = Base64.atob(characteristic.value)
                                console.log(onoff)
                                this.setState({onoff})
                            }
                        },
                    )
                    this.writeCharacteristic('s')
                })
            })
            
        }

    }

    componentWillUnmount() {
        console.log('cancel')
        if (this.state.arr[1] !== null) {
            this.state.arr[1].cancelConnection()
        }
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
            this.state.arr[1].writeCharacteristicWithoutResponseForService('0000FFE0-0000-1000-8000-00805F9B34FB', '0000FFE1-0000-1000-8000-00805F9B34FB', base64packet)
            offset += packetsize;
        } while (offset < buffer.length)
    }

    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ flex: 1 }}>
                <Image style={{ width: width }} source={require("../../assets/img/img_motorcycle03.png")} />
                <View style={{ marginTop: 40, marginHorizontal: 20 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: '#E6E6E6' }}>KR 모터스 </Text>
                        <Text style={[{ marginBottom: 1, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 12, }, this.state.arr[2] ? { color: '#0FC760' } : { color: '#00000029' }]}>Yamaha</Text>
                    </View>

                    <Text style={[{ marginTop: 5, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 20 }, this.state.arr[2] ? { color: 'black' } : { color: '#9B9B9D' }]}>{this.state.arr[0]}</Text>
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        {this.state.onoff === '' ? (
                            <TouchableOpacity
                                style={{ height: width / 2 - 25, width: width / 2 - 25, borderWidth: 2, borderRadius: 15, borderColor: '#F3F3F3', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#0FC760" />
                            </TouchableOpacity>
                        ) : (this.state.onoff === 'L' ? (
                                <TouchableOpacity onPress={() => {
                                this.writeCharacteristic('k')
                                console.log('k')
                            }}
                                style={{ height: width / 2 - 25, width: width / 2 - 25, borderWidth: 2, borderRadius: 15, borderColor: '#0FC760', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                                <PowerOnSvg width={width / 2 - 140} height={width / 2 - 140} />
                            </TouchableOpacity>) : (
                                <TouchableOpacity onPress={() => {
                                this.writeCharacteristic('k')
                                console.log('k')
                            }}
                                style={{ height: width / 2 - 25, width: width / 2 - 25, borderWidth: 2, borderRadius: 15, borderColor: '#FF4E4E', backgroundColor: '#FF4E4E', justifyContent: 'center', alignItems: 'center' }}>
                                <PowerOffSvg width={width / 2 - 140} height={width / 2 - 140} />
                            </TouchableOpacity>)
                        )}
                        
                        
                        <View style={{marginLeft:10}}>
                            <TouchableOpacity onPress={() => {}}
                                style={{ height: (width / 2 - 25)/2-5, width: width / 2 - 25, borderWidth: 1, borderRadius: 15, borderColor: '#F3F3F3', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>주유구</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}
                                style={{ marginTop:10, height: (width / 2 - 25)/2-5, width: width / 2 - 25, borderWidth: 1, borderRadius: 15, borderColor: '#F3F3F3', backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
                                <Text>모빌리티 상태보기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
                {this.state.arr[2] ? (<View />) : (<View style={styles.overlay} />)}
            </View>

        )
    }
}