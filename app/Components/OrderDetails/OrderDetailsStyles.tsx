const React = require('react-native');
const {Dimensions, StyleSheet, PixelRatio} = React;
const {width, height} = Dimensions.get('window');
import {Colors} from '@theme';

module.exports = StyleSheet.create({
  container: {
    width: width - 30,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
  },
  NormalText: {
    fontSize: 12,
    paddingTop: 15,
  },
  detailText: {
    fontSize: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  listText: {
    fontSize: 12,
    width: width / 4,
  },
  boldText: {
    fontWeight: "800",
    fontSize: 12,
  },
  boldTitleText: {
    fontWeight: "800",
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boldTitleRedText: {
    fontWeight: "800",
    color: Colors.PRIMARY,
    fontSize: 18,
  },
  HorizontalSpaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HorizontalContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    //marginBottom: 10,
  },
  orderDetailContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.SILVER,
    padding: 10,
  },
  orderDetailsListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
