// Main.js
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Appearance } from 'react-native'
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from "@react-navigation/drawer"
import auth from '@react-native-firebase/auth'

const Tab = createBottomTabNavigator()

class MainTab extends React.Component {
    render() {
        const { currentUser } = auth()
        const { originalNavigation } = this.props.route.params
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen
                    name="MainStart"
                    component={MainStart}
                    initialParams={{ originalNavigation: originalNavigation, currentUser: currentUser, drawerNavigation: this.props.navigation }}
                    options={{ title: '시동' }}
                />
                <Tab.Screen
                    name="MainFuel"
                    component={MainFuel}
                    initialParams={{ originalNavigation: originalNavigation, currentUser: currentUser, drawerNavigation: this.props.navigation }}
                    options={{ title: '연료통' }}
                />
                <Tab.Screen
                    name="MainStatus"
                    component={MainStatus}
                    initialParams={{ originalNavigation: originalNavigation, currentUser: currentUser, drawerNavigation: this.props.navigation }}
                    options={{ title: '상태' }}
                />
            </Tab.Navigator>
        )
    }
}

const Drawer = createDrawerNavigator()

export default class Main extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                >
                    <Drawer.Screen name="Home" component={MainTab} initialParams={{ originalNavigation: this.props.navigation }} options={{ drawerLabel: '홈으로' }} />
                    <Drawer.Screen name="Device" component={Device} options={{ drawerLabel: '내 기기 관리' }} />
                    <Drawer.Screen name="Service" component={Service} options={{ drawerLabel: '고객센터' }} />
                    <Drawer.Screen name="FAQ" component={FAQ} options={{ drawerLabel: 'FAQ' }} />
                    <Drawer.Screen name="Settings" component={Settings} options={{ drawerLabel: '환경설정' }} />
                    <Drawer.Screen name="Terms" component={Terms} options={{ drawerLabel: '약관 및 정책' }} />
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

class Device extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Text>메뉴열기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class Service extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Text>메뉴열기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class FAQ extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Text>메뉴열기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class Settings extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Text>메뉴열기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
class Terms extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.openDrawer()}>
                    <Text>메뉴열기</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class MainStart extends React.Component {
    state = {
        currentUser: null,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: '',
        drawerNavigation: ''
    }

    componentDidMount() {
        const { originalNavigation, currentUser, drawerNavigation } = this.props.route.params
        this.setState({ currentUser, originalNavigation, drawerNavigation })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.state.drawerNavigation.openDrawer()}
                >
                    <Text style={{ color: "black" }}>메뉴</Text>
                </TouchableOpacity>
                <Text style={{ color: this.state.textColor }}>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{ color: "black" }}>시동 켜기 / 끄기</Text>
                </TouchableOpacity>
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

class MainFuel extends React.Component {
    state = {
        currentUser: null,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: ''
    }

    componentDidMount() {
        const { originalNavigation, currentUser } = this.props.route.params
        this.setState({ currentUser, originalNavigation })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={{ color: this.state.textColor }}>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{ color: "black" }}>연료통 열기 / 닫기</Text>
                </TouchableOpacity>
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

class MainStatus extends React.Component {
    state = {
        currentUser: null,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white',
        originalNavigation: ''
    }

    componentDidMount() {
        const { originalNavigation, currentUser } = this.props.route.params
        this.setState({ currentUser, originalNavigation })
        Appearance.addChangeListener(this.onAppThemeChanged)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme
        this.setState({ scheme })
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({ backgroundColor })
        console.log(this.state.backgroundColor)
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>
                <Text style={{ color: this.state.textColor }}>
                    Hi {currentUser && currentUser.email}!
                </Text>
                <Text style={{ color: this.state.textColor }}>모빌리티 상태</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
    }
})