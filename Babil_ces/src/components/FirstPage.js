import React, { Component } from 'react';
import { View, Text, Image, StatusBar, Dimensions, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import styles from '../styles';
import LogoSvg from '../../assets/img/logo_babil_01.svg';
import NaberSvg from '../../assets/img/ic_naver_28_01.svg';
import KakaoSvg from '../../assets/img/ic_kakao_28_01.svg';
import GoogleSvg from '../../assets/img/ic_google_28_01.svg';

export default class FirstPage extends Component {
    render() {
        var {height, width} = Dimensions.get('window');
        return (
            <View style={[styles.container, {backgroundColor: '#0FC760'}]}>
                <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} translucent={true}/>
                <View style={styles.firstInside}>
                    <LogoSvg/>
                    <Text style={{fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, marginTop: 10, color: 'white'}}>이제 오토바이도</Text>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={{fontFamily: "SpoqaHanSansNeo-Bold", fontSize: 30, color: 'white'}}>휴대폰</Text>
                        <Text style={{fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, color: 'white'}}>으로 </Text>
                        <Text style={{fontFamily: "SpoqaHanSansNeo-Bold", fontSize: 30, color: 'white'}}>간편하게,</Text>
                    </View>
                    <Text style={{fontFamily: "SpoqaHanSansNeo-Light", fontSize: 30, color: 'white'}}>바빌키</Text>
                </View>
                <Image style={{width: width}} source={require("../../assets/img/img_motorcycle01.png")}/>
                <View style={styles.firstInside}>
                    <TouchableOpacity style={{flexDirection: 'row', height: 50, borderWidth:1, borderRadius: 15, borderColor:'white'}}>
                        <View style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
                            <NaberSvg />
                        </View>
                        <View style={{flex: 1, marginRight:70, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: 'white'}}>네이버로 시작하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', marginTop:10, height: 50, borderRadius: 15, backgroundColor:'#F9E000'}}>
                        <View style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
                            <KakaoSvg />
                        </View>
                        <View style={{flex: 1, marginRight:70, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: 'black'}}>카카오톡으로 시작하기</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{flexDirection: 'row', marginTop:10, height: 50, borderRadius: 15, backgroundColor:'white'}}
                    onPress={ () => this.props.navigation.reset({routes:[{name: 'Main'}]})}>
                        <View style={{width: 70, justifyContent: 'center', alignItems: 'center'}}>
                            <GoogleSvg />
                        </View>
                        <View style={{flex: 1, marginRight:70, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: 'black'}}>구글로 시작하기</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', marginTop:20, justifyContent: 'center', alignItems: 'center',}}>
                        <View style={{width:120, alignItems:'flex-end'}}>
                            <TouchableOpacity>
                                <Text style={{fontFamily: "SpoqaHanSansNeo-Regular", fontSize: 15, color: 'white'}}>이메일로 로그인</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginLeft:35, marginRight:35, width:1, height: 15, backgroundColor:'white'}}/>
                        <View style={{width:120, alignItems:'flex-start'}}>
                            <TouchableOpacity>
                                <Text style={{fontFamily: "SpoqaHanSansNeo-Regular", fontSize: 15, color: 'white'}}>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        )
    }
}