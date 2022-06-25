const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio, Platform } = React;
const { width, height } = Dimensions.get('window')
import { Colors } from "@theme";

module.exports = StyleSheet.create({
  parentContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10
  },
  container: {
    flex: 1,
    margin: 10,
    alignItems: 'center', // Centered horizontally
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 1,
    padding: 1
  },
  txtStyle: {
    margin: 5,
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: '#34495e',
  },
  titleStyle: {
    margin: 5,
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'center',
    color: 'red',
    // width:'50%',
  },
  titleBlock: {
    width: width - 30,
    margin: 15,
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  buySaveMoreContainer: {
    // width:width - 30,
    justifyContent: 'center',
    alignSelf: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backAvatar: {
    // tintColor: Colors.WHITE,
    width: 30,
    height: 30,
  },
  card: {
    shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 10,
    marginLeft: 1,
    padding: 1
  },
  item: {
    width: '100%',
    // height:'50%'
  },
  productTitle: {
    paddingLeft: 10,
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
    color: Colors.BLACK,
  },
  body: {
    flex: 1,
    position: 'relative',
  },
})