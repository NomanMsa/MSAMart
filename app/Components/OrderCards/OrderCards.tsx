import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, } from 'react-native'
import { Icons, Images, Loaders } from '@assets';
import { FormatDate } from '@utils'
const styles = require('./OrderCardsStyles');

export default class extends Component {
	static defaultProps = {
		onSelect: () => { },
	}
	constructor(props) {
		super(props)
		/* this.state = {
	   } */
	}

	render() {
		return (<>
			{this.props.orders.map((item, i) => (<>
				<TouchableOpacity key={i} style={[styles.cardContainer]} 
				 testID={this.props.testID}
				 accessibilityLabel={this.props.testID}
				 onPress={() => this.props.onSelect(item, i)}>
					{/* <Text style={{color:'#000'}}>{item.orderNumber}</Text> */}
					<View style={styles.orderBlocks}>
						<Text style={styles.orderHeaderTxt}>Order No. [<Text style={styles.orderHeaderTxtPrimary}>{item.CustomOrderNumber}</Text>]</Text>
					</View>
					<View style={[styles.orderBlocks, styles.orderBlockBorder]}>
						<View style={styles.detailContainer}>
							<View style={styles.detailBlock}>
								<Text style={styles.detailHeaderTxt}>Date Ordered</Text>
								<Text style={styles.detailTxt}>{FormatDate.formatDate(item.CreatedOn, 'dd/mm/yyyy')}</Text>
							</View>
							<View style={styles.detailBlock}>
								<Text style={styles.detailHeaderTxt}>Order Status</Text>
								<Text style={styles.detailTxt}>{item.OrderStatus}</Text>
							</View>
							<View style={styles.detailBlock}>
								<Text style={styles.detailHeaderTxt}>Order Amount</Text>
								<Text style={styles.detailTxt}>{item.OrderTotal}</Text>
							</View>
						</View>
					</View>
					<View style={styles.orderBlocks}>
						{item.CustomProperties.OrderMultiVenderMessage && <View style={styles.bottomBox}>
							<View style={styles.bellContainer}>
								<Image style={styles.bottomBellImage} source={Icons.bellIco} />
							</View>
							<View style={styles.btmTxtContainer}>
								<Text style={styles.multiSellerText}>You bought from different sellers so your items will be delivered in separate shipments</Text>
							</View>
						</View>}
					</View>
				</TouchableOpacity>
			</>)
			)}
		</>)
	}
}