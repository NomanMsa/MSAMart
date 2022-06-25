import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, } from 'react-native'


const styles = require('./AddressCardsV2Styles');
const { width, height } = Dimensions.get('window')

export default class extends Component {
	static defaultProps = {
		onSelect: () => { },
	}
	constructor(props) {
		super(props);
		this.GetFullAddress = this.GetFullAddress.bind(this);

	}
	

	GetFullAddress = (item) => {
		let fullAddress = "";
		if(item.Address1 && item.Address1.length > 0){
			fullAddress = fullAddress + item.Address1;
		}
		if(item.City && item.City.length > 0){
			fullAddress =fullAddress + " ," +  item.City;
		}
		if(item.StateProvinceName && item.StateProvinceName.length > 0){
			fullAddress =fullAddress + " ," +  item.StateProvinceName;
		}
		if(item.ZipPostalCode && item.ZipPostalCode.length > 0){
			fullAddress =fullAddress + " ," +  item.ZipPostalCode;
		}
		if(item.CountryName && item.CountryName > 0){
			fullAddress =fullAddress + " ," +  item.CountryName;
		}
		return fullAddress;
	  }

	render() {
		return (<>
			{this.props.addressData.map((item, i) => (<>{item.CustomProperties.IsDefaultAddress ? <TouchableOpacity key={i} onPress={() => this.props.onSelect(item, i)} style={[styles.cardContainer, this.props.styles, styles.cardSelected]}
				testID={this.props.defaultAddTestId}
				accessibilityLabel={this.props.defaultAddTestId}
			>
				<View style={[styles.titleRow, this.props.titleRowStyles]}>
					<View style={styles.titleContainer}>
						<Text style={[styles.titleText, styles.titleSelected]}>{item.FirstName} {item.LastName}</Text>
					</View>
					<View style={[styles.chkBoxOuter, styles.chkBoxOuterSelected]}

						testID={this.props.defaultAddTestId}
						accessibilityLabel={this.props.defaultAddTestId}>
						<View style={styles.chkBoxInner}>
						</View>
					</View>
				</View>
				<View style={styles.addressContainer}>
					<View style={[styles.addressRow, this.props.addressRowStyles]}>
						<Text style={styles.addressTitleText}
							testID={this.props.nameAddTestId}
							accessibilityLabel={this.props.nameAddTestId}
						>Name</Text>
						<Text style={styles.addressText}>{item.FirstName} {item.LastName}</Text>
					</View>
					<View style={[styles.addressRow, this.props.addressRowStyles]}>
						<Text style={styles.addressTitleText}>Address</Text>
						<Text style={styles.addressText}>{item.Address1}</Text>
					</View>
					<View style={[styles.addressRow, this.props.addressRowStyles]}>
						<Text style={styles.addressTitleText}>Phone number</Text>
						<Text style={styles.addressText}>{item.PhoneNumber}</Text>
					</View>
				</View>
				<View style={[styles.buttonRow, this.props.buttonRowStyles]}>
					<Text style={styles.btnTxt} onPress={() => this.props.onEditAddr(item, i)}
						testID={this.props.editAddTestId}
						accessibilityLabel={this.props.editAddTestId}
					>Edit</Text>
					<Text style={[styles.btnTxt, styles.btnBorder]} onPress={() => this.props.onDeleteAddr(item, i)}
						testID={this.props.deleteAddTestId}
						accessibilityLabel={this.props.deleteAddTestId}
					>Delete</Text>
				</View>
			</TouchableOpacity>
				:
				<TouchableOpacity key={i} onPress={() => this.props.onSelect(item, i)} style={[styles.cardContainer, this.props.styles, styles.cardUnSelected]}
					testID={this.props.onAddOneTestId}
					accessibilityLabel={this.props.onAddOneTestId}
				>
					<View style={[styles.titleRow, this.props.titleRowStyles]}>
						<View style={styles.titleContainer}>
							<Text style={[styles.titleText, styles.titleUnSelected]}>{item.FirstName} {item.LastName}</Text>
						</View>
						<View style={styles.chkBoxOuter}>
						</View>
					</View>
					<View style={styles.addressContainer}>
						<View style={[styles.addressRow, this.props.addressRowStyles]}>
							<Text style={styles.titleText}
								testID={this.props.nameAddTestId}
								accessibilityLabel={this.props.nameAddTestId}

							>Name</Text>
							<Text style={styles.addressText}>{item.FirstName} {item.LastName}</Text>
						</View>
						<View style={[styles.addressRow, this.props.addressRowStyles]}>
							<Text style={styles.titleText}>Address</Text>
							<Text style={styles.addressText}>{this.GetFullAddress(item)}</Text>
						</View>
						<View style={[styles.addressRow, this.props.addressRowStyles]}>
							<Text style={styles.titleText}>Phone number</Text>
							<Text style={styles.addressText}>{item.PhoneNumber}</Text>
						</View>
					</View>
					<View style={[styles.buttonRow, this.props.buttonRowStyles]}>
						<Text style={styles.btnTxt} onPress={() => this.props.onEditAddr(item, i)}
							testID={this.props.editAddTestId}
							accessibilityLabel={this.props.editAddTestId}
						>Edit</Text>
						<Text style={[styles.btnTxt, styles.btnBorder]} onPress={() => this.props.onDeleteAddr(item, i)}
							testID={this.props.deleteAddTestId}
							accessibilityLabel={this.props.deleteAddTestId}
						>Delete</Text>
					</View>
				</TouchableOpacity>}</>))}
		</>)
	}
}