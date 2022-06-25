import { Colors } from '@theme';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { color } from 'react-native-reanimated';

const absoluteStretch = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

module.exports = StyleSheet.create({
  menuContainerBox: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 215,
  },
  headerContainer: {
    backgroundColor: Colors.PRIMARY,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,

  },
  backBtnIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: Colors.WHITE,
  },
  pageStyles: {
    backgroundColor: Colors.WHITE,
    //height: SCREEN_HEIGHT - 70,
    //marginBottom: 115,
  },
  scrollStyles: {
    backgroundColor: Colors.WHITE,
    height: SCREEN_HEIGHT - 80,
    // ...Platform.select({
    //   ios: {
    //     // height: (SCREEN_HEIGHT >= 812) ? SCREEN_HEIGHT - 120 : SCREEN_HEIGHT - 90
    //     height: SCREEN_HEIGHT - 90
    //   },
    //   android: {
    //     height: SCREEN_HEIGHT - 80,
    //   },
    // }),
    marginBottom: 10,
  },
  catHeader: {
    flexDirection: 'row',  
    width: undefined,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'flex-start',
  },
  catHeaderContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    width: undefined,
    height: 50,
    alignItems: 'center',
  },
  catHeaderText: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 18,
    color: Colors.WHITE,
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
  backIcoStyle: {
    tintColor: Colors.WHITE,
    backgroundColor: "transparent",
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  bgImage: {
    flex: 1,
    top: 40,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  travelText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'normal',
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
  plusText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'normal',
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
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsibleList: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 2,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    // borderColor: '#ddd',
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
    //marginLeft: 5,
    //marginRight: 5,
    //marginTop: 10,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    //color: 'white',
    alignItems: 'center',
    padding: 20,
    fontSize: 20,
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
  userBackdrop: {
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
  },

  questionnairesBackdrop: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 20,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderWidth: 1,
    borderRadius: 2,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
  },


  LastRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  LastRightCountContainer: {
    position: 'absolute',
    // height: 20,
    // width: 20,

    padding: 2,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 15,
    backgroundColor: Colors.SECONDAY_COLOR,
    left: 20,
    bottom: 25,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  },
  LastRightCountText: {
    fontSize: 10,
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

  LastRightCountImage: {
    height: 20,
    width: 20,
  },
  imgStyle: {
    height: 20,
    width: 20,
  },

  nodeStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    //marginRight: 10,
    // height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    flex: 1,
    width: SCREEN_WIDTH,

    //{ flex: 1, height: 40, width: SCREEN_WIDTH, flexDirection: 'row', justifyContent: 'space-between', }
  },
  semiNodeStyle: {

    // marginRight: 10,
    marginLeft: 10,
    // height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 7,
    paddingTop: 7,
    flex: 1,
  },
  nodeTextStyle: {
    // alignSelf: 'center',
    paddingLeft: 15,
    fontSize: 16,
    //  width: SCREEN_WIDTH / 4 * 3.5,
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
  semiNodeTextStyle: {
    alignSelf: 'center',
    paddingLeft: 20,
    fontSize: 16,
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
  semiNodeRedTextStyle: {
    alignSelf: 'center',
    fontSize: 16,
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
    color: Colors.PRIMARY,
  },
  ChildNodeTextStyle: {
    alignSelf: 'center',
    paddingLeft: 20,
    fontSize: 16,
    width: SCREEN_WIDTH / 3 * 2,
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
  ChildNodeRedTextStyle: {
    alignSelf: 'center',
    width: SCREEN_WIDTH / 3 * 2,
    fontSize: 16,
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
    color: Colors.PRIMARY,
  },


  nodeSignStyle: {
    alignSelf: 'center',
    fontSize: 18,
    marginRight: 15,
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
  lottie: {
    height: 100,
    width: 100,
  },
  listWrapper: {
    flex: 1,
    // marginVertical: 48,
  },


});
