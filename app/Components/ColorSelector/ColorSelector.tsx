import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, } from 'react-native'
import { Icons } from '@assets';
const styles = require('./ColorSelectorStyles');

export default class extends Component {
	static defaultProps = {
		onColorSelect: () => { },
	}
	constructor(props) {
		super(props)
		this.state = {
			selectedColor: '',
			selectedColorName: '',
		}
		this.selectColor = this.selectColor.bind(this);
		this.renderColorBlocks = this.renderColorBlocks.bind(this);
	}
	componentDidMount() {

		this.props.colorsData.forEach(function (element, index) {
			if (index == 0) {
				element.Selected = true;
			} else {
				element.Selected = false;
			}
		});
		this.setState({
			colorsData: this.props.colorsData,
			selectedColor: this.props.colorsData.ColorSquaresRgb,
		});
		if (this.props.colorsData.length > 0) {
			this.setState({
				selectedColorName: this.props.colorsData[0].Name,
			});
			this.props.onColorSelect(this.props.colorsData[0], this.props.Id)
		}

	}
	componentWillUnmount() {

	}
	selectColor = (item, index) => {
		tempArray = this.state.colorsData;
		let tempArray = Array.apply(null, Array(this.state.colorsData.length)).map((v, i) => {
			if (i == index) {
				let tempRoom = this.state.colorsData[i];
				tempRoom.Selected = true
				return tempRoom;
			}
			else {
				let tempRoom = this.state.colorsData[i];
				tempRoom.Selected = false
				return tempRoom;
			}
		});
		this.setState({
			colorsData: tempArray,
			selectedColor: item.ColorSquaresRgb,
			selectedColorName: item.Name,
		});
		this.props.onColorSelect(item, this.props.Id);
	};
	renderColorBlocks = ({ item, index }) => {
		return <View key={index} style={[styles.selectBox]}>
			<TouchableOpacity style={[styles.colorBlock, { backgroundColor: item.ColorSquaresRgb }]} onPress={() => this.selectColor(item, index)}>
				{item.Selected && <Image style={styles.colorSelectedIcon} source={Icons.tickMark} />}
			</TouchableOpacity>
			<Text style={[styles.colorTitle, this.props.colorTitleTextStyle]} numberOfLines={1}>{item.Name}</Text>
		</View>
	}
	render() {

		return (
			<View style={styles.selectContainer}>
				<View style={{ flexDirection: 'row', }}>
					{this.props && this.props.title && <Text style={[styles.mainTitleStyle, this.props.titleStyle]} numberOfLines={1}>{this.props.title} <Text style={styles.selColTitle}>{this.state.selectedColorName}</Text></Text>}
				</View>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={this.props.colorsData}
					renderItem={this.renderColorBlocks}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}