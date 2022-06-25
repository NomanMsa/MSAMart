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
    fontSize: 14,
    color: Colors.PRIMARY,
  },
  boldTitleText: {
    fontWeight: "800",
    fontSize: 15,
    justifyContent: 'center',
  },
  PrizeText: {
    fontWeight: "800",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  boldTitleRedText: {
    fontWeight: "800",
    color: Colors.PRIMARY,
    fontSize: 18,
  },
  HorizontalSpaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  HorizontalContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  listItemContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageContiner: {
    // width: width / 10,
    // height: width / 10,
    width: 40,
    height: 40,
  },
});
