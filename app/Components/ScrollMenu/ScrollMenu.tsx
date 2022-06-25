import React, { Component } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	FlatList
} from 'react-native'
const styles = require('./ScrollMenuStyles');

export default class ScrollMenu extends Component {
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
		console.log('min');
		this.state = {
			data: this.props.data,
			showViewer: true,
			showIndex: 0
		}
		this.renderMenu = this.renderMenu.bind(this);
		this.renderEmptyMenu = this.renderEmptyMenu.bind(this);
		this.onSuccessCall = this.onSuccessCall.bind(this);
		this.onFailureAPI = this.onFailureAPI.bind(this);
		this.onPromiseFailure = this.onPromiseFailure.bind(this);
		this.onOffline = this.onOffline.bind(this);
	}
	componentDidMount() {
	}
	onSuccessCall(data) {
		console.log(data);
	}
	onFailureAPI(data) {
		console.log(data);
	}
	onPromiseFailure(data) {
		console.log(data);
	}
	onOffline(data) {
		console.log(data);
	}





	renderMenu({ item, index }) {
		return <TouchableOpacity key={index} style={[styles.listItemContainer, this.props.itemStyle]} onPress={() => this.props.onTap(item)} >
			{(this.props.newTagFlag && item.CssClass) && (<View style={[styles.itemTitleContainerStyle, this.props.titleBlockStyle]}>
				<Text style={[styles.menuTitleTextStyle, this.props.titleTextStyle]}>{this.props.newTagText}</Text>
			</View>)}
			<Text style={[styles.menuTextStyle, this.props.itemTextStyle]} numberOfLines={1}>{item.Title}</Text>
		</TouchableOpacity>
	}
	renderEmptyMenu(txt) {
		console.log(txt);
		return (<Text style={styles.menuTextStyle}>{txt}</Text>)
	}
	render() {
		console.log(this.props);
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