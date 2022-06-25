const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from '@theme';

module.exports = StyleSheet.create({
  listviewContainer: {
    width: width - 30,
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  ListTitleText: {
    justifyContent: 'flex-start',
    fontSize: 22,
    padding: 15,
    paddingLeft: 0,
    alignSelf: 'flex-start',
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
  rateText1: {
    fontSize: 12,
    textAlign: 'justify',
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
    paddingBottom: 20,
  },
  itemContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  radioContianer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 50,
    alignItems: 'center',
    paddingLeft: 20,
  },
  radioText: {
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
    fontSize: 12,
    color: Colors.BG_OVERLAY,

  },
  rowDirectionContianer: {
    flexDirection: "row",
    justifyContent:'space-around'
  },
  imageStyle: {
    height: width / 4,
    width: width / 4,
    margin: 15
  },
  desContainer: {
    justifyContent: 'center',
  },

  desTextStyle: {
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
    width: width / 2,
    fontSize: 12
  },

  bottomContianer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,

  },
  BottonContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    flex: 1,
  },

  LabelStyle: {
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
    fontSize: 12
  },

  QuentityBox: {
    borderWidth: 1,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomRightContainer: {
    alignSelf: 'center',

  },
  prizeText: {
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
    alignSelf: 'flex-end',
    padding: 5,
    color: Colors.BG_OVERLAY,
  },
  TotalText: {
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
    alignSelf: 'flex-end',
    padding: 5,
    fontSize: 12
  },
  searchContainer: {
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  searchInputs: {
    height: 40,
    width: 30,
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 10,
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
  }
});
