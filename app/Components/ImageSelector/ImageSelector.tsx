import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, } from 'react-native'
const styles = require('./ImageSelectorStyles');

export default class extends Component {
	static defaultProps = {
		onImageSelect: () => { },
	}
	constructor(props) {
		super(props)
		this.state = {
			selectedColor: '',
			selectedColorName: '',
			SelectedImageURL: ''
		}
		this.selectColor = this.selectColor.bind(this);
		this.renderColorBlocks = this.renderColorBlocks.bind(this);
	}
	componentDidMount() {

		this.props.ImageData.forEach(function (element, index) {
			if (index == 0) {
				element.Selected = true;
			} else {
				element.Selected = false;
			}
		});
		this.setState({
			ImageData: this.props.ImageData,
			selectedColor: this.props.ImageData.ColorSquaresRgb,
			selectedColorName: this.props.ImageData.Name,
		});
		if (this.props.ImageData.length > 0) {
			this.setState({
				selectedColorName: this.props.ImageData[0].Name,
			});
			this.props.onImageSelect(this.props.ImageData[0], this.props.Id)
		}

	}
	componentWillUnmount() {
	}
	selectColor = (item, index) => {
		tempArray = this.state.ImageData;
		let tempArray = Array.apply(null, Array(this.state.ImageData.length)).map((v, i) => {
			if (i == index) {
				let tempRoom = this.state.ImageData[i];
				tempRoom.Selected = true
				return tempRoom;
			}
			else {
				let tempRoom = this.state.ImageData[i];
				tempRoom.Selected = false
				return tempRoom;
			}
		});
		this.setState({
			ImageData: tempArray,
			selectedColor: item.ColorSquaresRgb,
			selectedColorName: item.Name,
			SelectedImageURL: item.ImageSquaresPictureModel.FullSizeImageUrl
		});
		this.props.onImageSelect(item, this.props.Id);
	};
	renderColorBlocks = ({ item, index }) => {
		return <View key={index} style={[styles.selectBox]}>

			{item.Selected && <TouchableOpacity style={{ borderWidth: 3, borderColor: 'gray', margin: 1, borderRadius: 5, }} onPress={() => this.selectColor(item, index)}>
				<Image style={{ height: 50, width: 50, margin: 2, }} source={{ uri: item.ImageSquaresPictureModel.ImageUrl }} />
			</TouchableOpacity>}

			{!item.Selected && <TouchableOpacity style={{ borderWidth: 1, borderColor: 'gray', margin: 1, borderRadius: 5, }} onPress={() => this.selectColor(item, index)}>
				<Image style={{ height: 50, width: 50, margin: 2, }} source={{ uri: item.ImageSquaresPictureModel.ImageUrl }} />
			</TouchableOpacity>}


			<Text style={[styles.colorTitle, this.props.colorTitleTextStyle]} numberOfLines={1}>{item.Name}</Text>
		</View>
	}
	render() {
		return (
			<View style={styles.selectContainer}>
				{this.props && this.props.title && <Text style={[styles.mainTitleStyle, this.props.titleStyle]} numberOfLines={1}>{this.props.title} <Text style={styles.selColTitle}>{this.state.selectedColorName}</Text></Text>}

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={this.props.ImageData}
					renderItem={this.renderColorBlocks}
					keyExtractor={(item, index) => index}
				/>

				{this.state.SelectedImageURL ?
					<>
						<Image style={{ height: 150, width: 150, margin: 2, }} source={{ uri: this.state.SelectedImageURL }}

						/>
					</>
					:
					<></>
				}
			</View>
		)
	}
}