import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getVehicles} from '../../store/actions/main_action';

class MainHome extends Component {

    //바이크 리스트를 받아오는 액션을 실행합니다.
    componentDidMount() {
        this.props.getVehicles();
    }

    //받아온 바이크 리스트를 렌더링 합니다.
    //받아온 값이 만약 없으면(null), 등록된 바이크가 없다는 화면을 띄워줍니다.
    renderVehicles = (Bikes) => (
        Bikes.vehicles ?
        Bikes.vehicles.map((item, index) => (
            <TouchableOpacity
                key={index}
                onPress={()=>{
                    this.props.navigation.push('MainForm', {
                        vehicleData: item,
                        index: index
                    })
                }}
            >
                <View style={styles.listContainer}>
                    <View>
                        <Text>{item.data.brand}</Text>
                    </View>
                    
                    <View>
                        <Text>{item.data.model}</Text>
                    </View>

                    <View>
                        <Text>{item.data.nickname}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        ))
        :
        <Text>등록된 바이크가 없습니다</Text>
    )

    render () {
        console.log(this.props.Bikes)
        return (
            <View>
                <ScrollView>
                    <View>
                        {this.renderVehicles(this.props.Bikes)}
                    </View>
                </ScrollView>

                <View>
                    <Button
                        title="+ 내 바이크 등록하기"
                        onPress={()=>this.props.navigation.push("AddVehicle")}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer:{
        backgroundColor: '#fff',
        margin: 10,
        shadowColor: '#cccccc',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 2
    }
})

function mapStateToProps(state) {
    return {
        Bikes: state.Main_Reducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getVehicles}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHome);