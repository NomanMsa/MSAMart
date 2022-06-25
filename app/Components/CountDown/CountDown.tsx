import React, { Component } from 'react'
import {
  Text, View
} from 'react-native'
import { Calc } from '@utils'
const styles = require('./CountDownStyles');

export default class FleashDealsCountText extends Component {
  constructor(props) {
    super(props)
	this.state={
		fromTime: 0,
		toTime: 0,
		timerRunner: this.endingInCounter(this.props.FromDate, this.props.ToDate),//this.endingInCounter(),
	}
	this.endingInCounter = this.endingInCounter.bind(this);
	this.timer = null;
  }
  componentDidMount() {
	  this.setState({
		fromTime: this.props.FromDate,
		toTime: this.props.ToDate,
	  });
	this.timer = setInterval(()=> {this.setState({timerRunner: this.endingInCounter((this.state.fromTime + 1000), this.state.toTime), fromTime: this.state.fromTime + 1000})}, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  endingInCounter(fromdt, todt) {
	const {days, hours, minutes, seconds} = Calc.countDown(fromdt, todt);
    let t = days +'d: '+ hours  +'h: '+ minutes +'m: '+ seconds +'s';
    return t;
  }
  render() {
    return (
			<View style={styles.CounterContainer}><Text style={[styles.FlashDealsTimer, this.props.styles]}>{this.state.timerRunner}</Text></View>
	)
  }
}