import React from 'react';
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
import Slideshow from 'react-native-image-slider-show';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
      showTheThing: true,
      inp: '',
      showText: true,
      textInputText: '',
      colorId: 0,
      refreshing: false,
      list: [],
      SpecialOffers: [],
      recommendBooks: [],
      recommendBooksAll: [],
      seed: 1,
      DATA: [
        {
          key: '1',
          title: 'You are not so smart why you..',
          description: 'example subtitle 1',
          type: 'Normal',
          cartTxt: 'Add to Cart',
          price: '34',
          priceBefor: '20',
        },
        {
          key: '2',
          title: 'Social',
          description: 'example subtitle 1',
          type: 'Normal',
          cartTxt: 'Add to Cart',
          price: '34',
          priceBefor: '20',
        },
        {
          key: '3',
          title: 'You are not so smart why you..',
          description: 'example subtitle 1',
          type: 'Normal',
          cartTxt: 'Add to Cart',
          price: '34',
          priceBefor: '20',
        },
      ],

      comments: [
        {
          key: '1',
          titleCooment:
            'Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur',

          Profilename: 'David',
          designation: 'CTO/Founder',
          img: require('./asserts/profile.png'),
        },
        {
          key: '2',
          titleCooment:
            'Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur',

          Profilename: 'John',
          designation: 'Manager',
          img: require('./asserts/profile.png'),
        },
      ],

      news: [
        {
          key: '1',
          imgProfile: require('./asserts/profile.png'),
          authorName: 'Mangol Empire',
          uploadDate: '187 Days Ago',
          titleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',

          subTitleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',
          img: require('./asserts/bookImg.png'),
        },
        {
          key: '2',
          imgProfile: require('./asserts/profile.png'),
          authorName: 'Mangol Empire',
          uploadDate: '187 Days Ago',
          titleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',

          subTitleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',
          img: require('./asserts/bookImg.png'),
        },
        {
          key: '3',
          imgProfile: require('./asserts/profile.png'),
          authorName: 'Mangol Empire',
          uploadDate: '187 Days Ago',
          titleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',

          subTitleBook:
            'Tareekh Saltanat e Usmania By Dr Ali Muhammad Al-Salabi Part 3',
          img: require('./asserts/bookImg.png'),
        },
      ],
      position: 1,
      interval: null,
      dataSource: [
        {
          url: 'http://placeimg.com/640/480/book',
        },
        {
          url: 'http://placeimg.com/640/480/any',
        },
        {
          url: 'http://placeimg.com/640/480/any',
        },
      ],
      PromotionData: [
        {
          key: '1',
          title: 'Back to School',
          fiftyOff: 'Special 50% OFF',
          titleSchool: 'Back to School',
          studentComm: 'For Our Student Community',
          subtitlePromo:
            ' Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum Lorem ipsum dolor sit amet consectetur sit ametLorem ipsum Lorem ipsum dolor sit amet consectetur sit ametLorem ipsum',
          url: 'http://placeimg.com/640/480/book',
          cartTxt: 'Get The Deal',
          cartTxtTwo: 'See Other Promos',
        },
        {
          key: '2',
          title: 'Back to School',
          fiftyOff: 'Special 50% OFF',
          titleSchool: 'Back to School',
          studentComm: 'For Our Student Community',
          subtitlePromo:
            ' Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum Lorem ipsum dolor sit amet consectetur sit ametLorem ipsum Lorem ipsum dolor sit amet consectetur sit ametLorem ipsum',
          url: 'http://placeimg.com/640/480/book',
          cartTxt: 'Get The Deal',
          cartTxtTwo: 'See Other Promos',
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  }

  componentDidMount() {
    clearInterval(this.state.interval);
  }
  onPress = id => {
    this.setState({colorId: id});
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    this.makeRemoteRequest();
    this.SpecialOffers();
    this.RecoomendAll();
    this.Recoomend();

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 2000);
  }
  makeRemoteRequest = () => {
    this.setState({refreshing: true});
    var newArray = [];

    firestore()
      .collection('SaleBooks')
      .get()
      .then(querySnapshot => {
        console.log('Total Salebooks: ', querySnapshot.size);
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

  SpecialOffers = () => {
    var newArray = [];

    firestore()
      .collection('SpecialOffers')
      .get()
      .then(querySnapshot => {
        console.log('Total Salebooks: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({SpecialOffers: newArray});
      })
      .catch(error => {
        console.log(error);
      });
  };

  RecoomendAll = () => {
    var newArray = [];

    firestore()
      .collection('RecoomendBooksAll')
      .get()
      .then(querySnapshot => {
        console.log('Total reccomendAll: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({recommendBooksAll: newArray});
      })
      .catch(error => {
        console.log(error);
      });
  };

  Recoomend = () => {
    var newArray = [];

    firestore()
      .collection('RecommendBooks')
      .get()
      .then(querySnapshot => {
        console.log('Total reccomend: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        this.setState({recommendBooks: newArray});
      })
      .catch(error => {
        console.log(error);
      });
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

  renderSaleBook = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.actionOnRow(item);
        }}
        style={{
          width: Dimensions.get('window').width,
        }}>
        <View
          style={{
            marginTop: '5%',
            marginBottom: '4%',
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginTop: '3%',
              backgroundColor: 'orange',
              width: 40,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '500',
              }}>
              Sale
            </Text>
          </View>
          <Image
            style={{
              width: 120,
              height: 150,
            }}
            source={{uri: item.bookImg}}
          />
        </View>
        <View
          style={{
            paddingHorizontal: '14%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              marginBottom: '1%',
              fontWeight: '500',
            }}>
            {item.bookTitle}
          </Text>
          {/* <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              color: 'black',
              fontWeight: '600',
            }}>
            {item.titleBookSale}
          </Text> */}
          <Text
            style={{
              color: 'grey',
              fontSize: 10,
              marginBottom: '4%',
            }}>
            {item.Category}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: '14%',
            flexDirection: 'row',
          }}>
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
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '800',
              }}>
              {item.price}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: '5%',
                fontSize: 8,
                fontWeight: '500',
              }}>
              {item.priceBefore}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderSpecialOffers = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.actionOnRow(item);
        }}
        style={{
          width: Dimensions.get('window').width,
        }}>
        <View
          style={{
            marginTop: '5%',
            marginBottom: '4%',
            width: Dimensions.get('window').width,
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 120,
              height: 150,
            }}
            source={{uri: item.bookImg}}
          />
        </View>
        <View
          style={{
            paddingHorizontal: '14%',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 12,
              marginBottom: '4%',
              fontWeight: '500',
            }}>
            {item.bookTitle}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 10,
              marginBottom: '4%',
            }}>
            {item.description}
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
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            paddingHorizontal: '14%',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={[
              styles.loginBtn,
              {
                width: '40%',
                height: 30,
                borderRadius: 7,
                flexDirection: 'row',
              },
            ]}
            onPress={() => {
              this.props.increaseCounter();
            }}>
            <Ionicons name="cart-sharp" size={17} color={'white'} />
            <Text
              style={[
                styles.topLinksTxtColorChange,
                {fontWeight: '500', fontSize: 12, marginLeft: '4%'},
              ]}>
              Add to Cart
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '800',
              }}>
              {item.price}
            </Text>
            <Text
              style={{
                color: 'grey',
                marginLeft: '5%',
                fontSize: 8,
                fontWeight: '500',
              }}>
              {item.priceBefore}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderRecoomendBooks = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.actionOnRow('BooksDetail');
        }}
        style={{
          width: 160,
        }}>
        <Image
          style={{
            width: 110,
            height: 90,
          }}
          source={{uri: item.bookImg}}
        />
      </TouchableOpacity>
    );
  };
  renderRecoomendBooksAll = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.actionOnRow('BooksDetail');
        }}
        style={{
          width: 160,
        }}>
        <Image
          style={{
            width: 110,
            height: 90,
          }}
          source={{uri: item.bookImg}}
        />
      </TouchableOpacity>
    );
  };
  renderComments = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{marginTop: '10%', width: Dimensions.get('window').width}}>
        <View
          style={{
            paddingHorizontal: '14%',
          }}>
          <Text
            style={{
              color: 'grey',
              fontSize: 10,
            }}>
            {item.titleCooment}
          </Text>

          <StarRating
            containerStyle={{
              marginTop: '6%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: '1%',
            }}>
            <Image style={{width: 30, height: 30}} source={item.img} />

            <View
              style={{
                marginLeft: 10,
                flexDirection: 'column',
              }}>
              <Text style={{fontSize: 13, color: 'black', fontWeight: '800'}}>
                {item.Profilename}
              </Text>
              <Text style={{fontSize: 10, color: 'grey'}}>
                {item.designation}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  renderNews = ({item, index}) => {
    return (
      <View style={{}}>
        <View
          style={{
            paddingHorizontal: '5%',
            flexDirection: 'row',
            marginTop: '2%',
          }}>
          <Image style={{width: 30, height: 30}} source={item.imgProfile} />

          <View
            style={{
              marginLeft: 10,
              flexDirection: 'column',
            }}>
            <Text style={{fontSize: 12, color: 'black', fontWeight: '800'}}>
              {item.authorName}
            </Text>
            <Text style={{fontSize: 9, color: 'grey'}}>{item.uploadDate}</Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: '5%',
            marginTop: '5%',
          }}>
          <Image
            source={item.img}
            style={{
              width: 310,
              height: 115,
            }}
          />
        </View>
        <View
          style={{
            marginTop: '3%',
            paddingHorizontal: '5%',
            flexDirection: 'column',
          }}>
          <Text style={{fontSize: 9, color: 'black', fontWeight: '800'}}>
            {item.titleBook}
          </Text>
          <Text style={{fontSize: 9, color: 'grey'}}>{item.subTitleBook}</Text>
        </View>
      </View>
    );
  };
  renderpromoData = ({item, index}) => {
    return (
      <View
        style={{
          marginBottom: '8%',
          marginTop: '5%',
          alignItems: 'center',
          justifyContent: 'center',
          width: Dimensions.get('window').width,
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 10}}
          source={{uri: 'https://picsum.photos/700'}}
          style={{
            paddingHorizontal: '5%',
            width: 345,
            height: 260,
          }}>
          <Text
            style={{
              marginTop: '10%',
              color: 'black',
              fontWeight: '400',
              fontSize: 15,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: 'black',
              marginBottom: '3%',
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            {item.fiftyOff}
          </Text>
          <Text
            style={{
              color: 'black',
              marginBottom: '3%',
              fontWeight: '600',
              fontSize: 15,
            }}>
            {item.studentComm}
          </Text>
          <Text
            style={{
              color: 'black',
              marginBottom: '3%',
              fontWeight: '400',

              fontSize: 9,
            }}>
            {item.subtitlePromo}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={[
                styles.loginBtn,
                {
                  width: '40%',
                  height: 30,
                  borderRadius: 7,
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                },
              ]}
              onPress={() => {}}>
              <Text
                style={[
                  styles.topLinksTxtColorChange,
                  {fontWeight: '500', fontSize: 12},
                ]}>
                {item.cartTxt}
              </Text>
              <FontAwesome name="long-arrow-right" size={12} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.loginBtn,
                {
                  width: '40%',
                  height: 30,
                  borderRadius: 7,
                },
              ]}
              onPress={() => {}}>
              <Text
                style={[
                  styles.topLinksTxtColorChange,
                  {fontWeight: '500', fontSize: 12},
                ]}>
                {item.cartTxtTwo}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{}}
          contentContainerStyle={
            {
              // paddingBottom: '200%'
            }
          }>
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
              style={styles.cartBtnBlue}
              onPress={() => {
                this.onPress(1), this.props.navigation.navigate('Cart');
              }}>
              <Ionicons name="cart-sharp" size={17} color={'#0062AB'} />
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

          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.state.PromotionData}
              renderItem={this.renderpromoData}
              keyExtractor={item => item.key}
              extraData={this.state.PromotionData}
            />
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              imageStyle={{borderRadius: 10}}
              source={{uri: 'https://picsum.photos/700'}}
              style={{
                paddingHorizontal: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                width: 345,
                height: 260,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '800',

                  fontSize: 14,
                }}>
                Best Seller
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginBottom: '3%',
                  fontWeight: '200',
                  fontSize: 9,
                }}>
                Based Sales this Week
              </Text>
              <Slideshow
                indicatorSize={1}
                containerStyle={{width: 240}}
                height={150}
                dataSource={this.state.dataSource}
                position={this.state.position}
                onPositionChanged={position => this.setState({position})}
              />
            </ImageBackground>
          </View>
          <View
            style={{
              padding: '5%',
            }}>
            <View
              style={{
                marginTop: '5%',
                flexDirection: 'row',
              }}>
              <View style={styles.displayNameIcons}>
                <Ionicons
                  name="thunderstorm-sharp"
                  size={23}
                  color={'#0062AB'}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Demo Text
                </Text>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
            </View>

            <View style={{marginTop: '1%', flexDirection: 'row'}}>
              <View style={styles.displayNameIcons}>
                <MaterialIcons name="privacy-tip" size={23} color={'#0062AB'} />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Display Name
                </Text>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
            </View>

            <View style={{marginTop: '1%', flexDirection: 'row'}}>
              <View style={styles.displayNameIcons}>
                <FontAwesome5 name="thumbs-up" size={23} color={'#0062AB'} />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Display Name
                </Text>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: '1%',
              }}>
              <View style={styles.displayNameIcons}>
                <AntDesign name="star" size={23} color={'#0062AB'} />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                }}>
                <Text
                  style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
                  Display Name
                </Text>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8%',
            }}>
            <ImageBackground
              imageStyle={{borderRadius: 10}}
              source={require('./asserts/banner.png')}
              style={{
                paddingHorizontal: '5%',
                width: 330,
                height: 150,
              }}></ImageBackground>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '8%',
            }}>
            <ImageBackground
              imageStyle={{borderRadius: 10}}
              source={{uri: 'https://picsum.photos/700'}}
              style={{
                paddingHorizontal: '5%',
                width: 345,
                height: 180,
              }}>
              <Text
                style={{
                  color: 'black',
                  marginTop: '3%',
                  fontWeight: '800',
                  fontSize: 14,
                }}>
                Recommded For You All
              </Text>
              <Text style={{color: 'black', fontSize: 9}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
                ab architecto omnis. Esse laborum libero magnam corrupti
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '3%',
                }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.recommendBooksAll}
                  renderItem={this.renderRecoomendBooksAll}
                  keyExtractor={item => item.key}
                  extraData={this.state.recommendBooksAll}
                />
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              imageStyle={{borderRadius: 10}}
              source={{uri: 'https://picsum.photos/700'}}
              style={{
                paddingHorizontal: '5%',
                width: 345,
                height: 180,
              }}>
              <Text
                style={{
                  color: 'black',
                  marginTop: '3%',
                  fontWeight: '800',
                  fontSize: 14,
                }}>
                Recommded For You Only
              </Text>
              <Text style={{color: 'black', fontSize: 9}}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
                ab architecto omnis. Esse laborum libero magnam corrupti
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '3%',
                }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={this.state.recommendBooks}
                  renderItem={this.renderRecoomendBooks}
                  keyExtractor={item => item.key}
                  extraData={this.state.recommendBooks}
                />
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              marginTop: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              SPECIAL OFFERS
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
              }}>
              Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
              }}>
              dolor sit amet, Lorem ipsum dolor sit amet, consectetur
            </Text>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.SpecialOffers}
              renderItem={this.renderSpecialOffers}
              keyExtractor={item => item.key}
              extraData={this.state.SpecialOffers}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
          <Text style={[styles.textLinksBold, {fontSize: 18}]}>
            Book On Sale
          </Text>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.list}
              renderItem={this.renderSaleBook}
              keyExtractor={item => item.key}
              extraData={this.state.list}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '85%',
                paddingBottom: 5,
                paddingHorizontal: '5%',
                backgroundColor: '#F2F0FE',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: '6%',
                }}>
                Featured Books
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    marginTop: '2%',
                    fontSize: 10,
                  }}>
                  Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum
                  dolor sit amet, Lorem ipsum dolor sit amet, consectetur
                </Text>

                <View
                  style={{
                    width: '85%',
                    paddingBottom: 11,
                    backgroundColor: 'white',
                    marginTop: '5%',
                    paddingHorizontal: '5%',
                  }}>
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('BooksDetail');
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
                        source={require('./asserts/book.png')}
                      />
                    </TouchableOpacity>
                    <View style={{}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: '1%',
                        }}>
                        <TouchableOpacity
                          style={
                            this.state.colorId === 1
                              ? styles.cartBtn
                              : styles.cartBtnBlue
                          }
                          onPress={() => {}}>
                          <Ionicons name="save" size={17} color={'#0062AB'} />
                        </TouchableOpacity>
                        <View
                          style={{
                            marginTop: 2,
                            flexDirection: 'column',
                          }}>
                          <Text
                            style={{
                              fontSize: 9,
                              marginTop: 5,
                              color: 'black',
                              fontWeight: '700',
                            }}>
                            Still More Party Jokes by Subh...
                          </Text>
                          <Text style={{fontSize: 9, color: 'grey'}}>Kids</Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          color: 'grey',
                          fontSize: 9,
                          marginTop: 30,
                          marginBottom: '4%',
                        }}>
                        Still More Party Jokes by Subhash C
                      </Text>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 12,
                          marginBottom: '2%',
                          fontWeight: '500',
                        }}>
                        Normal
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'space-between',

                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={[
                          styles.loginBtn,
                          {
                            width: 100,
                            height: 30,
                            borderRadius: 7,
                            flexDirection: 'row',
                          },
                        ]}
                        onPress={() => {
                          this.props.increaseCounter();
                        }}>
                        <Ionicons name="cart-sharp" size={17} color={'white'} />
                        <Text
                          style={[
                            styles.topLinksTxtColorChange,
                            {fontWeight: '500', fontSize: 12, marginLeft: '4%'},
                          ]}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>

                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          fontWeight: '800',
                        }}>
                        100
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: '3%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: '3%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: '3%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('BooksDetail');
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
                    source={require('./asserts/book.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Testimonials
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
              }}>
              Our customers love us! Read what they have to say below. Aliquam
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: '5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
              }}>
              thecodeditors justo ligula. Vestibulum nibh erat, pellentesque ut
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 10,
              }}>
              laoreet vitae.
            </Text>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={this.state.comments}
              renderItem={this.renderComments}
              keyExtractor={item => item.key}
              extraData={this.state.comments}
            />
          </View>
          <Text style={[styles.textLinksBold, {fontSize: 18}]}>
            Latest News
          </Text>
          <View
            style={{
              marginTop: '4%',
              width: Dimensions.get('window').width,
              paddingHorizontal: '5%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'black', fontSize: 10}}>
              Lorem ipsum dolor sit amet, consectetur sit ametLorem ipsum dolor
              sit amet, Lorem ipsum dolor sit amet, consectetur
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('News');
              }}
              style={[
                styles.loginBtn,
                {
                  marginRight: 0,
                  justifyContent: 'space-evenly',
                  width: 100,
                  height: 30,
                  borderRadius: 7,
                  flexDirection: 'row',
                },
              ]}>
              <Text
                style={[
                  styles.topLinksTxtColorChange,
                  {fontWeight: '500', fontSize: 12},
                ]}>
                VIEW MORE
              </Text>
              <FontAwesome name="long-arrow-right" size={12} color={'white'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: '10%',
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('./asserts/newPic.png')}
              style={{
                width: 350,
                height: 110,
              }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.textLinks,
              {marginTop: '3%', color: 'black', fontWeight: '900'},
            ]}>
            History of Saljuk's
          </Text>
          <View style={{marginTop: '2%', paddingHorizontal: '5%'}}>
            <Text
              style={{
                color: 'grey',
                fontSize: 10,
              }}>
              The Seljuk dynasty, or Seljuks, also known as Seljuk Turks or
              Seljuk Turkomans, was an Oghuz Turkic Sunni Muslim dynasty that
              gradually became Persianate and contributed to the Turco-Persian
              tradition in the medieval Middle East and Central Asia
            </Text>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.news}
              renderItem={this.renderNews}
              keyExtractor={item => item.key}
              extraData={this.state.news}
            />
          </View>
          <View style={styles.happCustomerContainer}>
            <View
              style={{
                flexDirection: 'column',
                borderColor: 'grey',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="people" size={50} color={'#0062AB'} />
              <Text
                style={{
                  marginTop: '10%',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                9
              </Text>
              <Text style={{marginTop: '5%', color: 'grey', fontSize: 12}}>
                Happy Customers
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderColor: 'grey',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="book" size={50} color={'#0062AB'} />
              <Text
                style={{
                  marginTop: '10%',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                14
              </Text>
              <Text style={{marginTop: '5%', color: 'grey', fontSize: 12}}>
                Books Collection
              </Text>
            </View>
          </View>
          <View style={styles.happCustomerContainer}>
            <View style={styles.happCustomerComponents}>
              <FontAwesome5 name="store" size={50} color={'#0062AB'} />
              <Text
                style={{
                  marginTop: '10%',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                5
              </Text>
              <Text style={{marginTop: '5%', color: 'grey', fontSize: 12}}>
                Our Store
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                borderColor: 'grey',
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="feather" size={50} color={'#0062AB'} />
              <Text
                style={{
                  marginTop: '10%',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 22,
                }}>
                5
              </Text>
              <Text style={{marginTop: '5%', color: 'grey', fontSize: 12}}>
                Famous Writers
              </Text>
            </View>
          </View>
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
function mapStateToProps(state) {
  return {
    reducer: state,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch({type: 'INCREASE_COUNTER'}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartBtnBlue: {
    flexDirection: 'row',
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
  topLinksTxtColorChangeTop: {
    color: '#0062AB',
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
