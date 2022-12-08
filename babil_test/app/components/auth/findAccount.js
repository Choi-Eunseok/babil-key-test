import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
} from 'react-native';

import Input from '../../utils/forms/input';

class FindAccount extends Component {
    constructor (props) {
        super(props);
        this.props.route.name == 'FindEmail' ?
            this.state={
                type:'email',
                action:'아이디 찾기',
                form:{
                    name:{
                        value:"",
                        type:"textInput"
                    },
                    email:{
                        value:"",
                        type:"textInput"
                    }
                }
            }
        :   this.state={
                type:'password',
                action:'비밀번호 찾기',
                form:{
                    name:{
                        value:"",
                        type:"textInput"
                    },
                    email:{
                        value:"",
                        type:"textInput"
                    }
                }
            }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors:false
        })
        
        let formCopy = this.state.form;
        formCopy[name].value = value

        this.setState({
            form: formCopy
        })
    }

    putEmailAddress = () => (
        this.state.type != 'email' ?
            <Input
                title='이메일'
                value={this.state.form.email.value}
                type={this.state.form.email.type}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                placeholder='이메일을 입력해주세요.'
                placeholderTextColor={'#ddd'}
                onChangeText = {value => this.updateInput("email", value)}
            />
        :   null
    )

    render () {
        return (
            <View>
                {this.putEmailAddress()}

                <Input
                    title='이름'
                    value={this.state.form.name.value}
                    type={this.state.form.name.type}
                    placeholder='이름을 입력해주세요.'
                    placeholderTextColor={'#ddd'}
                    onChangeText = {value => this.updateInput("name", value)}
                />

                <View>
                    <Button
                        title={this.state.action}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default FindAccount;