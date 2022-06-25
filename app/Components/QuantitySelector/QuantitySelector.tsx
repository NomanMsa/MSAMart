import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { Images, Loaders, Icons } from '@assets';

//import { FormTextInput } from '../FormTextInput/FormTextInput.tsx'
import FormTextInput from '../FormTextInput/FormTextInput';
const styles = require('./QuantitySelectorStyles');
export default class extends Component {
	static defaultProps = {
		onChangeVal: () => { },
		minVal: 1,
		maxVal: 999,
		QuentityChange: () => { },
	}
	constructor(props) {
		super(props)
		this.state = {
			quantity: 1,
		}
		this.changeVal = this.changeVal.bind(this);
		this.quantityTextChange = this.quantityTextChange.bind(this);
		this.checkforzero = this.checkforzero.bind(this);
	}
	componentWillUnmount() {

	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.Quantity !== this.state.quantity) {
		  this.setState({ quantity: nextProps.Quantity });
		}
	}

	changeVal = async (operation) => {
		if (operation == 'decrement' && this.state.quantity > this.props.minVal) {
			await this.setState({
				quantity: parseInt(parseInt(this.state.quantity) - parseInt(1)),
			});
		} else if (operation == 'increment' && this.state.quantity < this.props.maxVal) {
			await this.setState({
				quantity: parseInt(parseInt(this.state.quantity) + parseInt(1)),
			});
		}
		await this.props.QuentityChange(this.state.quantity)

	};
	checkforzero = async () => {
		console.log('called on blur')
		console.log(this.state.quantity)
		if (this.state.quantity < 1 || isNaN(this.state.quantity)) {
			await this.setState({
				quantity: 2,
			});
			await this.changeVal('decrement');
		}
	}
	quantityTextChange = async (text) => {
		console.log(text)
		text = parseInt(text)
		console.log(text)
		console.log('non in nan')
		if (isNaN(text)) {
			await this.setState({
				quantity: 0,
			});
		} else {
			if (text !== 0) {
				if (text >= this.props.minVal && text <= this.props.maxVal) {
					await this.setState({
						quantity: parseInt(text),
					});
					await this.props.QuentityChange(text)
				}
				else {
					await this.setState({
						quantity: this.state.quantity,
					});
					await this.props.QuentityChange(this.state.quantity)
				}
			} else {
				await this.setState({
					quantity: 2,
				});
				await this.changeVal('decrement');
			}
		}


	}
	render() {
		return (
			<View>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
					{this.props.title && this.props.title != '' && <Text style={[styles.titleText, this.props.titleStyle]}>{this.props.title}</Text>}
					<View style={styles.selectContainer}>
						<View style={styles.selectBox}>
							<TouchableOpacity style={[styles.mainTitleStyle]} onPress={() => this.changeVal('decrement')}
								testID={this.props.minusQua_TestId}
								accessibilityLabel={this.props.minusQua_TestId}
							>
								{/* <Image style={styles.plusMinusIcon} source={Icons.minus} /> */}
								<Text style={styles.plusMinusIcon}>-</Text>
							</TouchableOpacity>
							<TextInput maxLength={3} keyboardType="numeric" style={[styles.mainTitleStyle2, this.props.titleStyle]} numberOfLines={1} onChangeText={(text) => this.quantityTextChange(text)} onBlur={() => this.checkforzero()}
								testID={this.props.selectQuantity_TestId}
								accessibilityLabel={this.props.selectQuantity_TestId}
							>{this.state.quantity}</TextInput>

							{/* <TextInput
							inputStyle={{color:'#000'}}
							style={[styles.mainTitleStyle2, this.props.titleStyle]}
							value={this.state.quantity}
							onChangeText={this.quantityTextChange}
							//onSubmitEditing={this.handleEmailSubmitPress}
							//placeholder={Strings.EMAIL}
							//placeholderTextColor={Colors.GRAY_TEXT}
							//autoCorrect={false}
							keyboardType="numeric"
							returnKeyType="done"
							leftIcon={false}
							withBorder={false}
							//onBlur={this.handleEmailBlur}
							//error={emailError}
						/> */}
							<TouchableOpacity style={[styles.mainTitleStyle]} onPress={() => this.changeVal('increment')}
								testID={this.props.plusQua_TestId}
								accessibilityLabel={this.props.plusQua_TestId}
							>
								{/* <Image style={styles.plusMinusIcon} source={Icons.plus} /> */}
								<Text style={styles.plusMinusIcon}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
					{(this.props.StockText && this.props.StockText != '') ? <><Text style={[styles.InStockText, this.props.InStockTextStyle]}>{this.props.StockText}</Text></> : <></>}

				</View>
			</View>
		)
	}
}