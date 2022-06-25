import React, { Component } from 'react'
import { Text, View, TouchableOpacity, } from 'react-native'

const styles = require('./AddressCardsStyles');

export default class extends Component {
	static defaultProps = {
		onSelect: () => { },
	}
	constructor(props) {
		super(props)

	}

	render() {
		return (<>
			{this.props.addressData.map((item, i) => (<>{item.selected ? <TouchableOpacity key={i} onPress={() => this.props.onSelect(item, i)} style={[styles.cardContainer, this.props.styles, styles.cardSelected]}>
				<View style={[styles.titleRow, this.props.titleRowStyles]}>
					<View style={styles.chkBoxOuter}>
						<View style={styles.chkBoxInner}>
						</View>
					</View>
					<View style={styles.titleContainer}>
						<Text style={[styles.titleText, styles.titleSelected]}>Address {i + 1}{i == 0 && '(Default)'}</Text>
					</View>
				</View>
				<View style={[styles.addressRow, this.props.addressRowStyles]}>
					<Text style={styles.addressText}>{item.Address1}, {item.Address2}</Text>
					<Text style={styles.addressText}>{item.City}</Text>
					<Text style={styles.addressText}>{item.StateProvinceName}</Text>
					<Text style={styles.addressText}>{item.ZipPostalCode}</Text>
					<Text style={styles.addressText}>{item.CountryName}</Text>
				</View>
				<View style={[styles.buttonRow, this.props.buttonRowStyles]}>
					<Text style={styles.btnTxt} onPress={() => this.props.onEditAddr(item, i)} >Edit</Text>
					<Text style={styles.btnTxt} onPress={() => this.props.onDeleteAddr(item, i)} >Delete</Text>
				</View>
			</TouchableOpacity>
				:
				<TouchableOpacity key={i} onPress={() => this.props.onSelect(item, i)} style={[styles.cardContainer, this.props.styles, styles.cardUnSelected]}>
					<View style={[styles.titleRow, this.props.titleRowStyles]}>
						<View style={styles.chkBoxOuter}>
						</View>
						<View style={styles.titleContainer}>
							<Text style={[styles.titleText, styles.titleUnSelected]}>Address {i + 1}{i == 0 && '(Default)'}</Text>
						</View>
					</View>
					<View style={[styles.addressRow, this.props.addressRowStyles]}>
						<Text style={styles.addressText}>{item.Address1}, {item.Address2}</Text>
						<Text style={styles.addressText}>{item.City}</Text>
						<Text style={styles.addressText}>{item.StateProvinceName}</Text>
						<Text style={styles.addressText}>{item.ZipPostalCode}</Text>
						<Text style={styles.addressText}>{item.CountryName}</Text>
					</View>
					<View style={[styles.buttonRow, this.props.buttonRowStyles]}>
						<Text style={styles.btnTxt} onPress={() => this.props.onEditAddr(item, i)} >Edit</Text>
						<Text style={styles.btnTxt} onPress={() => this.props.onDeleteAddr(item, i)} >Delete</Text>
					</View>
				</TouchableOpacity>}</>))}
		</>)
	}
}