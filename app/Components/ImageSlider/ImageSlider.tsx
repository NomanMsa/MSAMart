import React, { Component } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	ImageBackground
} from 'react-native'

import Swiper from '../Swiper/Swiper.tsx';
import Button from '../Button/Button.tsx';
import { ThemeConfig } from '@theme';

const styles = require('./ImageSliderStyles');

//const Viewer = props => (
class Viewer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
		}
	}
	render() {
		const { props } = this.props;
		return (
			<Swiper
				index={this.props.index}
				style={[styles.wrapper, this.props.wrapperStyle]}
				loop={true}
				autoplay={true}
				autoplayDirection={true}
				autoplayTimeout={this.props.slideInterval}
				showPageBtn={false}
				showsButtons={false}
				containerStyle={styles.wrapper}
				bounces={false}
				pagingEnabled={true}
				horizontal={true}
				showsVerticalScrollIndicator={false}
				dot={<View style={styles.dotStyle} />}
				activeDot={<View style={styles.activeDotStyle} />}
				paginationStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}

			>
				{this.props.data.map((item, index) => (
					<View key={index} style={styles.slide}>
						<TouchableOpacity activeOpacity={ThemeConfig.activeOpacityHigh} style={styles.slideImgCont} onPress={() => this.props.onSlideClick(item)}>
							{item.PictureUrl ? <ImageBackground
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
										{item.btn && <Button
											title={item.CustomProperties.ImageInnerButton}
											btnStyle={[styles.btnStyle, item.btnStyle]}
											titleStyle={[styles.titleStyle, item.titleStyle]}
										/>}
									</View>
										<View style={{ flex: 4 }}>
											<Image style={styles.imgStyles} source={{ uri: item.img }} />
										</View></>}
								</View>
							</ImageBackground> : <ImageBackground
								style={styles.slideImgBg}
								imageStyle={styles.slideImg}
								source={{ uri: item.PictureUrl }}
								onLoadStart={(e) => this.setState({ [index + 'isLoading']: true })}
								onLoad={(e) => this.setState({ [index + 'isLoading']: true })}
							>
								<View style={styles.maskContainer}><>
									{item.CustomProperties && <><View style={styles.textContainer}>
										<Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.CustomProperties.ImageInnerTitle}</Text>
										<Text style={[styles.descTxt, item.descTxtStyle]}>{item.CustomProperties.ImageInnerSubTitle}</Text>
										{item.btn && <Button
											title={item.CustomProperties.ImageInnerButton}
											btnStyle={[styles.btnStyle, item.btnStyle]}
											titleStyle={[styles.titleStyle, item.titleStyle]}
										/>}
									</View>
										<View style={{ flex: 4 }}>
											<Image style={styles.imgStyles} source={{ uri: item.img }} />
										</View></>}</>
								</View>
							</ImageBackground>}
						</TouchableOpacity>
					</View>
				))}
			</Swiper>
		)
	}
}
export default class extends Component {
	static defaultProps = {
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
	render() {
		const { onSlideClick } = this.props;
		return (
			<View>
				{(this.props.data && this.props.data.length) > 0 && <Viewer
					index={this.state.showIndex}
					onSlideClick={onSlideClick}
					data={this.props.data}
					slideInterval={this.props.slideInterval}
				/>}
			</View>
		)
	}
}