import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Colors} from '@theme';

const {width, height} = Dimensions.get('window');
export default class FeedbackProgressBar extends PureComponent {
  static defaultProps = {};

  constructor() {
    super();
    this.springValue = new Animated.Value(1);

    this.state = {
      selected: false,
      unfilledColors: Colors.IVORY,
      selectedColor: Colors.SECONDAY_COLOR,
      progressWidh: 170,
    };
  }

  render() {
    return (
      <View>
        <View style={styles.ProgressBarContainer}>
          <Text>5 Stars</Text>
          <Progress.Bar
            progress={this.props.FiveStarRating / 100}
            width={width - this.state.progressWidh}
            color={this.state.selectedColor}
            unfilledColor={this.state.unfilledColors}
            borderWidth={0}
          />
          <Text>{this.props.FiveStarRating}%</Text>
        </View>

        <View style={styles.ProgressBarContainer}>
          <Text>4 Stars</Text>
          <Progress.Bar
            progress={this.props.FourStarRating / 100}
            width={width - this.state.progressWidh}
            color={this.state.selectedColor}
            unfilledColor={this.state.unfilledColors}
            borderWidth={0}
          />
          <Text>{this.props.FourStarRating}%</Text>
        </View>

        <View style={styles.ProgressBarContainer}>
          <Text>3 Stars</Text>
          <Progress.Bar
            progress={this.props.ThreeStarRating / 100}
            width={width - this.state.progressWidh}
            color={this.state.selectedColor}
            unfilledColor={this.state.unfilledColors}
            borderWidth={0}
          />
          <Text>{this.props.ThreeStarRating}%</Text>
        </View>

        <View style={styles.ProgressBarContainer}>
          <Text>2 Stars</Text>
          <Progress.Bar
            progress={this.props.TwoStarRating / 100}
            width={width - this.state.progressWidh}
            color={this.state.selectedColor}
            unfilledColor={this.state.unfilledColors}
            borderWidth={0}
          />
          <Text>{this.props.TwoStarRating}%</Text>
        </View>

        <View style={styles.ProgressBarContainer}>
          <Text>1 Stars</Text>
          <Progress.Bar
            progress={this.props.OneStarRating / 100}
            width={width - this.state.progressWidh}
            color={this.state.selectedColor}
            unfilledColor={this.state.unfilledColors}
            borderWidth={0}
          />
          <Text>{this.props.OneStarRating}%</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ProgressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
