import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground,
	FlatList,
} from 'react-native'
import Button from '../Button/Button.tsx';

const styles = require('./ImageCardsStyles');


export default class extends Component {
	static defaultProps = {
		data: [{}],
		onSlideClick: () => { },
		slideInterval: 9000,
	}
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.data,
			showViewer: true,
			showIndex: 0
		}
	}
	renderCards = ({ item, index }) => {
		return <View key={index} style={styles.slide}>
			<TouchableOpacity style={styles.slideImgCont} onPress={() => this.props.onSlideClick(item)}>
				<ImageBackground
					style={styles.slideImgBg}
					imageStyle={styles.slideImg}
					source={{ uri: item.PictureUrl }}
					onLoadStart={(e) => this.setState({ [index + 'isLoading']: true })}
					onLoad={(e) => this.setState({ [index + 'isLoading']: false })}
				>

					<View style={styles.maskContainer}>
						{item.CustomProperties && <><View style={styles.textContainer}>
							<Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.CustomProperties.ImageInnerTitle}</Text>
							<Text style={[styles.descTxt, item.descTxtStyle]}>{item.CustomProperties.ImageInnerSubTitle}</Text>

							{item.CustomProperties.ImageInnerButton != "" ?
								<>
									<Button
										title={item.CustomProperties.ImageInnerButton}
										btnStyle={[styles.btnStyle, item.btnStyle]}
										titleStyle={[styles.titleStyle, item.titleStyle]}
									/>
								</>
								:
								<></>
							}
						</View>
							<View style={{ flex: 4 }}>
								<Image style={styles.imgStyles} source={{ uri: item.img }} />
							</View></>}
					</View>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	}
	render() {
		return (
			<View>
				<FlatList
					data={this.props.data}
					renderItem={this.renderCards}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}