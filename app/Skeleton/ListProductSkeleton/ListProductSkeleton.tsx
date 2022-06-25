import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const styles = require('./ListProductSkeletonStyle');
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
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.productImageBox,
              this.props.productImageBoxStyles,
            ]}></View>
          <View
            style={[styles.middleContainer, this.props.middleContainerStyles]}>
            <View>
              <View
                style={[
                  {...styles.secondLine, width: 120},
                  this.props.secondLineStyle,
                ]}
              />
              <View
                style={[
                  {...styles.secondLine, width: 100},
                  this.props.secondLineStyle,
                ]}
              />
            </View>
            <View
              style={[
                styles.horizontalContainer,
                this.props.horizontalContainerStyles,
              ]}>
              <View
                style={[styles.lineContianer, this.props.lineContianerStyles]}>
                <View>
                  <View
                    style={[
                      {...styles.secondLine, width: 70},
                      this.props.secondLineStyle,
                    ]}
                  />
                  <View
                    style={[
                      {...styles.secondLine, width: 50},
                      this.props.secondLineStyle,
                    ]}
                  />
                </View>
                <View
                  style={[
                    {
                      ...styles.secondLine,
                      width: 50,
                      justifyContent: 'flex-end',
                      marginBottom: 10,
                    },
                    this.props.secondLineStyle,
                  ]}
                />
              </View>

              <View
                style={[
                  styles.BottonRightCircle,
                  this.props.BottonRightCircleStyle,
                ]}
              />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }
}
