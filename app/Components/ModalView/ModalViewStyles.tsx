const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  overlay: {
	height:height,
	width:width,
	padding:20,
    justifyContent: 'center',
    alignItems: 'center',
	backgroundColor: Colors.BG_OVERLAY,
  },
  centeredView: {
    flex: 1,
	height:height-40,
	width:width-40,
	padding:10,
	margin:20,
    justifyContent: 'center',
    alignItems: 'center',
	backgroundColor:Colors.WHITE,
    marginTop: 0,
	borderColor:Colors.SILVER,
	borderWidth:StyleSheet.hairlineWidth,
	borderRadius:10,
    shadowColor: Colors.SILVER,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  titleTextCont:{
	flex:3,
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
  modalTitle:{
    width:'100%',
	alignItems:'center',
	alignSelf:'center',
	justifyContent:'space-between',
	flexDirection:'row',
    padding:10,
  },
  modalTitleText:{
    fontSize:24,
    fontWeight:'bold',
  },
  closeBtn: {
	flex:1 ,
	alignSelf:'flex-end',
	alignItems:'flex-end',
	justifyContent:'center',
	width:50,
	height:50,
  },
  crossIcon:{
    width:25,
    height:25,
  },
})
