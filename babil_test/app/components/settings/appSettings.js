import React, {Component} from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

class AppSettings extends Component {
    render () {

        return (
            <View style={{height:'100%', alignItems:'center', justifyContent:'center'}}>
                <View>
                    <Button
                        title="twoStep"
                        onPress={()=>this.props.navigation.getParent().push("TwoStep")}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})

export default AppSettings;