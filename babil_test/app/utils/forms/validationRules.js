const validation = (value, rules, form) => {
    let valid = true;
    
    for(let rule in rules) {
        switch(rule) {
            case "isRequired":
                valid = valid && validateRequired(value)
                break;
            case "isEmail":
                valid = valid && validateEmail(value)
                break;
            case "minLength":
                valid = valid && validateMinLength(value, rules[rule])
                break;
            case "confirmPassword":
                valid = valid && validateConfirmPassword(value, form[rules.confirmPassword].value) //confirmPassword 의 rule은 그냥 'password' 입니다. 즉 form[password].value 랑 같은 말 인거죠.
                break;
            default:
                valid = true;
        }
    }
    return valid;
}

const validateRequired = (value) => {
    if (value !== "") {
        return true;
    }
    return false;
}

const validateEmail = (value) => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return expression.test(String(value).toLocaleLowerCase());
}

const validateMinLength = (value, ruleValue) => {
    if (value.length >= ruleValue) {
        return true;
    }
    return false;
}

//비밀번호와 비밀번호 재확인 란에 입력한 값이 같은지 확인합니다.
const validateConfirmPassword = (confirmPassword, password) => {
    return confirmPassword === password
}

export default validation;