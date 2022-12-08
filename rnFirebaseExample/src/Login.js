// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Appearance } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null,
        scheme: Appearance.getColorScheme(),
        textColor: 'black',
        backgroundColor: 'white'
    }

    handleLogin = () => {
        const { email, password } = this.state
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Main'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    componentDidMount() {
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
        return (
            <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                <Text style={{ color: this.state.textColor }}>Login</Text>
                {this.state.errorMessage &&
                    <Text style={
                        { color: 'red' }
                    }>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    style={[styles.textInput, { color: this.state.textColor }]}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={[styles.textInput, { color: this.state.textColor }]}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Login" onPress={this.handleLogin} />
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => this.props.navigation.navigate('Loading')}
                >
                    <Text style={{color:"black"}}>첫 화면으로</Text>
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