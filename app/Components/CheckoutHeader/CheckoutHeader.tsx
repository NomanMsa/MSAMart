import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { Icons, } from '@assets';
const styles = require('./CheckoutHeaderStyles');

export default class extends Component {
	static defaultProps = {
		logoClick: () => { },
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
			<View style={[styles.headerContainer, this.props.styles]}>
				<TouchableOpacity onPress={() => this.props.logoClick(this)}>
					<Image style={[styles.dragonIcon, this.props.logoStyles]} source={Icons.dpwLogo} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={[styles.secureIcon, this.props.secureStyles]} source={Icons.secureLogo} />
				</TouchableOpacity>
			</View>
		)
	}
}