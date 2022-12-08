import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

class UserInfo extends Component {
    render () {
        return (
            <View>
                <View>
                    <Button
                        title="내 정보 관리"
                        onPress={()=>this.props.navigation.navigate("MyInfo")}
                    />
                </View>

                <View>
                    <Button
                        title="내 바이크 관리"
                        onPress={()=>this.props.navigation.navigate("MyVehicle")}
                    />
                </View>

                <View>
                    <Button
                        title="탈퇴하기"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default UserInfo;