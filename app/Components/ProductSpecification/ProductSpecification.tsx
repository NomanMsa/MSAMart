import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
const styles = require('./ProductSpecificationStyles');

export default class extends Component {
	static defaultProps = {
		onNavLink: () => { },
		slideInterval: 9000,
		bulletStyles: {},
		descPoints: [],
	}
	constructor(props) {
		super(props)
		this.state = {
			descPoints: [
				{
					icon: 'test',
					text: 'On the other hand',
				},
				{
					icon: 'test',
					text: 'On hand the other',
				},
				{
					icon: 'test',
					text: 'On other hand the',
				},
				{
					icon: 'test',
					text: 'On the other hand',
				},
			],
		}
		this.renderDescPoints = this.renderDescPoints.bind(this);
	}

	renderDescPoints = ({ item, index }) => {
		const { onNavLink } = this.props;
		return <View key={index} style={[styles.pointContainer, this.props.pointContainerStyle]} onPress={() => onNavLink(item)}>
			<View style={[styles.bullet, this.props.bulletStyles]}></View>
			<Text style={styles.pointText}>{item.SpecificationAttributeName} <Text style={styles.pointText}>{item.ValueRaw} </Text> </Text>
		</View>
	}
	render() {
		return (
			<View style={styles.descContainer}>
				<View style={styles.titleBlock}>
					<Text style={styles.productTitle}
						testID={this.props.testId}
						accessibilityLabel={this.props.testId}
					>{this.props.title}</Text>
				</View>
				<View style={styles.descriptionBlock}>
					<Text style={styles.descriptionText}>{this.props.description}</Text>
				</View>
				<View style={styles.descPtBlock}>
					<FlatList
						data={this.props.descPoints}
						renderItem={this.renderDescPoints}
						keyExtractor={(item, index) => index}
					/>
				</View>
			</View>
		)
	}
}