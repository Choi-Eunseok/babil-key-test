import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import LogoSvg from '../../assets/images/logo_babil_01.svg';

import AuthLogo from './authLogo';

class AuthComponent extends Component {
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ margin: 20 }}>
                    <LogoSvg width={80} height={40} />
                    <Text style={{ fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, marginTop: 10, color: '#0FC760' }}>이제 오토바이도</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={{ fontFamily: "SpoqaHanSansNeo-Bold", fontSize: 30, color: '#0FC760' }}>휴대폰</Text>
                        <Text style={{ fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, color: '#0FC760' }}>으로 </Text>
                        <Text style={{ fontFamily: "SpoqaHanSansNeo-Bold", fontSize: 30, color: '#0FC760' }}>간편하게,</Text>
                    </View>
                    <Text style={{ fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, color: '#0FC760' }}>바빌키</Text>
                    <Image style={{ width: width }} source={require("../../assets/images/img_motorcycle01.png")} />
                    <View>
                        <View>
                            <View style={styles.button}>
                                <Button
                                    title="네이버 로그인"
                                />
                            </View>

                            <View style={styles.button}>
                                <Button
                                    title="카카오 로그인"
                                />
                            </View>

                            <View style={styles.button}>
                                <Button
                                    title="구글 로그인"
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate("AuthForm", { type: 'login', action: '로그인' }) }}
                                >
                                    <Text>이메일 로그인 </Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text> | </Text>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate("AuthForm", { type: 'register', action: '다음' }) }}
                                >
                                    <Text> 회원가입</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        ...Platform.select({
            ios: {
                marginTop: 15
            },
            android: {
                marginTop: 15,
                marginBottom: 10
            }
        })
    }
})

export default AuthComponent;