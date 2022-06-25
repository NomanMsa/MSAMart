import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { Images, Loaders } from '@assets';
import { default as Star } from '../StarRatings/Star.tsx';
import { default as TapRating } from '../StarRatings/TapRating.tsx';
import { default as FeedbackProgressBar } from '../FeedbackProgressBar/FeedbackProgressBar.tsx';
import { default as Button } from '../Button/Button.tsx';
import { Colors } from '@theme';

const styles = require('./UserFeedbackStyle');
const { width, height } = Dimensions.get('window');

export default class extends Component {
  static defaultProps = {
    onNavLink: () => { },
    slideInterval: 9000,
    bulletStyles: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      dataLimitIncrementBy: 1,
      dataLimit: 1,
      data: this.props.data.slice(0, 2),
      showIndex: 0,
      reviewCommentLimit: 150,
      isReadMore: false,
    };
    this.renderTopLeft = this.renderTopLeft.bind(this);
    this.renderReviewItem = this.renderReviewItem.bind(this);
    this.renderImageGallary = this.renderImageGallary.bind(this);
    this.renderSubmitRating = this.renderSubmitRating.bind(this);
    this.renderBotton = this.renderBotton.bind(this);
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
          onPress={() => console.log(this.props)}>
          <Text style={[styles.bottomLeftText, this.props.bottomLeftTextStyle]}>
            {this.props.OverallProductReview}{' '}
          </Text>
          <Star
            count={this.props.totalStars}
            defaultRating={this.props.ratedStars}
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
            {'  '} {this.props.totalReviews} {this.props.reviewText}
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
            defaultRating={item.item.rating}
            showRating={false}
            isDisabled={true}
            showTitle={false}
            size={15}
            starStyle={{ margin: 1 }}
            starContainerStyle={{ marginRight: 5 }}
          />
        </View>
        <Text style={[styles.ListTitleText, this.props.ListTitleText]}>
          {item.item.reviewTitle}
        </Text>
        <Text style={[styles.readMore, this.props.readMore]}>
          {this.state.isReadMore ? (
            item.item.reiviewComment
          ) : (
              <Text style={[styles.readMore, this.props.readMore]}>
                {item.item.reiviewComment.length < this.state.reviewCommentLimit
                  ? item.item.reiviewComment
                  : item.item.reiviewComment.substring(
                    0,
                    this.state.reviewCommentLimit,
                  )}{' '}
              </Text>
            )}
          <TouchableOpacity
          // onPress={() =>
          //   this.setState({isReadMore: this.state.isReadMore ? true : false})
          //}
          >
            <Text
              style={[styles.middleRightText, this.props.middleRightTextStyle]}>
              Read more
            </Text>
          </TouchableOpacity>
        </Text>

        {item.item.product_img.length ? (
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
          )}

        <Text style={[styles.bottomRightText, this.props.bottomRightTextStyle]}>
          {'Publish'} {item.item.reviewPeriod} {item.item.reivewPeriodStamp}{' '}
          {'ago by'} {item.item.customerName}
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
        data={this.stete.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={(item) => this.renderReviewItem(item)}
      />
    );
  };

  renderSubmitRating = () => {
    return (
      <View style={[styles.submitRating, this.props.submitRatingStyle]}>
        <TapRating
          count={5}
          reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
          defaultRating={3}
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
          <Text style={[styles.bottomText, this.props.bottomTextStyle]}>
            Submit Rating
          </Text>
          <Text style={[styles.bottomsText, this.props.bottomsTextTextStyle]}>
            {' '}
            l{' '}
          </Text>
          <Text style={[styles.bottomText, this.props.bottomTextStyle]}>
            Write a Review
          </Text>
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
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.title}</Text>
          {this.renderTopLeft()}
          <FeedbackProgressBar
            FiveStarRating={this.props.FiveStarRating}
            FourStarRating={this.props.FourStarRating}
            ThreeStarRating={this.props.ThreeStarRating}
            TwoStarRating={this.props.TwoStarRating}
            OneStarRating={this.props.OneStarRating}
          />
          <View style={{ paddingBottom: 25 }}>
            <FlatList
              data={this.props.data.slice(0, this.state.dataLimit)}
              renderItem={this.renderReviewItem}
              keyExtractor={(item, index) => index}
            />
            {this.props.data.length != this.state.dataLimit ? (
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    dataLimit:
                      this.state.dataLimit + this.state.dataLimitIncrementBy,
                  })
                }>
                <Text style={styles.bottomText}>Load more reviews</Text>
              </TouchableOpacity>
            ) : (
                <Text></Text>
              )}
          </View>

          {this.renderSubmitRating()}
        </View>
        {this.renderBotton()}
      </View>
    );
  }
}
