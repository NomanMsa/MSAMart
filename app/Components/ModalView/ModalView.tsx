import React, { Component } from 'react'
import { Modal, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Images, Icons } from '@assets';

const styles = require('./ModalViewStyles');

export default class extends Component {
	static defaultProps = {
		onPressClose: () => { },
		modalVisible: false,
		title: '',
	}
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false
		};
	}
	render() {
		const { modalVisible } = this.props;
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						console.log("Modal has been closed.");
					}}
				>
					<View style={styles.overlay}>
						<View style={styles.centeredView}>
							<View style={styles.modalTitle}>
								<View style={{ flex: 1 }}>
								</View>
								<View style={styles.titleTextCont}>
									<Text style={styles.modalTitleText}>{this.props.title}</Text>
								</View>
								<TouchableOpacity
									style={styles.closeBtn}
									onPress={() => {
										this.props.onPressClose(false);
									}}
								>
									<Image style={styles.crossIcon} source={Icons.cross} />
								</TouchableOpacity>
							</View>
							<ScrollView
								showsVerticalScrollIndicator={false}
							>
								{this.props.children}
							</ScrollView>
						</View>
					</View>
				</Modal>
			</View>
		)
	}
}