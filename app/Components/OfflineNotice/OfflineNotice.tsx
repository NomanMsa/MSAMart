import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
const styles = require('./OfflineNoticeStyles');

export default class OfflineNotice extends Component {
  static defaultProps = {
    noInternetText: 'No internet!',
    offlineText: 'You are offline',
    offlineTextStyle: {},
    noInternetTextStyle: {},
    offlineStyle: {},
    noInternetStyle: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isInternetReachable: true,
    }
    this.MiniOfflineSign = this.MiniOfflineSign.bind(this);
  }

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      this.handleConnectivityChange(state.isConnected, state.isInternetReachable);
    });
  }

  componentWillUnmount() {
    //NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected, isInternetReachable) => {
    this.setState({ isConnected, isInternetReachable });
  };
  MiniOfflineSign() {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>{this.props.offlineText}</Text>
      </View>
    );
  }
  render() {
    return (<>
      {!this.state.isConnected ? <View style={[styles.offlineContainer, this.props.offlineStyle]}>
        <Text style={[styles.offlineText, this.props.offlineTextStyle]}>{this.props.offlineText}</Text>
      </View> : <>{!this.state.isInternetReachable ? <View style={[styles.offlineContainer, this.props.noInternetStyle]}>
        <Text style={[styles.offlineText, this.props.noInternetTextStyle]}>{this.props.noInternetText}</Text>
      </View> : <></>}</>}
    </>)
  }
}