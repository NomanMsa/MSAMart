import {Colors} from '@theme';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  WebContainer: {
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
  },
  pageContainer:{backgroundColor:Colors.WHITE, height:'100%'},
  lottie: {
    height: 100,
    width: 100,
  },
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
});
