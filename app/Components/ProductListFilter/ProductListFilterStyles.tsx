const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio, Platform} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';
const pickerStyle = {
  inputIOS: {
      color: 'white',
      height:'100%',
      //paddingHorizontal: 10,
      //backgroundColor: 'red',
      //borderRadius: 5,
  },
};
module.exports = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height:60,
    justifyContent: 'space-between',
    borderWidth:0,
    alignItems:'center',
    alignSelf:'center',
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.LIGHT_GRAY,
    elevation: 15,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        borderWidth:1,
        borderColor:Colors.LIGHT_GRAY,
      },
      android: {
      },
    }),
  },
  dropDownContainer: {
    flex:11,
    height:60,
    padding:10,
    borderRightWidth: 1,
    flexDirection:'row',
    borderRightColor:Colors.SILVER,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
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
  gridRowToggleContainer: {
    flex:9,
    height:60,
    padding:10,
    borderRightWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    alignSelf:'center',
    borderRightColor:Colors.SILVER,
  },
  filterContainer: {
    flex:4,
    height:60,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
  },

  leftContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
  },
  LastRightContainer: {
    justifyContent: 'center',
    alignItems:'center',
    alignSelf:'center',
  },

  dropDown: {
    width: 150,
    zIndex: 5000,
  },

  LastRightCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
    left: 10,
    bottom: 10,
    alignItems: 'center',
    alignSelf:'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  },
  LastRightCountText: {
    color: 'white',
    fontSize: 10,
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

  LastRightCountImage: {
    height: 20,
    width: 20,
  },
  imgStyle:{
    height:20,
    width:20,
  },
  pickerStyle:{
    width:((width/12)*5) - 6,
  },
  ddLabelStyle:{
    marginLeft:8, 
    fontSize:14, 
    color:Colors.GRAY_TEXT, 
    alignItems:'center', 
    alignSelf:'center', 
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
  dropdownContainerIos:{

    width:'100%',
    height:50,
    // width: width-60,
    // alignSelf:'flex-start',
    // alignItems:'flex-start',
    // borderWidth:1,
    // borderColor:Colors.BLACK,
    // borderRadius:30,
    // flexDirection: 'row',
    // justifyContent:'center',
    // marginTop:10,
    // paddingTop:10,
    //backgroundColor :Colors.MORE_ORANGE,
  },
  // dropdownIosInput:{
  //   ...pickerStyle,
  // },
  dropdownContainer:{
    width:'100%',
    // height:50,
    // width: width-60,
    // alignSelf:'center',
    // borderWidth:1,
    // borderColor:Colors.BLACK,
    // borderRadius:30,
    // flexDirection: 'row',
    // justifyContent:'center',
    // marginTop:10,
  },
});