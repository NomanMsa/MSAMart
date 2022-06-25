import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.WHITE,
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
  detailTxt: {
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
        marginLeft: 18,
        marginTop: 20,
      },
      android: {
        marginLeft: 18,
        margin: 10,
        marginTop:20,
        fontWeight: 'normal',
        fontFamily: 'verdana',
      },
    }),
    color: Colors.GRAY_TEXT,
  },
  errorCommentsTxt: {
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
        marginLeft: 18,
        marginTop: 20,
      },
      android: {
        marginLeft: 18,
        marginBottom:5,
        fontWeight: 'normal',
        fontFamily: 'verdana',
      },
    }),
    color: Colors.RED,
  },
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
  reasonHeaderTxt: {
    fontSize: 18,
    ...Platform.select({
      ios: {
        fontWeight: '800',
        fontFamily: 'verdana',
        marginLeft: 10,
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdanab',
        marginLeft: 15,
      },
    }),
  },
  submitCancelHeader: {
    width: width - 30,
    padding: 20,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.ASH,
  },
  orderCancelHeader: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
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
  dropdownContainer:{
    height:50,
    width: width-60,
    alignSelf:'center',
    borderWidth:1,
    borderColor:Colors.GRAY_TEXT,
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
    flexDirection: 'row',
  },
  dropdownContainerIos:{
    height:50,
    width:'100%',
    borderWidth:1,
    borderColor:Colors.GRAY_TEXT,
    borderRadius:30,
    flexDirection: 'row',
    marginTop:10,
  },
  returnCommentBlock:{
    margin:15,
    padding:5,
		alignSelf:'center',
		marginTop:10,
		width:width-60,
		borderRadius:25,
		borderWidth:1,
		borderColor:Colors.GRAY_TEXT,
  },
  loading: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  iosDropDownContainerStyle:{
    marginHorizontal: 30,
  }
});
