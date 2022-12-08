import React, {Component} from 'react';
import {Animated, Image, Dimensions, View} from 'react-native';

const bikeImage = require('../../assets/images/img_motorcycle02.png');

import LogoSvg from '../../assets/images/logo_babil_01_white.svg';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            isLoggedIn: false
        }
    }

    onComplete = () => {
        {this.state.isLoggedIn ?
            this.props.navigation.reset({routes:[{name: 'CompComponent'}]})
        :
            this.props.navigation.reset({routes:[{name: 'AuthComponent'}]})
        }
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start(()=>{
            this.onComplete()
        })
    }

    render() {
        var {height, width} = Dimensions.get('window');
        return (
            <View style={{height: '100%', backgroundColor: '#0FC760', justifyContent: 'center', alignItems: 'center'}}>
                
                <Animated.View
                style={{ 
                        opacity: this.state.opacity,
                        left: this.state.opacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [60, 0]
                        }),
                        alignItems:'center'
                }}
                >
                    <LogoSvg height={120} width={120} />
                    <View style={{height:50}}/>
                    <Image source={bikeImage} style={{width: width}} onLoad={this.onLoad} />
                </Animated.View>
            </View>
        )
    }
}

export default Loading;