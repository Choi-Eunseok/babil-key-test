import React from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { TouchableHighlight } from "react-native-gesture-handler";

const bottomButton = (props) => {
    let template = props.enabled ? 
        <View style={[
            { height: 80 },
            props.type == "noUse"? {backgroundColor:'#FF4E4E'}: {backgroundColor:'#0FC760'} // Button Red || Green
        ]}
        >
            <TouchableHighlight
                {...props}
                activeOpacity={0.6}
                underlayColor= '#E5F9EE'
                style={styles.buttons}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableHighlight>
        </View>
        :
        <View style={{ height: 80, backgroundColor:'#00000029' }}>
            <View
                style={styles.buttons}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </View>
    return template
}

const styles = StyleSheet.create({
    buttons: {
        height:80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 30
    }
});

export default bottomButton;