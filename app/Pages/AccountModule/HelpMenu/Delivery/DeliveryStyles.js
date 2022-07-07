const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  container: {
    //flex: 1,
    width: width,
    alignSelf: 'center',
  },
  scrollView: {
    width:'100%',
    height:'100%',
    backgroundColor: Colors.WHITE,
//    paddingTop:20,
  //  paddingBottom:20,
    //marginBottom:50,
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
        fontWeight: '400',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdana',
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
    height: 70,
    justifyContent: 'center',
    //alignItems: 'center',
    //flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
  },
  listItemText: {
    //padding: 10,
    width: width / 4 * 3,
    fontSize: 13,
    alignSelf: 'center',
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
  listAnsText: {
    //padding: 10,
    width: width - 60,
    fontSize: 13,
    alignSelf: 'center',
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
  listAnsTextLink: {
    fontSize: 13,
    alignSelf: 'center',
    color: Colors.PRIMARY,
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

  exapndedlistItemText: {
    //padding: 10,
    width: width / 4 * 3,
    fontSize: 15,
    color: Colors.PRIMARY,
    alignSelf: 'center',
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
    /// backgroundColor: Colors.PRIMARY_DARK_BTN,
    tintColor: Colors.WHITE,
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  ArrowAvatar: {
    /// backgroundColor: Colors.PRIMARY_DARK_BTN,
    tintColor: Colors.PRIMARY,
    height: 10,
    width: 10,
    margin: 10,
    resizeMode: 'contain',
    marginTop: 15,
  },
  internalItemContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 80,
    width: width - 30,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: Colors.SILVER,
    paddingLeft: 30,
  },
  ExpandedItemContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    // flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    // height: 80,
    width: width - 30,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: Colors.SILVER,
    paddingLeft: 15,
  },
  normalText: {
    padding: 10,
    //justifyContent: 'center',
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
  AnswernormalText: {
    paddingTop: 10,
    paddingBottom: 10,
    width: width / 4 * 3,
    //justifyContent: 'center',
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
  dropdownStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
  },
  bottomCartIcon: {
    alignSelf: 'center',
    tintColor: Colors.BLACK,
    height: 40,
    width: 40,
    margin: 10,
    resizeMode: 'contain',
    //marginTop: 15,
  },
  BottomCart: {
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    //justifyContent: 'space-between',
    height: 110,
    width: width - 30,
    margin: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: Colors.SILVER,
    paddingLeft: 30,
  },
  helpCenterCart: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: Colors.SILVER,
    alignItems: 'center',
    paddingLeft: 10,
  },

  responceModel: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BG_OVERLAY,
  },
  responceModalContainer: {
    //height: 400,
    width: width - 30,
    backgroundColor: Colors.WHITE,
    padding: 20,
    justifyContent: 'space-between',
  },
  // menuContainerBox: {
  //   backgroundColor: Colors.WHITE,
  //   paddingLeft: 5,
  //   paddingRight: 5,
  //   marginBottom: 140,
  // },
  lottie: {
    height: 100,
    width: 100,
  }
});
