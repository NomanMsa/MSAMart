
const React = require('react-native');
const {  Dimensions,  StyleSheet,  PixelRatio} = React;
const {  width,  height} = Dimensions.get('window');
import {  Colors} from '@theme';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
  },
  pageContainer: {
    margin: 15,
    // alignItems:'center',
    // alignSelf:'center',
  },
  lottie: {
    height: 100,
    width: 100,
  },
  headerTextStyle: {
    fontSize: 20,
    // fontWeight: 'bold',
    // marginTop: 10,
    marginLeft: 5,
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'bold',
        fontFamily: 'verdana',
      },
    }),
    color: Colors.BLACK,
    letterSpacing: 0,
  },
  subHeader:{
    marginLeft:5,
    marginTop: 10,
    fontSize: 17,

  },
  dropdownContainer:{
    height:50,
    // width: width-60,
    alignSelf:'center',
    borderWidth:1,
    borderColor:Colors.BLACK,
    borderRadius:30,
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10,
  },
  dropdownContainerInner:{
    width:'100%',
    height:50,
    marginLeft:0,
    width: width-90,
    alignSelf:'center',
    //borderWidth:1,
    //borderColor:Colors.BLACK,
    //borderRadius:30,
    flexDirection: 'row',
    //marginTop:10,
  },
  dropdownContainerIos:{
    height:50,
    width: width-60,
    alignSelf:'flex-start',
    alignItems:'flex-start',
    borderWidth:1,
    borderColor:Colors.BLACK,
    borderRadius:30,
    flexDirection: 'row',
    //justifyContent:'center',
    marginTop:10,
    //paddingTop:10,
  },
  titleStyle:{
    margin:20,
    marginLeft:15,
    marginBottom:-5,
    fontSize:14,
    color:Colors.GRAY_TEXT,
    alignItems:'flex-start',
    alignSelf:'flex-start',
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
  addressCardContainer:{
    width: width-30,
    // alignItems:'center',
    padding:15,
    margin:10,
    flexDirection:'column',
    // justifyContent:'space-between',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
	  borderColor: Colors.GRAY_TEXT,
  } 
});