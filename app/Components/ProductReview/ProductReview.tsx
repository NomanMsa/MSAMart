import React, { Component } from 'react'
import { Text, View, TextInput, } from 'react-native'
import { Images, Icons } from '@assets';
import TapRating from '../StarRatings/TapRating';
import Button from '../Button/Button';
import { Colors } from "@theme";
const styles = require('./ProductReviewStyles');
export default class extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		modalVisible: false
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	render() {
		const { modalVisible } = this.state;
		return (<>
			<TapRating
				count={5}
				defaultRating={3}
				showRating={false}
				isDisabled={false}
				showTitle={true}
				title={'Rate this product'}
				titleStyle={{ fontSize: 16, color: Colors.DARK_GRAY_TEXT, fontWeight: 'normal', marginBottom: 20 }}
				size={24}
			/>
			<View style={styles.Inputbox}>
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Your Name</Text>
					<TextInput style={styles.Textinput} placeholder="Type your Name" />
				</View>
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Review Title</Text>
					<TextInput style={styles.Textinput} placeholder="Title of your review" />
				</View>
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Your Review</Text>
					<TextInput style={styles.Textarea} multiline={true} numberOfLines={4} placeholder="Type your review" />
				</View>
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Upload Photos</Text>
					<Button
						title={'Choose from gallery'}
						rightIcon={true}
						iconPath={Icons.upload}
						btnStyle={{ borderWidth: 1, borderColor: Colors.DARK_GRAY_TEXT, backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD, width: "100%", marginLeft: 0, marginRight: 0, height: 40, marginTop: 0, textAlign: 'left', paddingLeft: 15, borderRadius: 15, justifyContent: 'flex-start', }}
						titleStyle={{ color: Colors.GRAY_TEXT, fontSize: 12, paddingLeft: 0, marginLeft: 0, textAlign: 'left', textTransform: 'none', }}
					/>
				</View>
				<View style={styles.Inputbtn}>
					<Button
						title={'SUBMIT'}
						btnStyle={{ borderWidth: 0, width: "48%", margin: 0, padding: 0, marginLeft: 0, marginRight: 5, height: 40, }}
						titleStyle={{ color: Colors.WHITE, fontSize: 16, margin: 0, padding: 0 }}
					/>
					<Button
						title={'CANCEL'}
						btnStyle={{ borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, width: "48%", marginLeft: 5, marginRight: 0, height: 40, }}
						titleStyle={{ color: Colors.PRIMARY, fontSize: 16 }}
					/>
				</View>
			</View>
		</>)
	}
}