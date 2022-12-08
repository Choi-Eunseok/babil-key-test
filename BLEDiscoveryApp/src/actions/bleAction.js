import Base64 from '../Base64';
import {Platform} from 'react-native';

export const addBLE = device => ({
  type: 'ADD_BLE',
  device,
});

export const connectedDevice = (device) => ({
  type: "CONNECTED_DEVICE",
  connectedDevice: device
});

export const changeStatus = (status) => ({
  type: "CHANGE_STATUS",
  status: status
});

//some thunks to control the BLE Device

export const startScan = () => {
  return (dispatch, getState, DeviceManager) => {
    // you can use Device Manager here
    console.log("start Scanning");
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        console.log("powered on");
        dispatch(scan());
        subscription.remove();
      }
    }, true);
  };
};

export const scan = () => {
  return async (dispatch, getState, DeviceManager) => {
    const permission = Platform.OS === 'ios'? true: await requestLocationPermission();
    if (permission) {
      DeviceManager.startDeviceScan(null, null, (error, device) => {
        dispatch(changeStatus('Scanning'));
        if (error) {
          console.log(error);
        }
        if (device !== null) {
          dispatch(addBLE(device));
        }
      });
    } else {
      //TODO: here we could treat any new state or new thing when there's no permission to BLE
      console.log('Error permission');
    }
  };
};

export const connectDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(changeStatus("Connecting"));
    DeviceManager.stopDeviceScan()
    device
      .connect()
      .then((device) => {
        dispatch(changeStatus("Discovering"));
        let allCharacteristics = device.discoverAllServicesAndCharacteristics()
        dispatch(connectedDevice(device));
        return allCharacteristics;
      })
      .then((device) => {
        let services = device.services(device.id);
        return services;
      })
      .then((services) => {
          console.log("found services: ", services)
          //dispatch(connectedDeviceServices(services));
        }, (error) => {
          console.log(this._logError("SCAN", error));
        })

  }
}

function str2ab(str) {
  console.log("string to send: ", str)
  var bufView = new Uint8Array(str.length);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

export const writeCharacteristic = (text) => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    let buffer = str2ab(text)
    let packetsize = 20;
    let offset = 0;
    let packetlength = packetsize;
    do {
      if (offset + packetsize > buffer.length) {
        packetlength = buffer.length;
      } else {
        packetlength = offset + packetsize;
      }
      let packet = buffer.slice(offset, packetlength);
      console.log("packet: ", packet)
      let base64packet = Base64.btoa(String.fromCharCode.apply(null, packet));
      state.BLEs.connectedDevice.writeCharacteristicWithoutResponseForService('0000FFE0-0000-1000-8000-00805F9B34FB', '0000FFE1-0000-1000-8000-00805F9B34FB', base64packet)
      offset += packetsize;
    } while (offset < buffer.length)
  }
}

export const stopConnection = () => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    state.BLEs.connectedDevice.cancelConnection()
  }
}