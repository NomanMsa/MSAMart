import React, { Component } from 'react'
import { Text, View, TouchableOpacity, } from 'react-native'
import { default as TapRating } from '../StarRatings/TapRating.tsx';

const styles = require('./ProductTitleStyles');

export default class extends Component {
	static defaultProps = {
		onNavLink: () => { },
		slideInterval: 9000,
		bulletStyles: {},
		onManufactureClick: () => { },
	}

	constructor(props) {
		super(props)
		this.state = {
			list: [],
		}
		this.renderTopLeft = this.renderTopLeft.bind(this);
		this.renderTopRight = this.renderTopRight.bind(this);
		this.renderBottomRow = this.renderBottomRow.bind(this);
		this.renderBottomLeft = this.renderBottomLeft.bind(this);
		this.renderBottomRight = this.renderBottomRight.bind(this);
		this.renderMiddle = this.renderMiddle.bind(this);
		this.renderFullWidth = this.renderFullWidth.bind(this);
	}

	renderTopLeft = () => {
		return <TouchableOpacity onPress={() => this.props.onManufactureClick()}>
			<View style={[styles.topLeftContainer, this.props.topLeftContainerStyle]} >
				<Text style={styles.topLeftContainerText}>{this.props.zone}</Text>
			</View>
		</TouchableOpacity>
	}
	renderTopRight = () => {
		return <View style={[styles.topRightContainer, this.props.topRightContainerStyle]} onPress={() => console.log(this.props)}>
			<Text style={styles.pointText}
			>{this.props.title}</Text>
		</View>
	}
	renderBottomRow = () => {
		return <View style={[styles.bottomRow, this.props.bottomRowStyle]} onPress={() => console.log(this.props)}>
			{this.renderBottomLeft()}
			{/* {this.renderBottomRight()} */}
		</View>
	}
	renderBottomLeft = () => {
		return <View style={[styles.bottomLeftContainer, this.props.bottomLeftContainerStyle]} onPress={() => console.log(this.props)}>
			<Text style={[styles.bottomLeftText, this.props.netPriceStyle]}
				testID={this.props.pro_netprice_TestId}
				accessibilityLabel={this.props.pro_netprice_TestId}

			>{this.props.currencyText} {this.props.netPrice}<> {this.props.discountedPrice != null && this.props.discountedPrice != "" ? <Text style={[styles.discountedPriceText, this.props.discountedPriceStyle]}>{this.props.currencyText} {this.props.discountedPrice}</Text> : <></>}</></Text>
		</View>
	}
	renderBottomRight = () => {
		return <View style={[styles.bottomRightContainer, this.props.bottomRightContainerStyle]} onPress={() => console.log(this.props)}>
			<TapRating
				count={this.props.totalStars}
				defaultRating={this.props.ratedStars}
				showRating={false}
				isDisabled={true}
				showTitle={false}
				size={10}
				starStyle={{ margin: 1 }}
				starContainerStyle={{ marginRight: 5 }}
			/>
			<Text style={[styles.bottomRightText, this.props.netPriceStyle]}>{this.props.totalReviews} {this.props.reviewText}</Text>
		</View>
	}
	renderMiddle = () => {
		return <View style={[styles.middleContainer, this.props.middleContainerStyle]} onPress={() => console.log(this.props)}>
			<Text style={styles.pointText}>{this.props.zone}</Text>
		</View>
	}
	renderFullWidth = () => {
		return <View style={[styles.fullWidthContainer, this.props.fullWidthContainerStyle]} onPress={() => console.log(this.props)}>
			<Text style={styles.fullWidthContainerText}
				testID={this.props.pro_title_TestId}
				accessibilityLabel={this.props.pro_title_TestId}
			>{this.props.title}</Text>
		</View>
	}
	render() {
		return (
			<View style={styles.container}>
				{this.props.zone != '' && (this.renderTopLeft())}
				{this.renderFullWidth()}
				{this.renderBottomRow()}
			</View>
		)
	}
}