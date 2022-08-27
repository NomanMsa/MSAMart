import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Modal
} from 'react-native';
import { Images, Loaders } from '@assets';
import { default as Star } from '../StarRatings/Star.tsx';
import { default as TapRating } from '../StarRatings/TapRating.tsx';
import { default as FeedbackProgressBar } from '../FeedbackProgressBar/FeedbackProgressBar.tsx';
import { default as Button } from '../Button/Button.tsx';
import{ProductReview}from '../ProductReview/ProductReview.tsx';
import { Colors } from '@theme';
import { ServiceCall } from '@utils';
import { Api, Constants } from '@config';

const styles = require('./UserFeedbackStyle');
const { width, height } = Dimensions.get('window');
var prdata=[];
var FiveStarRating;
var FourStarRating;
var ThreeStarRating;
var TwoStarRating;
var OneStarRating;
export default class extends Component {
  static defaultProps = {
    onNavLink: () => { },
    slideInterval: 9000,
    bulletStyles: {},
  };

  constructor(props) {
    super(props);
    this.GetReview();
   
    //this.calculaterating();
    this.state = {
      dataLimitIncrementBy: prdata.length,
      dataLimit: 1,
      data:[],
      showIndex: 0,
      reviewCommentLimit: 50,
      isReadMore: false,
    };
    
    this.GetReview = this.GetReview.bind(this);
    //this.calculaterating = this.calculaterating.bind(this);
    this.renderTopLeft = this.renderTopLeft.bind(this);
    this.renderReviewItem = this.renderReviewItem.bind(this);
    this.renderImageGallary = this.renderImageGallary.bind(this);
    this.renderSubmitRating = this.renderSubmitRating.bind(this);
    this.renderBotton = this.renderBotton.bind(this);
  }
  
  GetReview= async () => {
    let Service = {
      apiUrl: Api.GetReview +'?productId='+this.props.Id,
      methodType: 'GET',
      headerData: { 'Content-Type': 'application/json' },
      onSuccessCall:function(data){
        console.log("success*/*/**/*/*/*/*",data);
        prdata = data.model.Items;
       
        var five=[]
        var four=[]
        var three=[]
        var two=[]
        var one=[]
        var total = prdata.length;
       if(total>0){
        for(var i=0;i<total;i++){
          if(prdata[i].Rating==5){
            five.push(prdata[i]);
          }
          if(prdata[i].Rating==4){
            four.push(prdata[i])
          }
          if(prdata[i].Rating==3){
            three.push(prdata[i])
          }
          if(prdata[i].Rating==2){
            two.push(prdata[i])
          }
          if(prdata[i].Rating==1){
            one.push(prdata[i])
          }
        }
       var fnum = five.length * 100 / total
       var fonum =four.length * 100 / total;
       var trnum = three.length * 100 / total;
       var twnum = two.length * 100 / total;
       var onum = one.length * 100 / total;
      FiveStarRating = fnum.toFixed(2); 
      FourStarRating = fonum.toFixed(2);
      ThreeStarRating = trnum.toFixed(2);
      TwoStarRating = twnum.toFixed(2)
      OneStarRating = onum.toFixed(2);
       }
      },
     
  };
  const serviceResponse = await ServiceCall(Service);
}
onclickreadmore(){
  if(this.state.isReadMore){
    this.setState({isReadMore: false})
  }else{
    this.setState({isReadMore: true})
  }
  
 this.render
  console.log(this.state.isReadMore);
}
loadmorereview(){
  this.setState({
    dataLimit:
      this.state.dataLimit + this.state.dataLimitIncrementBy,
  })

}
    
  
  renderTopLeft = () => {
    return (
      <View
        style={[styles.topLeft, this.props.topLeftStyle]}
        onPress={() => console.log(this.props)}>
        <View
          style={[
            styles.bottomRightContainer,
            this.props.bottomRightContainerStyle,
          ]}
          onPress={() => console.log("")}>
          <Text style={[styles.bottomLeftText, this.props.bottomLeftTextStyle]}>
            {this.state.data}{' '}
          </Text>
          <Star
            count={5}
            defaultRating={5}
            showRating={true}
            isDisabled={true}
            showTitle={false}
            fill={1}
            selectedColor={Colors.SECONDAY_COLOR}
            size={30}
            starStyle={{ margin: 1 }}
            starContainerStyle={{ marginRight: 5 }}
          />

          <Text style={[styles.TopCenterText, this.props.TopCenterTexttyle]}>
            {'  '} {prdata.length} {"Reviews"}
          </Text>
        </View>
      </View>
    );
  };

  renderReviewItem = (item, index) => {
    return (
      <View key={index}
        style={[styles.reviewItem, this.props.reviewItemTextStyle]}
        onPress={() => console.log(this.item.item)}>
        {/* <Text style={styles.pointText}>{this.props.zone}</Text> */}
        <View style={[styles.StarContainer, this.props.StarContainer]}>
          <TapRating
            count={5}
            defaultRating={item.item.Rating}
            showRating={false}
            isDisabled={true}
            showTitle={false}
            size={15}
            starStyle={{ margin: 1 }}
            starContainerStyle={{ marginRight: 5 }}
          />
        </View>
        <Text style={[styles.ListTitleText, this.props.ListTitleText]}>
          {item.item.Title}
        </Text>
        <Text style={[styles.readMore, this.props.readMore]}>
          {this.state.isReadMore ? (
            item.item.ReviewText
          ) : (
              <Text style={[styles.readMore, this.props.readMore]}>
                  {item.item.ReviewText.length > this.state.reviewCommentLimit ? 
                  item.item.ReviewText.substring(0,50):item.item.ReviewText}
              </Text>
            )}
        </Text>
        {item.item.ReviewText.length > this.state.reviewCommentLimit &&(<>
        {}
        <TouchableOpacity  onPress={() => this.onclickreadmore()}>
            <Text
              style={[styles.middleRightText]}>
              Read more
            </Text>
          </TouchableOpacity>
          </>)}
        {/* {item.item.product_img.length ? (
          <ScrollView horizontal={true}>
            {item.item.product_img.map((item, i) => (
              <View key={i} >
                <Image
                  style={[styles.slideImg, this.props.slideImg]}
                  source={{
                    uri: item.img,
                  }}
                  loadingIndicatorSource={Loaders.imageLoader}></Image>
              </View>
            ))}
          </ScrollView>
        ) : (
            <View></View>
          )} */}

        <Text style={[styles.bottomRightText, this.props.bottomRightTextStyle]}>
          {/* {'Publish'} {item.item.reviewPeriod} {item.item.reivewPeriodStamp}{' '} */}
          {'ago by'} {item.item.CustomerName}
        </Text>
      </View>
    );
  };

  renderImageGallary = () => {
    <View onPress={() => console.log(this.props)}>
      <Image
        style={[styles.slideImg, this.props.slideImgStyle]}
        source={{
          uri:
            'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68 ',
        }}
        loadingIndicatorSource={Loaders.imageLoader}></Image>
    </View>;
  };

  renderCustomerReviewList = () => {
    return (
      <FlatList
        data={this.state.data.Items}
        //extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={(item) => this.renderReviewItems(item)}
      />
    );
  };
 

  renderSubmitRating = () => {
    return (
      <View style={[styles.submitRating, this.props.submitRatingStyle]}>
        <TapRating
          count={5}
          reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
          defaultRating={5}
          showRating={false}
          isDisabled={false}
          showTitle={true}
          title={'Rate this product'}
          titleStyle={{
            fontSize: 16,
            color: 'gray',
            fontWeight: "400",
            marginBottom: 20,
          }}
          size={40}
        />
        <View style={[styles.bottomRow, this.props.bottomRowStyle]}>
          <TouchableOpacity>
          <Text style={[styles.bottomText, this.props.bottomTextStyle]}>
            Submit Rating
          </Text>
          </TouchableOpacity>
          <Text style={[styles.bottomsText, this.props.bottomsTextTextStyle]}>
            {' '}
            l{' '}
          </Text>
          <TouchableOpacity>
          <Text style={[styles.bottomText, this.props.bottomTextStyle]}>
            Write a Review
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderBotton = () => {
    return (
      <View
        style={[
          styles.bottomLeftContainer,
          this.props.bottomLeftContainerStyle,
        ]}
        onPress={() => console.log(this.props)}>
        <Text style={[styles.netPrice, this.props.netPriceStyle]}>
          {this.props.currencyText} {this.props.netPrice}{' '}
          <Text
            style={[
              styles.discountedPriceText,
              this.props.discountedPriceStyle,
            ]}>
            {this.props.currencyText} {this.props.discountedPrice}
          </Text>
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Button
            title={'Buy Now'}
            btnStyle={{ borderWidth: 0, width: (width / 2) - 30 }}
            titleStyle={{ color: Colors.WHITE }}
          />

          <Button
            title={'Add to cart'}
            btnStyle={{
              borderWidth: 0,
              backgroundColor: Colors.PRIMARY_DARK_BTN,
              width: (width / 2) - 30,
            }}
            titleStyle={{ color: Colors.WHITE }}
          />
        </View>
      </View>
    );
  };
 
  render() {
    
    return (
      <View>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Product Review</Text>
          {this.renderTopLeft()}
          <FeedbackProgressBar
            FiveStarRating={FiveStarRating}
            FourStarRating={FourStarRating}
            ThreeStarRating={ThreeStarRating}
            TwoStarRating={TwoStarRating}
            OneStarRating={OneStarRating}
          />
          <View style={{ paddingBottom: 25 }}>
         {/* {this.renderReviewItem()} */}
          
            <FlatList
              data={prdata.slice(0,this.state.dataLimit)}
              renderItem={this.renderReviewItem}
              keyExtractor={(item, index) => index}
            />
            {prdata.length > this.state.dataLimit ? (
              <TouchableOpacity
                onPress={() =>
                  this.loadmorereview()
                }>
                <Text style={styles.bottomText}>Load more reviews</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
              onPress={() =>
                this.setState({
                  dataLimit:1
                })
              }>
              <Text style={styles.bottomText}>See less</Text>
            </TouchableOpacity>
              )}
          </View>

          {/* {this.renderSubmitRating()} */}
        </View>
        
        {/* {this.renderBotton()} */}
      </View>
    );
  }
}
