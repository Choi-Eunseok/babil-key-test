import React from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Text
} from 'react-native';

//레이아웃과 스타일 작업이 필요할 것 같습니다!
const input = (props) => {
    let template = null;
    switch(props.inputType) {
        case "textInput" :
            template =
                <View style={{marginTop:10}}>
                    <Text style={{ fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 14}}>{props.title}</Text>
                    <TextInput
                        {...props}
                        style={styles.input}
                    />
                    {!props.valid && !props.isBlank ?                       //입력이 1.규칙에 맞지 않고 AND 2.비어있지 않을때
                        <Text>옳바르지 않은 {props.type} 형식입니다.</Text>       //다음과 같은 텍스트를 출력합니다.
                    :null}
                </View>
        break;
        case "textInputRevised" :
            template =
                <TextInput
                {...props}
                style={styles.inputRevised}
                />
        break;
        default :
            return template
    }
    return template
}

const styles = StyleSheet.create({
    input: {
        width:'100%',
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#F3F3F3',
        backgroundColor: '#FFFFFF',
        fontSize:16,
        fontFamily: "SpoqaHanSansNeo-Medium",
        marginVertical:10
    },
    inputRevised: {
        width:'100%',
        borderBottomWidth:3,
        borderBottomColor:'red',
        fontSize:17,
        padding:5,
        marginTop:30
    }
});

export default input;