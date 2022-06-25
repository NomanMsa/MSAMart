const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

export default StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.PRIMARY,
    height: height,
  },
  pageStyles: {
    backgroundColor: Colors.WHITE,
    height: '100%',
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
    padding: 10,
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
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
  },
  listItemText: {
    padding: 10,
    fontSize: 15,
    fontWeight: "800",
  },
  backAvatar: {
    height: 25,
    width: 25,
    tintColor: Colors.WHITE,
  },
  searchContainer: {
    backgroundColor: 'white',
    flex: 1,
    //borderColor: 'gray',
    // borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 25,
    alignItems: 'center',
    marginLeft: 10,
    //marginRight: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    marginLeft: 10,
    //placeholderTextColor: 'gray',
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
    alignSelf: 'center',
    justifyContent: 'center',
  },
  SearchMagnifyAvatar: {
    tintColor: Colors.BLACK,
    height: 30,
    width: 50,
    borderColor: Colors.WHITE,
    alignSelf: 'center',
    tintColor:Colors.DARK_GRAY_TEXT,
    justifyContent: 'center',
  },
  searchMagnifyContainer: {
    //borderWidth: 1,
    //borderColor: Colors.DARK_GRAY_COLOR,
    //backgroundColor: Colors.DARK_GRAY_COLOR,
    //borderRadius: 10,
    //padding: 4,
    //marginRight: 10,
    //marginLeft: 10,
    justifyContent: 'center',
  },
  searchClearContainer: {
    borderWidth: 1,
    borderColor: Colors.DARK_GRAY_COLOR,
    backgroundColor: Colors.DARK_GRAY_COLOR,
    borderRadius: 10,
    padding: 4,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
  },
  internalItemContainer: {
    paddingLeft: 30,
  },
  normalText: {
    paddingLeft: 10,
    paddingRight: 2,
    width: width / 4 * 3.2,
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
  categoryText: {
    paddingLeft: 10,
    paddingRight: 2,
    width: width / 4 * 3.2,
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
  logoutAvatar: {
    tintColor: Colors.BG_OVERLAY,
    height: 20,
    width: 20,
  },

  SearchAvatar: {

    height: 40,
    width: 40,
  },
  searchInputs: {
    height: 40,
    flex: 1,
    marginLeft: 10,
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

  SerchTextStyle: {
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
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: height / 3

  }
});
