import React, { Component } from 'react'
import { Text, View, } from 'react-native'
const styles = require('./CheckoutStepsStyles');

export default class extends Component {
	static defaultProps = {

	}
	constructor(props) {
		super(props)
		console.log('Into Search 1');
		/* this.state = {
	   } */
	}

	render() {
		console.log('Into Search');
		return (
			<View style={[styles.stepContainer, this.props.styles]}>
				<View style={[styles.headerCont, this.props.headerStyles]}>
					<View style={[styles.numContainer, this.props.currentStepStyle]}>
						<Text style={styles.numText}
							testID={this.props.stepTitletestId}
							accessibilityLabel={this.props.stepTitletestId}
						>{this.props.stepNo}</Text>
					</View>
					<View style={styles.titleContainer} >
						<Text style={styles.titleText}
							testID={this.props.stepTitletestId}
							accessibilityLabel={this.props.stepTitletestId}

						>{this.props.stepTitle}</Text>
						<Text style={styles.subtitleText}
							testID={this.props.stepTitletestId}
							accessibilityLabel={this.props.stepTitletestId}
						>{this.props.stepSubtitle}</Text>
					</View>
				</View>
				<View>{this.props.children}</View>
			</View>
		)
	}
}