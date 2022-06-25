import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
    //paddingTop:20,
    paddingBottom: 20,
  },
  lottie: {
    height: 100,
    width: 100,
  },
  oDetailsContainer: {

  },
  header: {
    margin: 15,
  },
  headerTxt: {
    fontSize: 16,
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
  orderDetailsContainer: {
    width: width - 30,
    alignItems: 'center',
    alignSelf: 'center',
    //padding:15,
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  ////////////////////////////////// Order Details /////////////////////////////////////

  orderBlocks: {
    width: width - 30,
    //padding:15,
    //paddingLeft:25,
    //paddingRight:25,
    alignSelf: 'flex-start',
  },
  orderBlocks2: {
    width: width - 30,
    padding: 15,
    paddingLeft: 25,
    paddingRight: 25,
    alignSelf: 'flex-start',
  },
  orderBlockBorder: {
    //borderTopWidth:StyleSheet.hairlineWidth,
    //borderTopColor: Colors.GRAY_TEXT,
    //borderBottomWidth:StyleSheet.hairlineWidth,
    //borderBottomColor: Colors.GRAY_TEXT,
  },
  orderHeaderTxt: {
    fontSize: 18,
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
  orderHeaderTxtPrimary: {
    color: Colors.PRIMARY,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  detailBlock: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    //paddingRight:25,
    width: '50%', // is 50% of container width
  },
  detailBlockRight:{
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    //paddingRight:25,
    width: '50%', // is 50% of container width
    marginLeft : (SCREEN_WIDTH <= 375) ? -16 : null,
  },
  detailHeaderTxt: {
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
  detailTxt: {
    //fontSize:18,
    marginTop: 10,
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
  bottomBox: {
    color: Colors.ASH,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.ASH,
    borderRadius: 5,
    width: '100%',
    height: 80,
  },
  bottomBellImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  bellContainer: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    alignItems: 'center',
    //height:undefined,
    //backgroundColor:Colors.PRIMARY,
  },
  btmTxtContainer: {
    //marginTop:10,
    //marginBottom:10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
  },
  multiSellerText: {
    color: Colors.ASH,
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
  ////////////////////////////////// Order Details Ends /////////////////////////////////////
  itemContainer: {
    width: width - 30,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
    //height:200,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  itemHeader: {
    width: width - 30,
    padding: 20,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.ASH,
  },
  itemHeaderTxt: {
    fontSize: 18,
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
  itemDetails: {
    width: width - 30,
    //padding:15,
    //paddingLeft:25,
    //paddingRight:25,
    alignSelf: 'flex-start',
  },
  orderPayContainer: {
    width: width - 30,
    alignItems: 'center',
    alignSelf: 'center',
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY_TEXT,
  },
  paymentDetailsContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    width: width - 30,
    alignSelf: 'flex-start',
  },
  thread: {
    width: width - 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.GRAY_TEXT,
  },
  orderContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    width: width - 30,
    alignSelf: 'flex-start',
  },
  orderDetailHeader: {
    margin: 10,
    marginLeft: 25,
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
    fontSize: 14,
  },
  orderCancelHeader: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    margin: 10,
    marginLeft: 25,
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
    fontSize: 14,
  },
  itemFooter: {
    width: width - 30,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.GRAY_TEXT,
  },
  itemFooterTxt: {
    margin: 5,
    color: Colors.PRIMARY,
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
    fontSize: 14,
  },
  dividerBackground:{
    backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD,
    height: 1,
    width:'100%'
  },
  loading: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
