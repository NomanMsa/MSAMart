const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  scrollView: {
    width:'100%',
    //height:height-70,
    backgroundColor: Colors.WHITE,
    paddingTop:20,
    //paddingBottom:20,
    marginBottom:30,
  },

  pageContainer:{backgroundColor:Colors.WHITE, height:height},
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
    width:20,
    height:20,
  },
  loginHeaderTextContainer: {
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 10,
  },
  headerText:{
    fontSize:20,
    color:Colors.WHITE,
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
  textFlow :{
    marginTop: 8,
    fontWeight: 'normal',
    fontFamily: 'verdana',
  },
  signin_container:{
    //marginTop:50,
    width:width-30,
    //paddingBottom:50,
    marginBottom:70,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:Colors.MORE_ORANGE,
  },
  inputStyle:{
    paddingLeft:20,
    paddingRight:10,
  },
  forgot_password_text:{
    marginTop:40,
  },
  forgot_password_text_style:{
    color:Colors.PRIMARY,
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
    fontSize:14,
  },
  regLinkCont:{
    flexDirection:'row',
    marginTop:30,
  },
  regTxt1:{
    color:Colors.DARK_GRAY,
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
    fontSize:14,
  },
  regTxt2:{
    marginLeft:5,
    color:Colors.PRIMARY,
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
    fontSize:14,
  },
  link:{
    textDecorationLine:'underline',
  },
  lottie:{
    height:100,
    width:100,
  },
  oDetailsContainer:{
    marginBottom:20,
  },
  header:{
    margin:15,
    marginTop:10,
  },
  headerTxt:{
    fontSize:16,
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
  ////////////////////////////////// Order Details Ends /////////////////////////////////////
  itemContainer:{
    width: width-30,
    alignItems:'center',
    alignSelf:'center',
    margin:15,
    //height:200,
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
      borderWidth:StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  itemHeader:{
    width:width-30,
    padding:20,
    alignItems:'flex-start',
    alignSelf:'flex-start',
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:Colors.ASH,
  },
  itemHeaderTxt:{
    fontSize:16,
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
  itemListText:{
    marginTop:15,
    marginRight : 16,
    marginLeft : 16,
    marginBottom : 8,
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

  itemDetails:{
    width: width-30,
    //padding:15,
    //paddingLeft:25,
    //paddingRight:25,
    alignSelf:'flex-start',
  },
  orderPayContainer:{
    width: width-30,
    alignItems:'center',
    alignSelf:'center',
    margin:15,
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:Colors.WHITE,
    borderRadius:10,
    borderWidth:StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  paymentDetailsContainer:{
    paddingTop:15,
    paddingBottom:15,
    width: width-30,
    alignSelf:'flex-start',
  },
  thread:{
    width: width-60,
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor: Colors.GRAY_TEXT,
  },
  orderContainer:{
    paddingTop:15,
    paddingBottom:15,
    width: width-30,
    alignSelf:'flex-start',
  },
  orderDetailHeader:{
    margin:10,
    marginLeft:25,
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
    fontSize:14,
  },
  itemFooter:{
    width: width-30,
    padding:8,
    alignItems:'flex-end',
    alignSelf:'center',
    justifyContent:'center',
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor:Colors.GRAY_TEXT,
  },
  itemFooterTxt:{
    margin:5,
    color:Colors.GRAY_TEXT,
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
    fontSize:14,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  detailBlock: {
  paddingTop:10,
  paddingBottom:10,
  paddingLeft:15,
  //paddingRight:25,
    width: '50%' // is 50% of container width
  },
  detailHeaderTxt:{
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
  detailTxt:{
  //fontSize:18,
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
  },


//--------------------shippment Delivery Flow---------------
mainView : {
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center', 
  alignSelf: 'center'
},

subView:{
  flex: 1, 
  flexDirection: 'row', 
  alignItems: 'flex-end', 
  alignSelf: 'flex-end', 
  margin: 10
},

yellowBar : {
  backgroundColor: '#ffc107', 
  flexDirection: 'column', 
  height: 5, 
  width: '65%'
},

GreyBar : {
  backgroundColor: '#949CA9', 
  flexDirection: 'column', 
  height: 5, 
  width: '25%'
},

completeYellowBar : {
  backgroundColor: '#ffc107', 
  borderRadius: 10, 
  flexDirection: 'column', 
  height: 5, 
  width: '90%'
},

PSDMainContainerView : {
  flexDirection: 'row',
  justifyContent : 'space-between',
  zIndex : 1, 
  marginTop : -55
},

PSDImageView:{
  height: 50, 
  width: 50, 
  borderRadius: 50 / 2
},

outerImage : {
  flexDirection: 'row', 
  margin: 20
}

});

