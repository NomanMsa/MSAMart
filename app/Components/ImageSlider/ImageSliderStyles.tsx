const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    height: (width - 120) * 0.50,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImgCont: {
    width: width - 30,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  slideImgBg: {
    width: width - 30,
    alignItems: 'center',
    height: (width - 30) * 0.57,
    backgroundColor: 'transparent',
  },
  slideImg: {
    width: width - 30,
    height: undefined,
    alignItems: 'center',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    borderRadius: 5,
  },
  slideImgOverlay: {
    width: width - 50,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    marginTop: -((width / 2) - 20),
    height: (width / 2) - 20,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
  dotStyle: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.WHITE,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
  },
  activeDotStyle: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.MORE_ORANGE,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
  },
  titleTxt: {
    color: Colors.WHITE,
    fontWeight: 'normal',
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
    fontSize: 20,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  descTxt: {
    color: Colors.WHITE,
    lineHeight: 16,
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdana',
      },
    }),
  },
  btnStyle: {
    marginLeft: 0,
    marginTop: 5,
    borderWidth: 0,
    width: 100,
    height: 30,
    backgroundColor: Colors.WHITE,
  },
  titleStyle: {
    color: Colors.BLACK,
    textTransform: 'none',
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
  },
  maskContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 4,//5
    backgroundColor: 'transparent',
    padding: 15, alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  imgStyles: {
    flex: 1,
    resizeMode: 'contain',
  },
})