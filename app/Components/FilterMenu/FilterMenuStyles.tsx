const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";
import colors from "../../Theme/Colors";

module.exports = StyleSheet.create({
  selectContainer: {
    //marginLeft:15,
    //marginRight:15,
    //width:width -30,
    paddingBottom: 15,
    borderBottomColor: Colors.SILVER,
  }, LastRightCountText: {
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
    // borderBottomWidth: 1,
    // backgroundColor: 'yellow',
    borderBottomColor: colors.SILVER,
    marginRight: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    flex: 1,
  },
  semiNodeStyle: {

    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 7,
    paddingTop: 7,
    flex: 1,
  },
  nodeTextStyle: {
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    fontSize: 12,
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
  RedNodeTextStyle: {
    color: Colors.PRIMARY,
    alignSelf: 'center',
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 12,
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
    fontSize: 14,
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
  menuContainerBox: {
    backgroundColor: Colors.WHITE,
    paddingLeft: 40,
    paddingRight: 5,
  },
  filterContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignContent: 'center',
  },
  filterTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  ArrowContainer: {
    height: 40,
    width: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },

  title: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: 0,
  },
  expandViewContainer: {
    paddingBottom: 20,
  },

  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    //height: 70,
    marginLeft: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    //  borderColor: Colors.SILVER,
  },
  normalText: {
    padding: 10,
    paddingRight: 2,
    width: width - 30,
    fontFamily: 'verdana',
    fontSize: 12,
  },
  unSelChkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  selChkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
})