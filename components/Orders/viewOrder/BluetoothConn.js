import React, { Component } from "react";

import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  NativeEventEmitter,
  Switch,
  TouchableOpacity,
  Dimensions,
  ToastAndroid
} from "react-native";
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter
} from "react-native-bluetooth-escpos-printer";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

var { height, width } = Dimensions.get("window");
export default class BluetoothConn extends Component {
  _listeners = [];

  constructor() {
    super();
    this.state = {
      devices: null,
      pairedDs: [],
      foundDs: [],
      bleOpend: false,
      loading: true,
      boundAddress: ""
    };
    this.bluetoothSwitch = this.bluetoothSwitch.bind(this);
  }

  bluetoothSwitch(v) {
    this.setState({
      loading: true
    });
    if (!v) {
      BluetoothManager.disableBluetooth().then(
        () => {
          this.setState({
            bleOpend: false,
            loading: false,
            foundDs: [],
            pairedDs: []
          });
        },
        err => {
          alert(err);
        }
      );
    } else {
      BluetoothManager.enableBluetooth().then(
        r => {
          var paired = [];
          if (r && r.length > 0) {
            for (var i = 0; i < r.length; i++) {
              try {
                paired.push(JSON.parse(r[i]));
              } catch (e) {
                //ignore
              }
            }
          }
          this.setState({
            bleOpend: true,
            loading: false,
            pairedDs: paired
          });
        },
        err => {
          this.setState({
            loading: false
          });
          alert(err);
        }
      );
    }
  }

  async componentDidMount() {
    //alert(BluetoothManager)

    let device = await AsyncStorage.getItem("bluetooth");
    device = await JSON.parse(device);

    if (device) {
      BluetoothManager.connect(device.boundAddress).then(s => {
        this.setState({
          loading: false,
          boundAddress: device.boundAddress,
          name: device.name || "UNKNOWN"
        });
      });
    }

    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        this.setState({
          bleOpend: Boolean(enabled),
          loading: false
        });
      },
      err => {
        err;
      }
    );

    if (Platform.OS === "ios") {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          }
        )
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          }
        )
      );
      this._listeners.push(
        bluetoothManagerEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: "",
              boundAddress: ""
            });
          }
        )
      );
    } else if (Platform.OS === "android") {
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            this._deviceAlreadPaired(rsp);
          }
        )
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            this._deviceFoundEvent(rsp);
          }
        )
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            this.setState({
              name: "",
              boundAddress: ""
            });
          }
        )
      );
      this._listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              "Device Not Support Bluetooth !",
              ToastAndroid.LONG
            );
          }
        )
      );
    }
  }

  componentWillUnmount() {
    //for (let ls in this._listeners) {
    //    this._listeners[ls].remove();
    //}
  }

  _deviceAlreadPaired(rsp) {
    var ds = null;
    if (typeof rsp.devices == "object") {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = this.state.pairedDs;
      pared = pared.concat(ds || []);
      this.setState({
        pairedDs: pared
      });
    }
  }

  _deviceFoundEvent(rsp) {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == "object") {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = this.state.foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function(x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          found.push(r);
          this.setState({
            foundDs: found
          });
        }
      }
    }
  }

  _renderRow(rows) {
    let items = [];
    for (let i in rows) {
      let row = rows[i];
      if (row.address) {
        items.push(
          <TouchableOpacity
            key={new Date().getTime() + i}
            stlye={styles.wtf}
            onPress={() => {
              this.setState({
                loading: true
              });
              BluetoothManager.connect(row.address).then(
                s => {
                  this.setState(
                    {
                      loading: false,
                      boundAddress: row.address,
                      name: row.name || "UNKNOWN"
                    },
                    () => {
                      AsyncStorage.setItem(
                        "bluetooth",
                        JSON.stringify({
                          name: row.name || "UNKNOWN",
                          boundAddress: row.address
                        })
                      );
                    }
                  );
                },
                e => {
                  this.setState({
                    loading: false
                  });
                  alert(e);
                }
              );
            }}
          >
            <Text style={styles.name}>{row.name || "UNKNOWN"}</Text>
            <Text style={styles.address}>{row.address}</Text>
          </TouchableOpacity>
        );
      }
    }
    return items;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Bluetooth</Text>
            <Switch
              value={this.state.bleOpend}
              onValueChange={this.bluetoothSwitch}
            />
          </View>
        </View>
        {this.state.bleOpend ? (
          <>
            <Button
              disabled={this.state.loading || !this.state.bleOpend}
              onPress={() => {
                this._scan();
              }}
              mode="contained"
              style={{ borderRadius: 0 }}
            >
              Press to scan devices
            </Button>

            <Text style={styles.title}>
              Connected:
              <Text style={{ color: this.state.name ? "green" : "red" }}>
                {!this.state.name ? "No Devices" : this.state.name}
              </Text>
            </Text>
            <Text style={styles.title}>
              Found(scroll down and tap to connect):
            </Text>
            {this.state.loading ? <ActivityIndicator animating={true} /> : null}
            <View style={{ flex: 1, flexDirection: "column" }}>
              {this._renderRow(this.state.foundDs)}
            </View>
            <Text style={styles.title}>Paired:</Text>
            {this.state.loading ? <ActivityIndicator animating={true} /> : null}
            <View style={{ flex: 1, flexDirection: "column" }}>
              {this._renderRow(this.state.pairedDs)}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            />
          </>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text>Please activate bluetooth to print !</Text>
          </View>
        )}
      </ScrollView>
    );
  }

  _selfTest() {
    this.setState(
      {
        loading: true
      },
      () => {
        BluetoothEscposPrinter.selfTest(() => {});

        this.setState({
          loading: false
        });
      }
    );
  }

  _scan() {
    this.setState({
      loading: true
    });
    BluetoothManager.scanDevices().then(
      s => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = this.state.foundDs;
        if (found && found.length) {
          fds = found;
        }
        this.setState({
          foundDs: fds,
          loading: false
        });
      },
      er => {
        this.setState({
          loading: false
        });
        alert("error" + JSON.stringify(er));
      }
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  title: {
    width: width,
    backgroundColor: "#eee",
    color: "#232323",
    paddingLeft: 8,
    paddingVertical: 4,
    textAlign: "left"
  },
  wtf: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    flex: 1,
    textAlign: "left"
  },
  address: {
    flex: 1,
    textAlign: "right"
  }
});
