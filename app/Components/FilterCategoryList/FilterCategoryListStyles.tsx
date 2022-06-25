const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 30,
    alignSelf: 'center',
  },
  nodeStyle: {
    // borderBottomWidth: 1,
    // backgroundColor: 'yellow',
    borderBottomColor: Colors.SILVER,
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
    marginRight: 10,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    paddingBottom: 15,
    paddingTop: 15,
    // flex: 1,
    // backgroundColor: 'yellow',
    // alignSelf: 'center',
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
    marginLeft: 20,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // paddingBottom: 15,
    paddingTop: 15,
    // alignSelf: 'center',
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

  childNodeTextStyle: {
    marginLeft: 40,
    // justifyContent: 'space-between',
    // flexDirection: 'row',
    // paddingBottom: 15,
    paddingTop: 15,
    // alignSelf: 'center',
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

  itemWrapper: {
    alignItems: "center",
    backgroundColor: "grey",
    flexDirection: "row",
    height: 48,
    justifyContent: "space-between",
    marginVertical: 1,
    marginHorizontal: 16,
    paddingHorizontal: 16,
  },
  listWrapper: {
    flex: 1,
    // marginVertical: 48,
  },
  itemText: {
    color: "black",
    fontSize: 14,
    marginLeft: 8,
    width: "100%",
  },

});
