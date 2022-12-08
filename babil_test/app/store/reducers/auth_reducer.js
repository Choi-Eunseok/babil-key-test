import {
    SIGN_IN,
    SIGN_UP
} from '../types';

export default function(state={}, action) {
    switch(action.type) {
        case SIGN_IN :
            return {
                ...state,
                auth:{
                    email: action.payload.email || false, //js의 논리연산자 관련 링크입니다. https://curryyou.tistory.com/193
                    password: action.payload.password || false
                }
            }
        case SIGN_UP :
            return {
                ...state,
                auth:{
                    email: action.payload.email || false,
                    password: action.payload.password || false
                }
            }
        default :
            return state
    }
}