import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
export function DrawerContent(props) {
  const paperTheme = useTheme();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('./asserts/profile.png')}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Scarlet j </Title>
                <Caption style={styles.caption}>@scarlet_j</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              children={HomeStack}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Entypo name="book" color={color} size={size} />
              )}
              label="Books"
              children={booksStack}
              onPress={() => {
                props.navigation.navigate('booksStack');
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="book" color={color} size={size} />
              )}
              label="Ebook"
              onPress={() => {
                props.navigation.navigate('Ebook');
              }}
            /> */}
            {/* <DrawerItem
              icon={({color, size}) => (
                <Fontisto name="person" color={color} size={size} />
              )}
              label="Author"
              onPress={() => {
                props.navigation.navigate('Author');
              }}
            /> */}
            {/* <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="pdffile1" color={color} size={size} />
              )}
              label="PdfOders"
              onPress={() => {
                props.navigation.navigate('PdfOders');
              }}
            /> */}
            <DrawerItem
              icon={({color, size}) => (
                <Foundation name="page-copy" color={color} size={size} />
              )}
              label="Stationary"
              children={StationaryStack}
              onPress={() => {
                props.navigation.navigate('StationaryStack');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="gift" color={color} size={size} />
              )}
              label="Gifts"
              children={giftStack}
              onPress={() => {
                props.navigation.navigate('giftStack');
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Entypo name="news" color={color} size={size} />
              )}
              label="News"
              onPress={() => {
                props.navigation.navigate('News');
              }}
            /> */}
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="question" color={color} size={size} />
              )}
              label="Faq"
              onPress={() => {
                props.navigation.navigate('Faq');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="infocirlce" color={color} size={size} />
              )}
              label="About"
              onPress={() => {
                props.navigation.navigate('About');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="contacts" color={color} size={size} />
              )}
              label="ContactUs"
              onPress={() => {
                props.navigation.navigate('ContactUs');
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="contacts" color={color} size={size} />
              )}
              label="FirebaseReadDataa"
              onPress={() => {
                props.navigation.navigate('FirebaseReadDataa');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <AntDesign name="contacts" color={color} size={size} />
              )}
              label="FireStore"
              onPress={() => {
                props.navigation.navigate('FireStore');
              }}
            /> */}
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      {/* <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            SignOut();
          }}
        />
      </Drawer.Section> */}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
