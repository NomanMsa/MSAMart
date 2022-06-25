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
import { Icons } from '@assets';
import { ThemeConfig } from '@theme';

const styles = require('./DiscountBannerStyles');

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
				style={styles.wrapper}
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
					<>
						{
							item.MobileBackGroundPictureURL ?
								<>
									<View style={styles.imageContainer}><ImageBackground
										style={styles.imageContainer}
										imageStyle={styles.slideImg}
										source={{ uri: item.MobileBackGroundPictureURL }}
										onLoadStart={(e) => this.setState({ [index + 'isLoading']: true })}
										onLoad={(e) => this.setState({ [index + 'isLoading']: false })}
									>
										{/* <Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.Discountcouponcode}</Text>
										<Text style={[styles.descTxt, item.descTxtStyle]}>{item.Description}</Text> */}
									</ImageBackground></View>
								</>
								:
								<>
									<View style={[styles.textContainer, { backgoundColor: item.BackgroundColor }]}>
										<Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.Discountcouponcode}</Text>
										<Text style={[styles.descTxt, item.descTxtStyle]}>{item.Description}</Text>
									</View>
								</>
						}
					</>
				))}
			</Swiper>
		)
	}
}
class ViewerMedium extends Component {
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
				style={styles.wrapperMedium}
				loop={true}
				autoplay={true}
				autoplayDirection={true}
				autoplayTimeout={this.props.slideInterval}
				showPageBtn={false}
				showsButtons={false}
				containerStyle={styles.wrapperMedium}
				bounces={false}
				pagingEnabled={true}
				horizontal={true}
				showsVerticalScrollIndicator={false}
				dot={<View style={styles.dotStyle} />}
				activeDot={<View style={styles.activeDotStyle} />}
				paginationStyle={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}

			>
				{this.props.data.map((item, index) => (
					<>
						{
							item.MobileBackGroundPictureURL ?
								<>
									<View style={styles.imageContainerMedium}><ImageBackground
										style={styles.imageContainerMedium}
										imageStyle={styles.slideImg}
										source={{ uri: item.MobileBackGroundPictureURL }}
										onLoadStart={(e) => this.setState({ [index + 'isLoading']: true })}
										onLoad={(e) => this.setState({ [index + 'isLoading']: false })}
									>
										{/* <Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.Discountcouponcode}</Text> */}
										{/* <Text style={[styles.descTxt, item.descTxtStyle]}>{item.Description}</Text> */}
									</ImageBackground></View>
								</>
								:
								<>
									<View style={[styles.textContainerMedium, { backgoundColor: item.BackgroundColor }]}>
										<Text style={[styles.titleTxt, item.titleTxtStyle]}>{item.Discountcouponcode}</Text>
										<Text style={[styles.descTxt, item.descTxtStyle]}>{item.Description}</Text>
									</View>
								</>
						}
					</>
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
		console.log(this.props);
		const { onSlideClick } = this.props;
		return (
			<View>
				{(this.props.data && this.props.data.length) > 0 && <>{(this.props.data[0].BannerDimension == 'Small') ?
					<Viewer
						index={this.state.showIndex}
						onSlideClick={onSlideClick}
						data={this.props.data}
						slideInterval={this.props.slideInterval}
					/>
					:
					<ViewerMedium
						index={this.state.showIndex}
						onSlideClick={onSlideClick}
						data={this.props.data}
						slideInterval={this.props.slideInterval}
					/>}
				</>}
			</View>
		)
	}
}