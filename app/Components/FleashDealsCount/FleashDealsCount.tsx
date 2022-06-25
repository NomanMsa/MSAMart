import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
} from 'react-native'
import CountDown from '../CountDown/CountDown.tsx';

const styles = require('./FleashDealsCountStyles');

export default class extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[styles.FlashDealsSection, this.props.blockStyle]}>
<View style={{flexDirection:'row'}}>
        {this.props.IconPictureURL ?
          <View style={styles.IcoContainer}>
            <Image style={styles.FlashDealsIcon} source={{ uri: this.props.IconPictureURL }} />
          </View>
          :
          <></>
        }
        <View style={styles.MainTitleContainer}>
          {this.props.LayoutTypeId == 2 ?
            <Text style={[styles.FlashDealstitle, this.props.titleStyle, styles.superStyles]}>{this.props.Title}</Text>
            :
            <Text style={[styles.FlashDealstitle1, this.props.titleStyle, styles.superStyles]}>{this.props.Title}</Text>
          }
        </View>
        </View>
        {this.props.LayoutTypeId == 2 && <View style={styles.RightContainer}>
          <Text style={styles.FlashDealstitlesmall}>{this.props.SubTitle}{" "}</Text>
          <CountDown FromDate={Date.parse(new Date(this.props.FromDate))} ToDate={Date.parse(new Date((this.props.ToDate)))} styles={{ fontWeight: "400", alignSelf: 'flex-end' }} />
        </View>}
      </View>
    )
  }
}