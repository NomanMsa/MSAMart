import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList
} from 'react-native'
const styles = require('./CategoryCirclesStyles');

export default class CategoryCircles extends Component {
	static defaultProps = {
		onTap: () => { },
		emptyMsg: 'No Items Found...',
		titleBlockStyle: {},
		titleTextStyle: {},
		itemStyle: {},
		itemTextStyle: {},
		newTagFlag: true,
		newTagText: 'New',
	}
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
			showViewer: true,
			showIndex: 0
		}
		this.renderMenu = this.renderMenu.bind(this);
		this.renderEmptyMenu = this.renderEmptyMenu.bind(this);
	}
	renderMenu = ({ item, index }) => {
		return <TouchableOpacity key={index} style={[styles.listItemContainer, this.props.itemStyle]} onPress={() => this.props.onTap(item)} >
			<View style={styles.catCircle}>
				<Image style={styles.imgStyles} source={{ uri: item.PictureModel.ImageUrl }} />
			</View>
			<View style={styles.textContainer}>
				<Text numberOfLines={2} style={[styles.menuTextStyle, this.props.itemTextStyle]}>{item.Name}</Text>
			</View>
		</TouchableOpacity>
	}
	renderEmptyMenu(txt) {
		return (<Text style={styles.menuTextStyle}>{txt}</Text>)
	}
	render() {
		const { onTap } = this.props;
		return (
			<View style={styles.menuStyle}>
				<FlatList
					horizontal
					data={this.props.data}
					renderItem={this.renderMenu}
					keyExtractor={(item, index) => index}
					ListEmptyComponent={this.renderEmptyMenu(this.props.emptyMsg)}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		)
	}
}