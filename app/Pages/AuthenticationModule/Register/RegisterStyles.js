const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;
let IS_SCREEN_SEIZE_SMALL = false
if (SCREEN_HEIGHT <= 568) {
  IS_SCREEN_SEIZE_SMALL = true
} else {
  IS_SCREEN_SEIZE_SMALL = false
}

export default StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 25,
  },
  inputContainer:{
    width: width-60,
    alignSelf:'center',
  },
  phCodeCont:{
    flexDirection:'column',
    marginLeft:15,
  },
  inputContainerHalf:{
    //marginTop:45,
    marginRight:15,
    width: width/2,//(width-(width/3))-70,
    alignSelf:'center',
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
  headerText: {
    padding: 10,
    fontSize: 17,
    color: 'white',
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
  backAvatar: {
    tintColor: Colors.WHITE,
    width: 25,
    height: 25,
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
    marginBottom: 25,
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
    marginTop: IS_SCREEN_SEIZE_SMALL ? 20 : 30,
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
