const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    //backgroundColor: Colors.MORE_ORANGE,
    width: width,
    //height:undefined,
    height: ((width - 30) / 6.4),
    //aspectRatio: width/(width/6.4),
  },
  wrapperMedium: {
    backgroundColor: 'transparent',
    //backgroundColor: Colors.MORE_ORANGE,
    width: width,
    //height:undefined,
    height: ((width - 30) / 3.2),
    //aspectRatio: width/(width/6.4),
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
    borderRadius: 3,
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
    color: Colors.BLACK,
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
    fontSize: 15,
    lineHeight: 15,
    //textTransform: 'uppercase',
  },
  descTxt: {
    color: Colors.BLACK,
    fontSize: 13,
    lineHeight: 13,
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
  /*titleTxt: {
    color: Colors.BLACK,
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
    fontSize: 18,
    lineHeight: 18,
    //textTransform: 'uppercase',
  },
  descTxt: {
    color: Colors.BLACK,
    fontSize: 14,
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
  },*/
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
    width: width - 30,
    backgroundColor: Colors.MORE_ORANGE,
    padding: 10, alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    aspectRatio: width / (width / 6.4),
    borderRadius: 3,
  },
  imageContainer: {
    width: width - 30,
    //backgroundColor: Colors.MORE_ORANGE,
    padding: 10, alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    aspectRatio: width / (width / 6.4),
    borderRadius: 3,
  },
  textContainerMedium: {
    width: width - 30,
    backgroundColor: Colors.MORE_ORANGE,
    padding: 10, alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    aspectRatio: width / (width / 3.2),
    borderRadius: 3,
  },
  imageContainerMedium: {
    width: width - 30,
    //backgroundColor: Colors.MORE_ORANGE,
    padding: 10, alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    aspectRatio: width / (width / 3.2),
    borderRadius: 3,
  },
  imgStyles: {
    flex: 1,
    resizeMode: 'contain',
  },
})