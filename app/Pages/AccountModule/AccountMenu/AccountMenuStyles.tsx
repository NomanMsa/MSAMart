const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio, Platform} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

export default StyleSheet.create({
  pageContainer:{
    height:height,
    backgroundColor:Colors.WHITE,
  },
  container: {
    flex: 1,
    width: width - 30,
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding:10,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 17,
    justifyContent:'center',
    alignSelf:'center',
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
  },
  listItemContainer: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
  },
  listItemText: {
    padding: 10,
    fontSize: 15,
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
  logoutAvatar: {
    //backgroundColor: Colors.PRIMARY_DARK_BTN,
    tintColor: Colors.PRIMARY,//_DARK_BTN
    height: 25,
    width: 25,
  },
  backBtnIcon: {
    //backgroundColor: Colors.PRIMARY_DARK_BTN,
    height:25,
    width:25,
    alignSelf: 'center',
    tintColor: Colors.WHITE,
  },
});
