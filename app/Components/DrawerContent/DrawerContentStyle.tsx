const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  drawerContent: {
    flex: 1,
    margin: -5,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: Colors.WHITE,
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
    //marginTop: 15,
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
  rightTopIcon2: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignItems: 'center',
    tintColor: Colors.PRIMARY
  },
  socialMediaIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',

    tintColor: Colors.PRIMARY,

  },
  socialMediaDrawerSection: {
    // paddingLeft: 30,
    // paddingRight: 30,
    padding: 10,
    // marginTop: 10,
    // height: 30,
    // flex: 1,
    // borderColor: '#f4f4f4',
    // borderWidth: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',


  },

  dragonIcon: {
    margin: 5,
    marginLeft: 15,
    resizeMode: 'contain',
    height: undefined, width: 100,
    aspectRatio: 350 / 177,
    tintColor: Colors.WHITE,
  },

  socialIconContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  listRowContainer: {
    // backgroundColor: 'transparent',
    flexDirection: 'row',
    // color: Colors.WHITE,
    //justifyContent: 'flex-start',
    margin: 5,
    //width: '100%',
    //shadowColor: Colors.DARK_GRAY_TEXT,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 5,
  },
  listRowIcon: {
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'contain',
    tintColor: Colors.PRIMARY,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  listRowText: {
    marginLeft: 10,
    fontSize: 12,
    ...Platform.select({
      ios: {
        fontWeight: '800',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdanab',
      },
    }),
    alignSelf: 'center',
    color: Colors.PRIMARY,
    alignItems: 'flex-start',
  },
});
