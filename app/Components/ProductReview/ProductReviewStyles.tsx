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
  modalTitle:{
    width:'100%',
    padding:10,
  },
  modalView: {
    margin: 20,
    backgroundColor:Colors.WHITE,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
  modalTitleText:{
	alignSelf:'center',
	alignItems:'center',
    fontSize:24,
    fontWeight:'bold',
  },
  crossIcon:{
    width:28,
    height:28,
  },
  Inputbox:{
    padding:20,
  },
  Inputrow:{
    paddingTop:5,
    paddingBottom:5,
  },
  Inputlabel:{
    color: Colors.GRAY_TEXT, 
    paddingBottom:5,
  },
  Textinput:{
    height: 40, 
    borderColor: Colors.DARK_GRAY_TEXT, 
    borderWidth: 1,
    borderRadius:15,
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    color: Colors.GRAY_TEXT, 
  },
  Textarea:{
    height: 100, 
    borderColor: Colors.DARK_GRAY_TEXT, 
    borderWidth: 1,
    borderRadius:15,
    padding:15,
    color: Colors.GRAY_TEXT, 
    textAlignVertical: 'top',
  },
  Inputbtn:{
    flex: 1,
    flexDirection: 'row',
    padding:0,
    justifyContent:'space-between'
  }
})
