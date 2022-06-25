const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio, Platform} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30,
    alignSelf: 'center',
  },
  headerContainer: {
    height: 70,
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 20,
  },
  ItemContainer: {
    paddingLeft: 30,
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
  TitleContainer: {
    backgroundColor: 'silver',
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  titleText: {
    padding: 10,
    fontSize: 17,
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
  logOutText: {
    padding: 10,
    fontSize: 15,
    color: Colors.PRIMARY_DARK_BTN,
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
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    //height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
   // borderBottomWidth: StyleSheet.hairlineWidth,
  //  borderColor: Colors.SILVER,
  },
  listItemText: {
    padding: 10,
    fontSize: 15,
  },
  backAvatar: {
    height:25,
    width:25,
    tintColor: Colors.WHITE,
  },
  
  searchInput: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    borderRadius: 25,
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
  SearchClearAvatar: {
    tintColor: Colors.WHITE,
    height: 7,
    width: 7,
    borderColor: Colors.WHITE,
  },
  searchClearContainer: {
    borderWidth: 1,
    borderColor: Colors.DARK_GRAY_COLOR,
    backgroundColor: Colors.DARK_GRAY_COLOR,
    borderRadius: 10,
    padding: 4,
    marginRight: 10,
    marginLeft: 10,
  },
  internalItemContainer: {
    paddingLeft: 30,
  },
  normalText: {
    padding: 10,
    paddingRight: 2,
    width:width-30,
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
    fontSize:12,
  },
  categoryText: {
    padding:10 ,
    paddingLeft: 2,
    paddingRight: 2,
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
  },
  logoutAvatar: {
    tintColor: Colors.SILVER_DARK_BTN,
    height: 20,
    width: 20,
  },
  searchContainer: {
    backgroundColor: 'white',
    width:width/1.6,
    //flex: 1,
    height:35,
    borderColor: 'gray',
     borderWidth: 1,
   // flexDirection: 'row',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 10,
  },
  searchInputs:{
  height: 35,
  alignItems: 'center',
  alignContent: 'center',
  textAlignVertical:'bottom',
    //flex: 1,
    fontSize:10,
   // marginLeft: 10,
    //borderWidth: 1,
    width:width/1.7,
    // placeholderTextColor: 'gray',
    borderRadius: 25,
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
  viewMoreText:{
    alignSelf: 'center',
    fontSize: 12,
    color: Colors.PRIMARY,
     textDecorationLine: 'underline', 
     marginBottom: 30,
     marginTop:30
    },
    unSelChkBox:{
      height:20,
      width:20,
      borderRadius:5,
      borderWidth:1,
      borderColor:Colors.BLACK, 
      backgroundColor:Colors.WHITE, 
      alignItems:'center', 
      alignSelf:'center',
      justifyContent:'center'
    },
    selChkBox:{
      height:20,
      width:20,
      borderRadius:5,
      borderWidth:1,
      borderColor:Colors.BLACK, 
      backgroundColor:Colors.PRIMARY, 
      alignItems:'center', 
      alignSelf:'center',
      justifyContent:'center'
    },
    disabledChkbox:{
      height:18, 
      width:18, 
      borderRadius:5, 
      borderWidth:1, 
      borderColor:Colors.GRAY_TEXT, 
      backgroundColor:Colors.SILVER,
      alignItems:'center', 
      alignSelf:'center',
      justifyContent:'center'
    },
});
