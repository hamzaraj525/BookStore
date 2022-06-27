import React, {Component} from 'react';
import {Appbar} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {
  View,
  Modal,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  ToastAndroid,
  StyleSheet,
  Button,
  TextInput,
  Image,
  Alert,
} from 'react-native';

export default class bookHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <WebView
        source={{
          uri: 'https://thecodeditors.com/test_bookweb/public/',
        }}
      />
    );
  }
}

// Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1f8e46',
  },
  icon: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textTop: {
    justifyContent: 'center',
    marginLeft: '15%',
    marginTop: '2%',
    fontSize: 14,
  },
  button: {
    borderColor: '#ff9cff',
    width: '21%',
    height: '110%',
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  scheduleBtn: {
    position: 'relative',
    top: '5%',
    marginTop: '5%',
    width: '41%',
    height: '60%',
    borderColor: 'black',
    borderRadius: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  tinyLogo: {
    tintColor: '#1f8e46',
    width: '30%',
    height: '255%',
  },
  helpLogo: {
    tintColor: '#1f8e46',
    width: '40%',
    height: '370%',
  },
  container: {
    flex: 1,
    margin: '6%',
    padding: '4%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
});
