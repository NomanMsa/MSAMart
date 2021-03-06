const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.WHITE,
    // paddingTop: 20,
    // paddingBottom: 20,
    // marginBottom: 70,
  },
  container: {
    //flex: 1,
    width: width,
    alignSelf: 'center',
  },
  internalItemContainer: {
    paddingLeft: 5,
  },
  normalText: {
    padding: 10,
    fontSize: 13,
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
  TitleText: {
    padding: 10,
    fontSize: 15,
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
  HyperlinkText: {
    padding: 10,
    fontSize: 13,
    color: Colors.DODGER_BLUE,
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
  Pointed: {
    // paddingLeft: 35,
    padding: 5,
    fontSize: 13,

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

  PointedNormalText: {
    padding: 5,
    fontSize: 12,
    //marginRight: 10,
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
  pageContainer: { backgroundColor: Colors.WHITE, height: height },
  headerContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
  },
  // headerText: {
  //   padding: 10,
  //   fontSize: 17,
  //   color: 'white',
  //   ...Platform.select({
  //     ios: {
  //       fontWeight: '800',
  //       fontFamily: 'verdana',
  //     },
  //     android: {
  //       fontWeight: 'normal',
  //       fontFamily: 'verdanab',
  //     },
  //   }),
  // },
  backAvatar: {
    tintColor: Colors.WHITE,
    width: 20,
    height: 20,
  },
  loginHeaderTextContainer: {
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: Colors.WHITE,
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
  signin_container: {
    //marginTop:50,
    width: width - 30,
    //paddingBottom:50,
    marginBottom: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:Colors.MORE_ORANGE,
  },
  inputStyle: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  forgot_password_text: {
    marginTop: 40,
  },
  forgot_password_text_style: {
    color: Colors.PRIMARY,
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
    fontSize: 14,
  },
  regLinkCont: {
    flexDirection: 'row',
    marginTop: 30,
  },
  regTxt1: {
    color: Colors.DARK_GRAY,
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
    fontSize: 14,
  },
  regTxt2: {
    marginLeft: 5,
    color: Colors.PRIMARY,
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
    fontSize: 14,
  },
  link: {
    textDecorationLine: 'underline',
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
