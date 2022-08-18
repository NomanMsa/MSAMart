import React, { Component } from 'react'
import { Text, View, TextInput,Alert} from 'react-native'
import Modal from "react-native-modal";
import { Images, Icons } from '@assets';
import TapRating from '../StarRatings/TapRating';
import Button from '../Button/Button';
import { Colors } from "@theme";
const styles = require('./ProductReviewStyles');
import { ServiceCall } from '@utils';
import { Api, Constants } from '@config';
import Toast from 'react-native-simple-toast';
import TxtFieldField from '../TxtField/TxtFieldField/TxtFieldField.tsx';
var raedstar=5;
var title='';
var reviewtext='';
var Name='';
export default class extends Component {
	
	constructor(props) {
		super(props)
	}
	state = {
		modalVisible: this.props.modalVisible
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
		this.props.oncancel()
	}

	
	changetitle=(text)=>{
		title = text
		console.log(text);
	}
	changereview(text){
		reviewtext = text;
		console.log(text);	
	}
	submiReviews=()=>{
		var AddProductReview={
			"Title":title,
			"ReviewText":reviewtext,
			"Rating":raedstar,
			"ReviewId": this.props.data != null ?this.props.data.Id:0
		};
		
		let Service = {
			apiUrl:Api.AddReview+'?productId='+this.props.Id,
			methodType: 'POST',
			headerData: { 'Content-Type': 'application/json' },
			bodyData:JSON.stringify({
				AddProductReview
			}),
			onSuccessCall: this.submitSuccess,
		}
		const serviceResponse =  ServiceCall(Service);
	}
	submitSuccess=(data)=>{
		this.setModalVisible(false);
		this.props.onsubmit();
		setTimeout(async () => {
			Toast.showWithGravity(data.AddProductReview.Result, Toast.LONG, Toast.BOTTOM);
          
        }, 500);
		
	}
	render() {
		const { modalVisible } = this.state;
		return (<>
		 <Modal style={styles.modalView} isVisible={modalVisible}>
			<TapRating
				count={5}
				defaultRating={this.props.data != null ?this.props.data.Rating :5}
				showRating={true}
				isDisabled={false}
				showTitle={true}
				title={'Rate this product'}
				titleStyle={{ fontSize: 16, color: Colors.DARK_GRAY_TEXT, fontWeight: 'normal', marginTop: 50 }}
				size={24}
				onFinishRating={this.ratingCompleted}
			/>
			<View style={styles.Inputbox}>
				{/* <View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Your Name</Text>
					<TextInput style={styles.Textinput} placeholder="Type your Name" onChangeText={this.changename}/>
				</View> */}
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Review Title</Text>
					<TxtFieldField style={styles.Textinput} placeholder="Title of your review"  value={this.props.data != null ? this.props.data.Title:''} onChangeText={this.changetitle}/>
				</View>
				<View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Your Review</Text>
					<TxtFieldField style={styles.Textarea} multiline={true} numberOfLines={4} placeholder="Type your review" value={this.props.data != null ? this.props.data.ReviewText:''} onChangeText={this.changereview} />
				</View>
				{/* <View style={styles.Inputrow}>
					<Text style={styles.Inputlabel}>Upload Photos</Text>
					<Button
						title={'Choose from gallery'}
						rightIcon={true}
						iconPath={Icons.upload}
						btnStyle={{ borderWidth: 1, borderColor: Colors.DARK_GRAY_TEXT, backgroundColor: Colors.LIGHT_GRAY_COLOR_UPLOAD, width: "100%", marginLeft: 0, marginRight: 0, height: 40, marginTop: 0, textAlign: 'left', paddingLeft: 15, borderRadius: 15, justifyContent: 'flex-start', }}
						titleStyle={{ color: Colors.GRAY_TEXT, fontSize: 12, paddingLeft: 0, marginLeft: 0, textAlign: 'left', textTransform: 'none', }}
					/>
				</View> */}
				<View style={styles.Inputbtn}>
					<Button
						title={'SUBMIT'}
						btnStyle={{ borderWidth: 0, width: "48%", margin: 0, padding: 0, marginLeft: 0, marginRight: 5, height: 40, }}
						titleStyle={{ color: Colors.WHITE, fontSize: 16, margin: 0, padding: 0 }}
						OnClick={()=>this.submiReviews()}
					/>
					<Button
						title={'CANCEL'}
						btnStyle={{ borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, width: "48%", marginLeft: 5, marginRight: 0, height: 40, }}
						titleStyle={{ color: Colors.PRIMARY, fontSize: 16 }}
						OnClick={()=>this.setModalVisible(false) }
					/>
				</View>
			</View>
			</Modal>
		</>)
	}
}