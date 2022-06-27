import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  ToastAndroid,
  Linking,
  Keyboard,
} from 'react-native';
import {addToCart, removeToCart} from './src/Store/Action/addToCart';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';

class Stationary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
      refreshing: false,
      list: [],
      masterList: [],
      seed: 1,
      textInputText: '',
      textInputText1: '',
      searchBarFocused: false,
    };
  }
  searchFlter = text => {
    const {list, masterList} = this.state;
    if (text) {
      const filterArray = masterList.filter((item, i) => {
        const itemData = item.Title
          ? item.Title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({list: filterArray});
    } else {
      this.setState({list: masterList});
    }
  };

  KeyboardDidShow = () => {
    this.setState({searchBarFocused: true});
  };
  KeyboardDidlHide = () => {
    this.setState({searchBarFocused: false});
  };
  keyboardWillShow = () => {
    this.setState({searchBarFocused: true});
  };
  KeyboardWillHide = () => {
    this.setState({searchBarFocused: false});
  };
  componentDidMount() {
    this.KeyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.KeyboardDidShow,
    );
    this.KeyboardDidlHide = Keyboard.addListener(
      'KeyboardDidlHide',
      this.KeyboardDidlHide,
    );

    this.KeyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.KeyboardWillHide = Keyboard.addListener(
      'KeyboardWillHide',
      this.KeyboardWillHide,
    );

    this.makeRemoteRequest();
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }
  makeRemoteRequest = () => {
    this.setState({refreshing: true});
    var newArray = [];

    firestore()
      .collection('Stationary')
      .get()
      .then(querySnapshot => {
        console.log('Total Stationary: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({list: newArray, masterList: newArray});
        this.setState({refreshing: false});
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRefresh = () => {
    this.setState(
      {page: 1, refreshing: true, seed: this.state.seed + 1},
      () => {
        this.makeRemoteRequest();
      },
    );
  };

  onPress = id => {
    this.setState({colorId: id});
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  renderHeader = ({item, index}) => {
    return (
      <View
        style={{
          paddingHorizontal: '5%',
          width: Dimensions.get('window').width,
        }}>
        <View style={styles.threeBtns}>
          <Animatable.View
            style={styles.cartBtnBlue}
            animation={
              this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'
            }
            style={styles.cartBtnBlue}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.searchBarFocused) {
                  this.props.navigation.navigate('Stationary');
                } else {
                  this.props.navigation.toggleDrawer();
                }
              }}>
              <Ionicons
                name={this.state.searchBarFocused ? 'arrow-back' : 'menu'}
                size={22}
                color={'#0062AB'}
              />
            </TouchableOpacity>
          </Animatable.View>
          <View style={styles.sectionStyle}>
            <Image
              source={require('./asserts/searchh.png')}
              style={styles.imageStyle}
            />
            <TextInput
              onChangeText={text =>
                this.setState({textInputText1: text}, this.searchFlter(text))
              }
              style={{flex: 1}}
              placeholder="Search Stationary"
              underlineColorAndroid="transparent"
            />
          </View>
          {/* <View style={styles.AllBtnContainer}>
            <TextInput
              placeholder="Search Stationary"
              value={this.state.textInputText1}
              style={styles.input}
              onChangeText={text =>
                this.setState({textInputText1: text}, this.searchFlter(text))
              }
            />
          </View> */}
          <TouchableOpacity
            style={styles.cartBtnBlue}
            onPress={() => {
              this.onPress(1), this.props.navigation.navigate('Cart');
            }}>
            <Ionicons name="cart-sharp" size={22} color={'#0062AB'} />
            {this.props.reducer.length > 0 ? (
              <Text
                style={[
                  styles.topLinksTxtColorChangeTop,
                  {fontWeight: '500', fontSize: 12, marginTop: '-27%'},
                ]}>
                {this.props.reducer.length}
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <Text
          style={{
            marginTop: '7%',
            color: 'black',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          Stationary
        </Text>
      </View>
    );
  };

  renderStationary = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: '5%',
          width: '50%',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: '5%',
            marginBottom: '4%',
            width: 120,
          }}>
          <Image
            style={{
              width: 120,
              height: 150,
            }}
            source={{uri: item.Img}}
          />
        </View>

        <Text
          style={{
            fontSize: 15,
            marginTop: 5,
            color: 'black',
            fontWeight: '600',
          }}>
          {item.Title}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 14,
            marginBottom: '2%',
          }}>
          {item.Category}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              marginBottom: '2%',
              fontWeight: '500',
            }}>
            ${item.Price}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
              marginLeft: '3%',
              marginBottom: '2%',
              fontWeight: '500',
            }}>
            {item.PriceBefore}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.loginBtn,
            {
              width: '50%',
              height: 30,
              marginTop: '5%',
              borderRadius: 3,
            },
          ]}
          onPress={() => {
            this.props.addItemToCart(item);
            ToastAndroid.show(
              `${item.Title} Added To Cart 🛒 `,
              ToastAndroid.BOTTOM,
            );
          }}>
          <Text
            style={[
              styles.topLinksTxtColorChange,
              {fontWeight: '500', fontSize: 12, marginLeft: '4%'},
            ]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderFooter = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            marginTop: '15%',
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 10}}
            source={{uri: 'https://picsum.photos/700'}}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 310,
              height: 160,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Subscribe To Our Newsletter For Newest
            </Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              Books Updates
            </Text>
            <View style={styles.AllBtnContainer}>
              <TextInput
                value={this.state.textInputText}
                style={{
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  height: 40,
                  // margin: 12,
                  // padding: 10,
                  backgroundColor: '#0062AB',
                }}
                placeholder="Type Your Mail Here"
                placeholderTextColor="white"
                onChangeText={value => this.setState({textInputText: value})}
              />

              <TouchableOpacity
                style={[
                  styles.loginBtnBlue,
                  {
                    borderRadius: 0,
                    width: '18%',
                    height: 30,
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {}}>
                <Text style={{fontSize: 12, fontWeight: '800', color: 'black'}}>
                  Subscribe
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <Image style={styles.logoTwo} source={require('./asserts/logo.png')} />
        <Text style={{paddingHorizontal: '5%', color: 'black', fontSize: 10}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
        <Text style={styles.textLinksBold}>Follow us</Text>
        <View
          style={{
            padding: '5%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="facebook" size={17} color={'#0062AB'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Entypo name="twitter" size={17} color={'#0062AB'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textLinksBold}>Books Categories</Text>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>History</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Cambridge University Press</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Kids</Text>
        </Pressable>
        <Text style={styles.textLinksBold}>Quick Links</Text>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>About</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Books</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Book News</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Contact Us</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>FAQ</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Author List</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>E Books</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>PDF Orders</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            alert('pressed');
          }}>
          <Text style={styles.textLinks}>Stationary</Text>
        </Pressable>
        <Text style={styles.textLinksBold}>Our Store</Text>
        <View style={{paddingHorizontal: '5%'}}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{padding: '5%', marginTop: '9%', width: 150, height: 150}}
            region={{
              latitude: -37.816697014152496,
              longitude: 144.95750269574316,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: -37.816697014152496,
                longitude: 144.95750269574316,
              }}
              title={'SafeHuman'}
              description={'My Location'}
            />
          </MapView>
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute', //use absolute position to show button on top of the map
              top: '22%', //for center align
              left: '8%',
              // alignSelf: 'flex-end', //for align to right
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={[styles.exchangeTxt, {fontSize: 12}]}>London</Text>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://www.google.com/maps/place/London,+UK/@50.184185,0.475184,10z/data=!4m5!3m4!1s0x47d8a00baf21de75:0x52963a5addd52a99!8m2!3d51.5072178!4d-0.1275862?hl=en',
                  );
                }}
                style={{
                  marginTop: '2%',
                  flexDirection: 'row',
                  paddingHorizontal: '5%',
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#6496FB',
                  }}>
                  View larger map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: '5%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <FontAwesome5 name="compass" size={10} color={'black'} />
          </TouchableOpacity>
          <Pressable>
            <Text style={[styles.textLinks, {marginTop: 0}]}>Karachi</Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: '5%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <FontAwesome5 name="compass" size={10} color={'black'} />
          </TouchableOpacity>
          <Pressable>
            <Text style={[styles.textLinks, {marginTop: 0}]}>09007681</Text>
          </Pressable>
        </View>
        <View
          style={{
            padding: '5%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <FontAwesome5 name="compass" size={10} color={'black'} />
          </TouchableOpacity>
          <Pressable>
            <Text style={[styles.textLinks, {marginTop: 0}]}>
              Test@gmail.com
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: '1%',
              color: 'pink',
            }}>
            Copyright @2021 | Designed With by
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: '1%',
              color: '#0062AB',
            }}>
            Book Store Website
          </Text>
        </View>
        <View
          style={{
            padding: 13,
          }}></View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: this.state.searchBarFocused
              ? 'rgba(0,0,0,0)'
              : 'white',
          },
        ]}>
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={this.state.list}
          renderItem={this.renderStationary}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          keyExtractor={item => item.key}
          extraData={this.state.list}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
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
    addItemToCart: product => dispatch(addToCart(product)),
    removeItemFromCart: product => dispatch(removeToCart(product)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Stationary);
const styles = StyleSheet.create({
  sectionStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    height: 44,
    width: '60%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DCDCDC',
  },
  imageStyle: {
    padding: '3%',
    margin: '5%',
    tintColor: 'grey',
    height: 19,
    width: 19,
  },
  textLinks: {
    paddingHorizontal: '5%',
    color: 'black',
    marginTop: '8%',
    fontSize: 10,
  },
  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
  },
  exchangeTxt: {
    paddingHorizontal: '5%',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  london: {
    marginLeft: '1%',
    fontSize: 14,
    marginRight: '4%',
    color: 'black',
  },
  socialIcon: {
    marginRight: '3%',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    borderWidth: 0.5,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoTwo: {
    marginTop: '8%',
    margin: '8%',
    width: 55,
    height: 50,
  },
  MenuBtn: {
    flexDirection: 'row',
    width: '12%',
    height: 28,
    marginRight: '2%',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'pink',
  },

  input: {
    borderWidth: 0.3,
    width: 200,
    height: 35,
    borderRadius: 50,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllBtnContainer: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cartBtn: {
    marginRight: '3%',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBtnBlue: {
    flexDirection: 'row',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  threeBtns: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loginBtn: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopLinksBtns: {
    width: '25%',
    height: 35,
    marginRight: '3%',

    backgroundColor: '#0062AB',
    justifyContent: 'center',
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
  TopLinks: {
    color: 'black',
    fontSize: 14,
  },
  topLinksTxtColorChange: {
    color: 'white',
    fontSize: 14,
  },
  displayNameIcons: {
    width: '14%',
    height: 45,
    marginRight: '3%',
    borderRadius: 8,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  happCustomerContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    paddingHorizontal: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  happCustomerComponents: {
    flexDirection: 'column',
    borderColor: 'grey',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminPanelBtn: {
    width: '30%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#0062AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminPanelBlue: {
    width: '30%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topthreeBtnColor: {
    color: '#0062AB',
    fontSize: 14,
  },
  topthreeBtnColorChange: {
    color: 'white',
    fontSize: 14,
  },
  SerchBtn: {
    width: '12%',
    height: 28,
    borderWidth: 0.5,
    borderColor: 'pink',
    justifyContent: 'center',
    marginRight: '2%',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
  },
});
