import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { Icons, } from '@assets';
const styles = require('./CheckoutHeaderStyles');
import AsyncStorage from '@react-native-community/async-storage';
export default class extends Component {
	static defaultProps = {
		logoClick: () => { },
	}
	constructor(props) {
		super(props)
		this.state={
			imageUri:null
		}
		console.log('Into Search 1');
		AsyncStorage.getItem("footerlogo").then(response => {
			this.setState({
			  imageUri:response
			});
		  });
	}
	render() {
		console.log('Into Search');
		return (
			<View style={[styles.headerContainer, this.props.styles]}>
				<TouchableOpacity onPress={() => this.props.logoClick(this)}>
					<Image style={[styles.dragonIcon, this.props.logoStyles]} source={{uri:this.state.imageUri}} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={[styles.secureIcon, this.props.secureStyles]} source={Icons.secureLogo} />
				</TouchableOpacity>
			</View>
		)
	}
}