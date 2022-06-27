import React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Button,
  ToastAndroid,
  AlertIOS,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

class Cart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postTime: firestore.Timestamp.fromDate(new Date()),
    };
  }

  addToFirestore = async () => {
    firestore()
      .collection('cartItems')
      .add({
        items: this.props.reducer,
        orderTime: this.state.postTime,
      })
      .then(() => {
        this.bs.current.snapTo(1);
      })
      .then(() => {
        if (Platform.OS === 'android') {
          ToastAndroid.show('Succesfully Placed', ToastAndroid.SHORT);
        } else {
          AlertIOS.alert('Succesfully Placed');
        }
      })
      .then(() => {
        setTimeout(() => {
          this.props.navigation.navigate('Animation');
        }, 20);
      })
      .then(() => {
        setTimeout(() => {
          this.setState({reducer: (this.props.reducer.length = 0)});
        }, 300);
      })

      .catch(error => {
        console.log(error);
      });
  };

  renderContent = () => {
    const items = this.props.reducer;
    const total = items
      .map(item => Number(item.Price.replace('$', '')))
      .reduce((prev, curr) => prev + curr, 0);
    const TotalUSD = total.toFixed(2);
    // const TotalUSD = total.toLocaleString('en', {
    //   style: 'currency',
    //   currency: 'USD',
    // });
    console.log(TotalUSD);

    return (
      <SafeAreaView style={{height: 400, backgroundColor: 'white'}}>
        <Text style={styles.exploreHeader}>Order </Text>
        <View style={styles.exploreContent}>
          <View
            style={{
              alignItems: 'center',
              width: Dimensions.get('window').width,
            }}>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'space-between',
                paddingHorizontal: '10%',
                width: Dimensions.get('window').width,
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 15,
                  },
                ]}>
                Total Items
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 15,
                  },
                ]}>
                {this.props.reducer.length}
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'space-between',
                paddingHorizontal: '10%',
                width: Dimensions.get('window').width,
                flexDirection: 'row',
                paddingBottom: 20,
              }}>
              <Text style={styles.title}>Total</Text>
              <Text style={styles.title}>${TotalUSD}</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.addToFirestore()}
              style={[
                styles.loginBtn,
                {
                  marginTop: 15,
                  backgroundColor: 'black',
                },
              ]}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: 'white',
                }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  renderList = reducer => {
    this.bs = React.createRef();
    this.fall = new Animated.Value(1);
    return this.props.reducer.map(item => {
      return (
        <TouchableOpacity
          key={item.key}
          onPress={() => {}}
          style={{
            alignSelf: 'center',
            backgroundColor: 'pink',
            marginTop: 27,
            flexDirection: 'row',
            width: '90%',
            borderRadius: 5,
            elevation: 8,
          }}>
          <Image
            resizeMode="contain"
            style={{width: 90, height: 80}}
            source={{uri: item.Img}}
          />
          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '700',
              }}>
              {item.Title}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginBottom: '1%',
              }}>
              ${item.Price}
            </Text>
            <View
              style={{
                marginRight: 105,
                paddingHorizontal: '5%',
                height: 30,
                borderWidth: 0.5,
                borderRadius: 20,
                borderColor: 'grey',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {}}
                style={[
                  styles.plusBtn,
                  {
                    backgroundColor: 'white',
                  },
                ]}>
                <Text style={{fontSize: 15, color: 'black'}}>-</Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  marginLeft: '2.5%',
                  marginRight: '2.5%',
                  color: 'black',
                }}>
                {this.props.reducer.length}
              </Text>

              <TouchableOpacity
                style={[styles.plusBtn, {backgroundColor: 'white'}]}
                onPress={() => {}}>
                <Text style={{color: 'black', fontSize: 15}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{marginTop: 43}}
            onPress={() => {
              this.props.removeItemFromCart(item);
            }}>
            <AntDesign name="delete" size={27} color={'maroon'} />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    });
  };

  render() {
    const items = this.props.reducer;
    const total = items
      .map(item => Number(item.Price.replace('$', '')))
      .reduce((prev, curr) => prev + curr, 0);
    const TotalUSD = total.toFixed(2);
    // const TotalUSD = total.toLocaleString('en', {
    //   style: 'currency',
    //   currency: 'USD',
    // });
    console.log(TotalUSD);

    return (
      <SafeAreaView style={{flex: 1}}>
        <Text
          style={[
            styles.textLinksBold,
            {alignSelf: 'center', marginBottom: 20, fontSize: 24},
          ]}>
          Shopping Bag
        </Text>
        {this.props.reducer < 1 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 500,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicons name="cart-sharp" size={50} color={'black'} />
              <Text style={styles.title}> Shopping bag is empty</Text>
            </View>
          </View>
        ) : (
          <View>
            {this.renderList()}
            <View
              style={{
                alignItems: 'center',
                width: Dimensions.get('window').width,
              }}>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: '10%',
                  width: Dimensions.get('window').width,
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 15,
                    },
                  ]}>
                  Total Items
                </Text>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 15,
                    },
                  ]}>
                  {this.props.reducer.length}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: '10%',
                  width: Dimensions.get('window').width,
                  flexDirection: 'row',
                  paddingBottom: 20,
                }}>
                <Text style={styles.title}>Total</Text>
                <Text style={styles.title}>${TotalUSD}</Text>
              </View>
              <View
                style={{
                  alignSelf: 'center',
                  width: '90%',
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.5,
                }}
              />
              <TouchableOpacity
                onPress={() => this.bs.current.snapTo(0)}
                style={[
                  styles.loginBtn,
                  {
                    marginTop: 15,
                    backgroundColor: '#FB5B64',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'white',
                  }}>
                  Confirm Order
                </Text>
                <Ionicons name="cart-sharp" size={28} color={'white'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <BottomSheet
          ref={this.bs}
          snapPoints={[330, 0]}
          renderContent={this.renderContent}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
          borderRadius={50}
        />
      </SafeAreaView>
    );
  }
}
function mapStateToProps(state) {
  return {reducer: state};
}
function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: product => dispatch({type: 'ADD_TO_CART', payload: product}),
    removeItemFromCart: product =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
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

  loginBtnBlue: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {fontWeight: '600', color: 'black', fontSize: 25},
  Modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '110%',
    backgroundColor: 'white',
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  exploreHeader: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  exploreContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
