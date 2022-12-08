import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, Button } from 'react-native';
import { writeCharacteristic, stopConnection } from '../actions/bleAction';


function handleClick(ReduxStore, text) {
  if(text === 'stop'){
    ReduxStore.stopConnection()
  }else{
    ReduxStore.writeCharacteristic('\n' + text + '\n');
  }
  
}

function BLEReadcharacteristic(ReduxStore) {
  const [text, setText] = useState({ 'text': 'write something to device' });
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={(text) => setText({ text })}
        style={{ height: 40, color: 'black', borderColor: 'gray', borderWidth: 1 }}
        value={text.text}
      />
      <Button
        title="Write"
        onPress={() => handleClick(ReduxStore, text.text)}
      ></Button>
      <Button
        title="key"
        onPress={() => handleClick(ReduxStore, 'key')}
      ></Button>
      <Button
        title="cancelConnection"
        onPress={() => handleClick(ReduxStore, 'stop')}
      ></Button>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = dispatch => ({
  writeCharacteristic: text => dispatch(writeCharacteristic(text)),
  stopConnection: () => dispatch(stopConnection())
})

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(BLEReadcharacteristic);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
  subtext: {
    fontSize: 10,
  }
});