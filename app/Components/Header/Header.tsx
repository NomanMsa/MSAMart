import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { Icons, Images, Loaders } from '@assets';
import { ServiceCall } from '@utils';
import { Api } from '@config';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const styles = require('./HeaderStyles');
import { SvgUri } from 'react-native-svg';

class Headers extends Component {
	static defaultProps = {
		fullRowTop: true,
		fullRowBottom: false,
		burgerMenuClick: () => { },
		logoClick: () => { },
		userClick: () => { },
		cartClick: () => { },
		backButtonClick: () => { },
		countryModel: null,
		shipToEnabled: false,
		shipToButtonClick: () => { },
	}
	constructor(props) {
		super(props)
		this.state = {
			CartCount: "0"
		};
		this.withBurgerMenu = this.withBurgerMenu.bind(this);
		this.getCartCountData = this.getCartCountData.bind(this);
		this.onSuccessGetCountCall = this.onSuccessGetCountCall.bind(this);
		this.onFailureAPI = this.onFailureAPI.bind(this);
		this.onPromiseFailure = this.onPromiseFailure.bind(this);
		this.onOffline = this.onOffline.bind(this);
	}
	fieldRef = React.createRef();

	async componentDidMount() {
		this.setState({ CartCount: this.props && this.props.CarCount });
		console.log("CartCount....: ", this.props.CarCount)
	}
	componentWillUnmount() {
	}
	onSubmit = () => {
		let { current: field } = this.fieldRef;

	};

	withBurgerMenu = () => {
		return <View style={styles.fullRowContainer}>
			<View style={styles.leftContainer}>
				{!this.props.NavButton && <TouchableOpacity
					testID={"mobileMenu"}
					accessibilityLabel="mobileMenu"
					style={[styles.burgerMenuContainer, this.props.menuIcoContStyles]} onPress={() => this.props.burgerMenuClick(this)}>
					<Image style={[styles.burgerMenuIcon, this.props.menuIcoStyles]} source={Icons.burgerMenu}

					/>
				</TouchableOpacity>}
				{this.props.NavButton == true && <TouchableOpacity
					testID={this.props.backBtn_TestId}
					accessibilityLabel={this.props.backBtn_TestId}
					style={[styles.burgerMenuContainer, this.props.menuIcoContStyles]} onPress={() => this.props.backButtonClick(this)}>
					<Image
						testID={"menuArrow"}
						accessibilityLabel="menuArrow"
						style={[styles.burgerMenuIcon, this.props.menuIcoStyles]} source={Icons.arrowBack} />
				</TouchableOpacity>}
				<TouchableOpacity onPress={() => this.props.logoClick(this)}>
					<Image style={[styles.dragonIcon, this.props.logoStyles]} source={Icons.logo}
						testID={this.props.testId_Logo}
						accessibilityLabel={this.props.testId_Logo}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.rightContainer}>
				{this.props && this.props.shipToEnabled && this.props.countryModel && this.props.countryModel.CountryFlag && <TouchableOpacity style={styles.flagContainer} onPress={() => this.props.shipToButtonClick(this)}>
					<SvgUri width='25' height='25' uri={this.props.countryModel.CountryFlag} />
				</TouchableOpacity>}
				<TouchableOpacity style={styles.userContainer} onPress={() => this.props.userClick(this)}>
					<Image style={[styles.userIcon, this.props.userIcoStyles]} source={Icons.user} />
				</TouchableOpacity>
				<TouchableOpacity
					testID={"goToCartMobileBtn"}
					accessibilityLabel="goToCartMobileBtn"
					style={styles.cartContainer} onPress={() => this.props.cartClick(this)}>
					{this.props && this.props.CarCount > 0 && <View style={styles.cartCountBox}>
						<Text
							testID={"cartQty"}
							accessibilityLabel="cartQty"
							style={styles.cartCount}>{Number(this.props.CarCount)}</Text>
					</View>}
					<Image
						testID={"cartBtn"}
						accessibilityLabel="cartBtn"
						style={[styles.cartIcon, this.props.cartIcoStyles]} source={Icons.cart} />
				</TouchableOpacity>
			</View>
		</View>
	};

	formatText = (text) => {
		return text.replace(/[^+\d]/g, '');
	};
	getCartCountData = async () => {
		let authToken = await AsyncStorage.getItem('custToken');
		if(authToken != null){
		let Service = {
			apiUrl: Api.getShoppingCount,
			methodType: 'GET',
			headerData: { 'Content-Type': 'application/json' },
			onSuccessCall: this.onSuccessGetCountCall,
			onFailureAPI: this.onFailureAPI,
			onPromiseFailure: this.onPromiseFailure,
			onOffline: this.onOffline,
		};
		const serviceResponse = await ServiceCall(Service);
	}
	};
	onSuccessGetCountCall = (data) => {
		this.setState({
			CartCount: data.model.Items.length,
		})
	}
	onFailureAPI = (data) => {
	}
	onPromiseFailure = (data) => {
	}
	onOffline = (data) => {
	}
	render() {
		return (
			<>
				<View style={[styles.headerContainer, this.props.styles]}>
					{this.props.fullRowTop && <>{this.withBurgerMenu()}</>}
					{this.props.fullRowBottom}
				</View>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	let Store_data = state.Count

	return {
		CarCount: Store_data.shoppingCartCount
	}
}

export default connect(mapStateToProps)(Headers);