import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  scrollView: {
    height:height,
    //backgroundColor: Colors.WHITE,
    //paddingBottom: 20,
  },
  lottie: {
    height: 100,
    width: 100,
  },
  screenContainer:{
		//alignSelf:'center',
    //height:height,
  },
  screenTitleContainer:{
    margin:15,
  },
  screenTitleBlock:{

  },
  screenTitleText:{
    fontSize:20,
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
  screenTitleTextRed:{
    color:Colors.PRIMARY,
  },
  screenSubTitleBlock:{
    marginTop:20,
    alignItems:'center',
    alignSelf:'center',
  },
  screenSubTitleText:{
    fontSize:13,
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
  returnInputBlock:{
    margin:15,
		alignSelf:'center',
		marginTop:10,
		width:width-30,
		borderRadius:5,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
  },
  screenInputBlock:{
    margin:15,
    alignItems:'center',
    alignSelf:'center',
  },
  screenQuestionText:{
    fontSize:17,
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
  txtSettings:{
    textAlign:'center',
  },
  returnCommentBlock:{
    margin:15,
    padding:5,
		alignSelf:'center',
		marginTop:10,
		width:width-60,
		borderRadius:5,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
  },
  fileUploadBlock:{
    flexDirection:'row',
    margin:15,
    //padding:5,
    height:50,
    justifyContent:'space-between',
		alignSelf:'center',
		marginTop:10,
		width:width-60,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.GRAY_TEXT,
  },
  uploadIcoBlock:{
    height:50,
    width:50,
    margin:-(StyleSheet.hairlineWidth),
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.SECONDAY_COLOR,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:Colors.SECONDAY_COLOR,
  },
  fileNameTxt:{
		width:width-120,
    margin:5,
    textAlignVertical:'center',
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
  uploadFileIcon:{
    height:25,
    width:25,
    tintColor:Colors.WHITE,
  },
  commentContainer:{
    
  },
  titleText:{
   margin:5,
   marginLeft:30,
   marginTop:10,
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
   color:Colors.GRAY_TEXT,
  },
});
