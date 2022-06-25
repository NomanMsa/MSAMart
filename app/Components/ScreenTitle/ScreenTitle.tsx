import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
const styles = require('./ScreenTitleStyles');

export default class extends Component {
  static defaultProps = {
    titleClick: () => { },
    icoClick: () => { },
    titleText: '',
  };
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[styles.TitleContainer]}>
        <TouchableOpacity styles={styles.ImageContainer} onPress={() => this.props.icoClick(this.props)}>
          {this.props &&
            <Image style={[styles.homeIco, this.props.ImageStyle]} source={this.props.ImageURL} />
          }
        </TouchableOpacity>
        <TouchableOpacity styles={styles.TitleTextContainer} onPress={() => this.props.titleClick(this.props)}>
          <Text style={[styles.TitleText]}></Text>  
          {/* {this.props.titleText} */}
        </TouchableOpacity>
      </View>
    )
  }
}