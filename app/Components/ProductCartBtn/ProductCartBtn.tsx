import React, { Component } from 'react'
import {
  Text, TouchableOpacity, Image,
} from 'react-native'
import { Images, Icons } from '@assets';
const styles = require('./ProductCartBtnStyles');

export default class extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <>
        <TouchableOpacity onPress={() => this.props.onTap(item)} >
          <Image style={styles.cartBtn} source={Icons.cartBtn} />
        </TouchableOpacity>
      </>
    )
  }
}