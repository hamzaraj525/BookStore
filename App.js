import React, {Component} from 'react';
import {NavigationContainer, PaperProvider} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import Home from './Home.js';
import About from './About.js';
import Author from './Author.js';
import Books from './Books.js';
import Ebook from './Ebook.js';
import ContactUs from './ContactUs.js';
import Faq from './Faq.js';
import News from './News.js';
import PdfOders from './PdfOders.js';
import Stationary from './Stationary.js';
import Gifts from './Gifts.js';
import BooksDetail from './BooksDetail.js';
import Cart from './Cart.js';
import FirebaseReadDataa from './FirebaseReadDataa.js';
import FireStore from './FireStore.js';
import Animation from './Animation.js';
import {DrawerContent} from './DrawerContent';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const Stack = createNativeStackNavigator();
const ScreenDrawer = createDrawerNavigator();
import store from './src/Store/store.js';
// const initialState = {counter: 0};

export default class App extends Component {
  render() {
    HomeStack = () => (
      <Stack.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="BooksDetail"
          component={BooksDetail}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Animation"
          component={Animation}
        />
      </Stack.Navigator>
    );
    StationaryStack = () => (
      <Stack.Navigator
        initialRouteName="StationaryStack"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Stationary"
          component={Stationary}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Animation"
          component={Animation}
        />
      </Stack.Navigator>
    );
    giftStack = () => (
      <Stack.Navigator
        initialRouteName="giftStack"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Gifts"
          component={Gifts}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Animation"
          component={Animation}
        />
      </Stack.Navigator>
    );
    booksStack = () => (
      <Stack.Navigator
        initialRouteName="booksStack"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          options={{header: () => null}}
          name="Books"
          component={Books}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="BooksDetail"
          component={BooksDetail}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="Animation"
          component={Animation}
        />
      </Stack.Navigator>
    );

    return (
      <Provider store={store}>
        <NavigationContainer>
          <ScreenDrawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
              headerShown: true,
            }}>
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="HomeStack"
              children={HomeStack}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="booksStack"
              children={booksStack}
            />

            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="StationaryStack"
              children={StationaryStack}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="giftStack"
              children={giftStack}
            />

            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="Faq"
              component={Faq}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="About"
              component={About}
            />
            <ScreenDrawer.Screen
              options={{header: () => null}}
              name="ContactUs"
              component={ContactUs}
            />
          </ScreenDrawer.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
});
