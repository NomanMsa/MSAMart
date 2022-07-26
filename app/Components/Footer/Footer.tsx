import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { Images, Icons, Loaders } from '@assets';
const styles = require('./FooterStyles');
const { width, height } = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';
export default class extends Component {
	static defaultProps = {
		onNavLink: () => { },
		slideInterval: 9000,
	}
	constructor(props) {
		super(props)
		this.state={
			imageUri:null
		}
		
		AsyncStorage.getItem("footerlogo").then(response => {
			this.setState({
			  imageUri:response
			});
		  });
		this.renderFooterRows = this.renderFooterRows.bind(this);
		this.renderFooterCols = this.renderFooterCols.bind(this);
		this.renderSocialMediaListCols = this.renderSocialMediaListCols.bind(this);
		this.renderFooterLinks = this.renderFooterLinks.bind(this);
	}
	renderFooterRows = ({ item, index }) => {
		return <View style={styles.listRowContainer}>
			<Image style={styles.listRowIcon} source={item.image} />
			<Text style={styles.listRowText}>{item.text}</Text>
		</View>
	}
	renderFooterCols = ({ item, index }) => {
		return <View style={[styles.listColContainer, { width: (width / this.props.paymentList.length) }]}>
			<Image style={styles.listColIcon} source={item.image} />
		</View>
	}
	renderSocialMediaListCols = ({ item, index }) => {
		return <View style={[styles.listClearColContainer, { width: (width / this.props.socialMediaList.length) }]}>
			<Image style={styles.listClearColIcon} source={item.image} />
		</View>
	}
	renderFooterLinks = ({ item, index }) => {
		const { onNavLink } = this.props;
		return <TouchableOpacity key={index} style={[styles.footerLinkContainer, this.props.footerLinkStyle]} onPress={() => onNavLink(item)}>
			<Text style={styles.footerLinkText}>{item.text}</Text>
		</TouchableOpacity>
	}
	render() {
		return (
			<View style={styles.footerContainer}>

				<View>
					<Image style={styles.footerLogoStyle} source={{uri:this.state.imageUri}} />
				</View>
				{this.props && this.props.footerLinksList && <View style={styles.footerLinksBox}>
					<FlatList
						numColumns={2}
						data={this.props.footerLinksList}
						showsHorizontalScrollIndicator={false}
						renderItem={this.renderFooterLinks}
						keyExtractor={(item, index) => index}
					/>
				</View>}

				<View style={styles.CopyrightStyle}>
					<Text style={[styles.menuTextStyle, this.props.copyrightTextStyle]} numberOfLines={1}>Copyright © 2022 MSA. All rights reserved.</Text>

				</View>
			</View>
		)
	}
}