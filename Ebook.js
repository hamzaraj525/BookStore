import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
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
  Linking,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
export default class Ebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3,
      showTheThing: true,
      inp: '',
      showText: true,
      textInputText: '',
      colorId: 0,
      refreshing: false,
      list: [],
      seed: 1,
    };
  }
  componentDidMount() {
    this.makeRemoteRequest();

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }
  makeRemoteRequest = () => {
    this.setState({refreshing: true});
    var newArray = [];

    firestore()
      .collection('Ebooks')
      .get()
      .then(querySnapshot => {
        console.log('Total Ebooks: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({list: newArray});
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
  actionOnRow = item => {
    var BookTitle = item.bookTitle;
    var Price = item.price;
    var PriceBefore = item.priceBefore;
    var CCategory = item.Category;
    var Discount = item.discount;
    var Year = item.year;
    var Publisher = item.publisher;
    var BookDetail = item.bookDetail;
    var image = item.bookImg;

    // alert(Name + '\n' + Gender + '\n' + contact + '\n' + Age);
    this.props.navigation.navigate('BooksDetail', {
      BookTitle,
      CCategory,
      Price,
      PriceBefore,
      Discount,
      Year,
      Publisher,
      BookDetail,
      image,
    });
  };
  renderPdfBooks = ({item, index}) => {
    return (
      <View
        style={{
          marginTop: '5%',
          width: '50%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '45%',
            paddingBottom: 11,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.actionOnRow(item);
            }}
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
              source={{uri: item.bookImg}}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 9,
              marginTop: 5,
              color: 'black',
              fontWeight: '700',
            }}>
            {item.bookTitle}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              marginBottom: '2%',
              fontWeight: '500',
            }}>
            {item.Category}
          </Text>
          <StarRating
            containerStyle={{}}
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            halfStar={'star-half'}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            starSize={15}
          />
        </View>
      </View>
    );
  };

  render() {
    const {list} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{}}
          contentContainerStyle={{}}>
          <View
            style={{
              marginTop: '2%',
              width: Dimensions.get('window').width,
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 100,
                height: 80,
              }}
              source={require('./asserts/logo.png')}
            />
          </View>
          <View style={styles.AllBtnContainer}>
            <TouchableOpacity style={styles.MenuBtn}>
              <Entypo name="menu" size={22} color={'#0062AB'} />
              <Text
                style={{
                  color: '#0062AB',
                  marginRight: 4,
                  marginLeft: 4,
                  fontSize: 14,
                }}>
                All
              </Text>
            </TouchableOpacity>
            <TextInput
              value={this.state.textInputText}
              style={styles.input}
              onChangeText={value => this.setState({textInputText: value})}
            />
            <TouchableOpacity style={styles.SerchBtn}>
              <FontAwesome name="search" size={17} color={'black'} />
            </TouchableOpacity>
          </View>
          <View style={styles.threeBtns}>
            <TouchableOpacity
              style={
                this.state.colorId === 1 ? styles.cartBtn : styles.cartBtnBlue
              }
              onPress={() => {
                this.onPress(1);
              }}>
              <Ionicons
                name="cart-sharp"
                size={17}
                color={this.state.colorId === 1 ? 'white' : '#0062AB'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.colorId === 2 ? styles.loginBtn : styles.loginBtnBlue
              }
              onPress={() => {
                this.onPress(2);
              }}>
              <Text
                style={
                  this.state.colorId === 2
                    ? styles.topthreeBtnColorChange
                    : styles.topthreeBtnColor
                }>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.colorId === 3
                  ? styles.adminPanelBtn
                  : styles.adminPanelBlue
              }
              onPress={() => {
                this.onPress(3);
              }}>
              <Text
                style={
                  this.state.colorId === 3
                    ? styles.topthreeBtnColorChange
                    : styles.topthreeBtnColor
                }>
                Admin Panel
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            data={this.state.list}
            renderItem={this.renderPdfBooks}
            keyExtractor={item => item.key}
            extraData={this.state.list}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />

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
                  <Text
                    style={{fontSize: 12, fontWeight: '800', color: 'black'}}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <Image
            style={styles.logoTwo}
            source={require('./asserts/logo.png')}
          />
          <Text style={{paddingHorizontal: '5%', color: 'black', fontSize: 10}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
    borderWidth: 1,
    width: '40%',
    height: 28,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AllBtnContainer: {
    marginTop: '2%',
    width: Dimensions.get('window').width,
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
    alignItems: 'center',
  },
  cartBtnBlue: {
    marginRight: '3%',
    width: '10%',
    borderRadius: 10,
    width: '10%',
    height: 35,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  threeBtns: {
    marginTop: '4%',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
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
