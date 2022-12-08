import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {signIn, signUp} from '../../store/actions/auth_action';
import ValidationRules from '../../utils/forms/validationRules';
import Input from '../../utils/forms/input';
import BottomButton from '../../utils/forms/bottomButton';
import LogoImage from '../../assets/images/logo_sample.png';
import LogoSvg from '../../assets/images/logo_babil_01.svg';

class AuthForm extends Component {

    state = {
        type: this.props.route.params.type,         //login, register
        action: this.props.route.params.action,     //로그인, 다음(등록)
        hasErrors: false,                           //form 이 올바르지 않거나, 서버로 부터 응답이 옳바르지 않은 경우 true가 됩니다.
        form: {
            email: {
                value: "",
                type: "textInput",
                rules:{
                    isRequired: true,
                    isEmail: true,
                },
                valid: false,
                isBlank: true
            },
            password: {
                value: "",
                type: "textInput",
                rules:{
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                isBlank: true
            },
            confirmPassword: {
                value: "",
                type: "textInput",
                rules:{
                    confirmPassword: 'password'
                },
                valid: false,
                isBlank: true
            }
        }
    }

    logo = () => (
        this.state.type == 'login' ?
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
                <LogoSvg height='150' width='100' />
            </View>
            : null
    )

    //Input 컴포넌트에서, onChangeText의 이벤트 핸들러 입니다.
    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        let formCopy = this.state.form;
        formCopy[name].value = value

        //rules
        //입력할 때 마다 rule 체크를 합니다.
        let rules = formCopy[name].rules;
        let valid = ValidationRules(value, rules, formCopy);
        formCopy[name].valid = valid;

        //입력값이 null 인지 체크 합니다.
        !value ? formCopy[name].isBlank = true : formCopy[name].isBlank = false;

        this.setState({
            form: formCopy
        })
    }

    //authForm 컴포넌트의 state.type 에 따라 action creator에서 어떤 action 을 불러올지 정합니다.
    submitUser = () => {
        let isFormValid = true;
        let submittedForm = {};

        const formCopy = this.state.form;

        //type 이 login 인지 register 인지에 따라 submittedForm 에 무엇을 담을건지 정합니다.
        for (let key in formCopy) {
            if (this.state.type === 'login') {
                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    submittedForm[key] = formCopy[key].value;
                }
            }
            else {
               isFormValid = isFormValid && formCopy[key].valid;
               submittedForm[key] = formCopy[key].value;
            }
        }

        //결국, isFormValid는 for 문을 전부 돌며, 각 form에서 valid 끼리 and 연산 한 것과 같아집니다.
        //즉 모든 form 의 valid 가 true 가 아니면, 액션 자체가 실행이 안됩니다.
        if (isFormValid) {
            if (this.state.type === 'login') {
                this.props.signIn(submittedForm);
                setTimeout(()=>{
                    this.manageAccess()
                }, 500);
            }
            else {
                this.props.signUp(submittedForm);
                setTimeout(()=>{
                    this.manageAccess()
                }, 500);
            }
        }
        else {
           this.setState ({
               hasErrors:true
           })
        }
    }

    //firebase에서의 response가 비어있는 경우, 다음화면으로 넘어가지 않습니다.
    //추후 if 조건문은 firebase로 부터의 response 중 userId 로 바꿉니다.
    manageAccess = () => {
        if (!this.props.User.auth.email) {
            this.setState({hasErrors:true})
        }
        else {
            this.setState({hasErrors:false});
            this.props.navigation.navigate("TwoStep")
        }
    }

    confirmPassword = () => (
        this.state.type != 'login' ?
            <View>
                <View>
                    <Input
                        title='비밀번호 확인'
                        type='비밀번호'
                        value={this.state.form.confirmPassword.value}
                        inputType={this.state.form.confirmPassword.type}
                        secureTextEntry={true}
                        placeholder='비밀번호 재입력'
                        placeholderTextColor={'#ddd'}
                        onChangeText={value => this.updateInput("confirmPassword", value)}
                        valid={this.state.form.confirmPassword.valid}
                        isBlank={this.state.form.confirmPassword.isBlank}
                    />
                </View>
            </View>
            : null
    )

    //전화번호 입력
    getPhoneNum = () => (
        this.state.type != 'login' ?
            <View>
                <View>
                    <Input
                        title='휴대전화 번호'
                        type='휴대전화 번호'
                        value={this.state.form.confirmPassword.value}
                        inputType={this.state.form.confirmPassword.type}
                        secureTextEntry={true}
                        placeholder='비밀번호 재입력'
                        placeholderTextColor={'#ddd'}
                        onChangeText={value => this.updateInput("confirmPassword", value)}
                        valid={this.state.form.confirmPassword.valid}
                        isBlank={this.state.form.confirmPassword.isBlank}
                    />
                </View>
            </View>
            : null
    )

    //로그인/다음 버튼과 로그인 화면에서의 이메일 찾기 | 비밀번호 찾기 버튼을 담고 있습니다.
    //추후 이름을 수정해야 안 헷갈릴 것 같습니다.
    findAccount = () => (
        this.state.type == 'login' ?
            <View>
                <View>
                    <Button
                        title={this.state.action}
                        onPress={() => this.submitUser()}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate("FindAccount", { screen: "FindEmail" }) }}
                        >
                            <Text>이메일 찾기 </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text> | </Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate("FindAccount", { screen: "FindPassword" }) }}
                        >
                            <Text> 비밀번호 찾기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <BottomButton
                title={this.state.action}
                onPress={() => this.submitUser()}
            />
    )

    formHasErrors = () => (
        this.state.hasErrors ? 
        Alert.alert("ALERT!")
        : null
    )

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={[this.state.type == 'register'? {flex:1}: null,{ backgroundColor: 'white', marginHorizontal: 20 }]}>
                    {this.logo()}

                    <View>
                        <Input
                            title='이메일'
                            type='이메일'
                            value={this.state.form.email.value}
                            inputType={this.state.form.email.type}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            placeholder='이메일을 입력해주세요.'
                            placeholderTextColor={'#ddd'}
                            onChangeText={value => this.updateInput("email", value)}
                            valid={this.state.form.email.valid}
                            isBlank={this.state.form.email.isBlank}
                        />
                    </View>

                    <View>
                        <Input
                            title='비밀번호'
                            type='비밀번호'
                            value={this.state.form.password.value}
                            inputType={this.state.form.password.type}
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            placeholder='비밀번호를 입력해주세요.'
                            placeholderTextColor={'#ddd'}
                            onChangeText={value => this.updateInput("password", value)}
                            valid={this.state.form.password.valid}
                            isBlank={this.state.form.password.isBlank}
                        />
                    </View>

                    {this.confirmPassword()}
                    {/* {this.getPhoneNum()} */}
                    {this.formHasErrors()}
                    </View>
                {this.findAccount()}
            </View>
        )
    }
}

const styles = StyleSheet.create({})

function mapStateToProps(state) {
    return {
        User: state.Auth_Reducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signIn,signUp}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);