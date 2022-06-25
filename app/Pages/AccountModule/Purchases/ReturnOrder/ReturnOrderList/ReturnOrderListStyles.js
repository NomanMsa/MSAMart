import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  container : {
    flex :1,
    backgroundColor : Colors.WHITE
  },
 
  scrollView: {
    backgroundColor: Colors.WHITE,
    paddingBottom: 20,
  },
  
  lottie: {
    height: 100,
    width: 100,
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

  itemDetailsText : {
    marginLeft : 16, 
    marginRight : 16,
    fontSize : 14, 
    marginTop : 8,
    ...Platform.select({
      ios: {
        fontFamily: 'verdana',
      },
      android: {
        fontFamily: 'verdanab',
      },
    }),
  },

  itemHeaderText : {
    marginTop: 24, 
    marginBottom: 24, 
    marginLeft: 16, 
    fontWeight: 'bold', 
    fontSize: 19,
    ...Platform.select({
      ios: {
        fontFamily: 'verdana',
      },
      android: {
        fontFamily: 'verdanab',
      },
    }),
  },

  orderDetailsContainer: {
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

  btnViewDetail : {
    height:40, 
    width:100, 
    marginTop : 16,
    // backgroundColor : 'pink', 
    alignItems: 'flex-start'
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
    width: '50%' // is 50% of container width
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
  },

  btmTxtContainer: {
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

  loading: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
