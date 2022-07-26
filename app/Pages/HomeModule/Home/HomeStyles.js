const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
    paddingBottom: 20,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.WHITE,
  },
  splashImg:{
    resizeMode:'contain',
    width:width,
    height:height,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  PTitle:{
    
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0069d1',
    textAlign:'center',
    fontFamily: 'verdana',
    
  },
  CTitles:{
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0069d1',
    textAlign:'center',
    fontFamily: 'verdana',
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.BLACK,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: "800",
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  lottie: {
    height: 100,
    width: 100,
  },
  userIcon: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    tintColor: Colors.BLACK
  },
  dragonIcon: {
    // margin: 5,
    // marginLeft: 15,
    resizeMode: 'contain',
    height: undefined, width: 100,
    aspectRatio: 350 / 177,
    //backgroundColor:'#fff',
    tintColor: Colors.PRIMARY
  },
  discountInformation:{
    fontSize:16,
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
    fontWeight:'bold',
    margin: 10,
    padding: 10, 
    flex: 1,
    color: Colors.PRIMARY,
    justifyContent: 'center',
  }
});
