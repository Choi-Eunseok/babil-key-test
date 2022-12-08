// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Appearance, Alert } from 'react-native'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Slider from '@react-native-community/slider';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const Stack = createStackNavigator()

export default class SignUp extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="SignUpMotorList"
                        component={SignUpMotorList}
                        initialParams={{ originalNavigation: this.props.navigation }}
                        options={{
                            title: '차종 선택',
                            headerStyle: {
                                backgroundColor: '#71D87B',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="SignUpMotorInfo"
                        component={SignUpMotorInfo}
                        initialParams={{ originalNavigation: this.props.navigation }}
                        options={{
                            title: '차량 정보',
                            headerStyle: {
                                backgroundColor: '#71D87B',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="SignUpBabilInfo"
                        component={SignUpBabilInfo}
                        initialParams={{ originalNavigation: this.props.navigation }}
                        options={{
                            title: '바빌 등록',
                            headerStyle: {
                                backgroundColor: '#71D87B',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="SignUpLast"
                        component={SignUpLast}
                        initialParams={{ originalNavigation: this.props.navigation }}
                        options={{
                            title: '로그인 계정 생성',
                            headerStyle: {
                                backgroundColor: '#71D87B',
                            }
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

class SignUpMotorList extends React.Component {
    state = {
        motorType: '',
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: '',
    }

    componentDidMount() {
        const { originalNavigation } = this.props.route.params
        this.setState({ originalNavigation })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }
    componentWillUnmount() {

    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpMotorInfo', { motorType: '대림' })}
                >
                    <Text style={{ color: "black" }}>대림</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpMotorInfo', { motorType: 'KR 모터스' })}
                >
                    <Text style={{ color: "black" }}>KR 모터스</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpMotorInfo', { motorType: 'BMW' })}
                >
                    <Text style={{ color: "black" }}>BMW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpMotorInfo', { motorType: '혼다' })}
                >
                    <Text style={{ color: "black" }}>혼다</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpMotorInfo', { motorType: '할리 데이비슨' })}
                >
                    <Text style={{ color: "black" }}>할리 데이비슨</Text>
                </TouchableOpacity>
                <View style={{ height: 50 }}></View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.state.originalNavigation.navigate('Loading')}
                >
                    <Text style={{ color: "black" }}>첫 화면으로</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class SignUpMotorInfo extends React.Component {
    state = {
        motorType: '',
        motorCC: 0,
        motorYear: 0,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: '',
    }

    componentDidMount() {
        const { originalNavigation, motorType } = this.props.route.params
        this.setState({ originalNavigation, motorType })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={{ color: this.state.textColor }}>CC</Text>
                <Slider
                    style={{ height: 40, width: 300 }}
                    value={this.state.motorCC}
                    onValueChange={(motorCC) => this.setState({ motorCC })}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
                <Text style={{ color: this.state.textColor }}> {this.state.motorCC} </Text>
                <View style={{ height: 50 }}></View>
                <Text style={{ color: this.state.textColor }}>수명</Text>
                <Slider
                    style={{ height: 40, width: 300 }}
                    value={this.state.motorYear}
                    onValueChange={(motorYear) => this.setState({ motorYear })}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                />
                <Text style={{ color: this.state.textColor }}> {this.state.motorYear} </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpBabilInfo', {
                        motorType: this.state.motorType,
                        motorCC: this.state.motorCC,
                        motorYear: this.state.motorYear
                    })}
                >
                    <Text style={{ color: "black" }}>다음으로</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class SignUpBabilInfo extends React.Component {
    state = {
        motorType: '',
        motorCC: 0,
        motorYear: 0,
        babilNum: '',
        motorVin: '',
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: '',
    }

    componentDidMount() {
        const { originalNavigation, motorType, motorCC, motorYear } = this.props.route.params
        this.setState({ originalNavigation, motorType, motorCC, motorYear })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={{ color: this.state.textColor }}>바빌키 번호</Text>
                <TextInput
                    style={[styles.textInput, { color: this.state.textColor }]}
                    onChangeText={babilNum => this.setState({ babilNum })}
                    value={this.state.babilNum}
                />
                <View style={{ height: 50 }}></View>
                <Text style={{ color: this.state.textColor }}>차량 VIN(차대번호)</Text>
                <TextInput
                    style={[styles.textInput, { color: this.state.textColor }]}
                    onChangeText={motorVin => this.setState({ motorVin })}
                    value={this.state.motorVin}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('SignUpLast', {
                        motorType: this.state.motorType,
                        motorCC: this.state.motorCC,
                        motorYear: this.state.motorYear,
                        babilNum: this.state.babilNum,
                        motorVin: this.state.motorVin
                    })}
                >
                    <Text style={{ color: "black" }}>다음으로</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


class SignUpLast extends React.Component {
    state = {
        motorType: '',
        motorCC: 0,
        motorYear: 0,
        babilNum: '',
        motorVin: '',
        email: '',
        password: '',
        errorMessage: null,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: '',
    }

    handleSignUp = () => {
        Alert.alert(
            "확인",
            "차종 : " + this.state.motorType + "\nCC : " + this.state.motorCC + "\n수명 : " + this.state.motorYear +
            "\n바빌키 번호 : " + this.state.babilNum + "\n차량 vin : " + this.state.motorVin + "\n이메일 : " + this.state.email,
            [
                {
                    text: "아니요",
                    style: "cancel"
                },
                {
                    text: "네",
                    onPress: () => {
                        auth()
                            .createUserWithEmailAndPassword(this.state.email, this.state.password)
                            .then(() => {
                                const uid = auth().currentUser.uid
                                database()
                                    .ref('/users/' + uid)
                                    .set({
                                        motorType: this.state.motorType,
                                        motorCC: this.state.motorCC,
                                        motorYear: this.state.motorYear,
                                        babilNum: this.state.babilNum,
                                        motorVin: this.state.motorVin
                                    })
                                this.state.originalNavigation.navigate('Main')
                            })
                            .catch(error => this.setState({ errorMessage: error.message }))
                    }
                }
            ]
        )

    }

    componentDidMount() {
        const { originalNavigation, motorType, motorCC, motorYear, babilNum, motorVin } = this.props.route.params
        this.setState({ originalNavigation, motorType, motorCC, motorYear, babilNum, motorVin })
        this.setState({ originalNavigation })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={{ color: this.state.textColor }}>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={
                        { color: 'red' }
                    }>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={[styles.textInput, { color: this.state.textColor }]}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={[styles.textInput, { color: this.state.textColor }]}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" onPress={this.handleSignUp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
    }
})