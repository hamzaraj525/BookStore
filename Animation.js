import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';

class Animation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {showText: true};
  }
  componentDidMount() {
    interval = setInterval(() => {
      this.setState({showText: !this.state.showText});
    }, 1000);
    return () => clearInterval(interval);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.MenuBtn}>
            <Text
              style={[
                styles.textHeader,

                // {display: this.state.showText ? 'none' : 'flex'},
              ]}>
              Thanks For Shopping Here
            </Text>
          </View>

          <LottieView
            style={{
              alignSelf: 'center',

              width: Dimensions.get('window').width,
              height: 400,
              marginTop: 20,
              marginBottom: 20,
            }}
            source={require('./bookR.json')}
            autoPlay
            loop={true}
          />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
            style={[
              styles.loginBtn,
              {
                marginTop: 15,
                backgroundColor: '#FB5B64',
              },
            ]}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                color: 'white',
              }}>
              Shop More
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {reducer: state};
}

export default connect(mapStateToProps, null)(Animation);
const styles = StyleSheet.create({
  MenuBtn: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  loginBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: '50%',
    height: 45,
    marginRight: '3%',
    borderRadius: 20,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {flex: 1, flexDirection: 'column'},

  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
  },

  textHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 26,
  },
});
