// Loading.js
import React from 'react'
import auth from '@react-native-firebase/auth'
import { View, Text, StyleSheet, Button, TouchableOpacity, Appearance } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'

export default class Loading extends React.Component {
    /*componentDidMount() {
        auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main':'SignUp')
        })
    }*/
    state = {
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white'
    }
    componentDidMount() {
        Appearance.addChangeListener(this.onAppThemeChanged);
        //console.log(this.state.scheme)
        const textColor = this.state.scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        //console.log(this.state.textColor)
        const backgroundColor = this.state.scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({backgroundColor})
        console.log(this.state.backgroundColor)
    }
    onAppThemeChanged = (theme) => {
        const scheme = theme.colorScheme;
        this.setState({ scheme })
        //console.log(this.state.scheme)
        const textColor = scheme === 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text
        this.setState({ textColor })
        //console.log(this.state.textColor)
        const backgroundColor = scheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background
        this.setState({backgroundColor})
        //console.log(this.state.backgroundColor)
    };

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                <Text style={{ color: this.state.textColor }}>바빌</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={{color:"black"}}>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => this.props.navigation.navigate('Login')}
                >
                    <Text style={{color:"black"}}>로그인</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        marginTop: 10,
        textColor: "black"
    }
})

