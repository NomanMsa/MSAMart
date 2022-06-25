import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const styles = require('./GridProductSkeletonStyle');
const {width, height} = Dimensions.get('window');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DescriptionLimit: 0,
    };
    this.renderProductList = this.renderProductList.bind(this);
  }

  renderProductList = () => {
    return (
      <View>
        <Text>dffdsfdfdsdsfdsfsdsdfsdf</Text>
      </View>
    );
  };
  render() {
    return (
      <SkeletonPlaceholder>
        <View>
          <View style={styles.productImageBox}></View>
          <View style={styles.middleContainer}>
            <View style={styles.firsLine} />
            <View style={styles.secondLine} />
            <View style={styles.BottonRightCircle} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }
}
