import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,

} from 'react-native';
import { Icons, } from '@assets';
import colors from '../../Theme/Colors';

const styles = require('./CartSummaryStyles');

export default class extends Component {
  static defaultProps = {
    onNavLink: () => { },
    slideInterval: 9000,
    bulletStyles: {},
    showAddress: '',
    OnCoupenCodeUpdate: () => { },
    OnCoupenApplyClick: () => { },
    OnCoupenCancel: () => { },
    OnGiftCartToolTipClick: () => { },
    OnGiftCartCancel: () => { },
    OnAddressChange: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [
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
    };

    this.renderTitleValue = this.renderTitleValue.bind(this);
    this.renderGiftCard = this.renderGiftCard.bind(this);
    this.renderDelivery = this.renderDelivery.bind(this);
    this.renderPaymentIconList = this.renderPaymentIconList.bind(this);
    this.renderAddressList = this.renderAddressList.bind(this);
  }

  coupenPlaceHolderFunction = (text) => {
  };

  renderGiftCardList = ({ item, index }) => {
    return (
      <View key={index} style={[styles.ValueList, this.props.ValueListStyles]}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={styles.NormalText}>
            {'Gift Card:'}
          </Text>
          <TouchableOpacity onPress={() => this.props.OnGiftCartToolTipClick(item)}>
            <Image
              style={{ height: 20, width: 20 }}
              source={Icons.tooltipIco}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={styles.NormalText}>{item.Amount}</Text>
          <TouchableOpacity style={styles.CoupenCancelContainer} onPress={() => this.props.OnGiftCartCancel(item)}>
            <Image
              style={[styles.CoupenCancelIcons, this.props.CoupenCancelIconsStyles]}
              source={Icons.cross}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderTitleValue = ({ item, index }) => {
    console.log("Item", item)

    return (<>{item.value ?
      <View key={index} style={[styles.ValueList, this.props.ValueListStyles]}>
        <Text style={styles.NormalText}
          testID={item.testId}
          accessibilityLabel={item.testId}
        >
          {item.title} {':'}
        </Text>
        <Text style={styles.NormalText}>{item.value}</Text>
      </View>
      :
      <></>
    }</>
    );
  };

  renderAddressList = ({ item, index }) => {
    return (
      <View key={index}
        style={[styles.addressContainer, this.props.addressContainerStyles]}>
        <Text style={[styles.boldGrayText, this.props.boldGrayTextStyles]}>
          {item.placeTitle}
        </Text>
        <Text style={[styles.simpleGrayText, this.props.adressTextStyle]}
        >
          {item.address.FirstName+" "+item.address.LastName+','+item.address.Address1 +','+ item.address.Address2+', '+
	item.address.City +', '+ item.address.StateProvinceName +'-'+ item.address.ZipPostalCode}
        </Text>
      </View>
    );
  };

  renderPaymentIconList = ({ item, index }) => {
    return (
      <View key={index}>
        <Image
          style={[styles.paymentIcons, this.props.paymentIconsStyles]}
          source={item.image}
        />
      </View>
    );
  };

  renderAppliedCoupenList = ({ item, index }) => {
    return (
      <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', }}>
        <View
          style={[styles.CoupenListContainer, this.props.addressContainerStyles]}>
          <Text style={[styles.simpleGrayText, this.props.adressTextStyle]}>
            {item.CouponCode}
          </Text>
        </View>
        <TouchableOpacity style={styles.CoupenCancelContainer} onPress={() => this.props.OnCoupenCancel(item)}
          testID={this.props.remove_CoupenCode_TestId}
          accessibilityLabel={this.props.remove_CoupenCode_TestId}
        >
          <Image
            style={[styles.CoupenCancelIcons, this.props.CoupenCancelIconsStyles]}
            source={Icons.cross}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderGiftCard = () => {
    return (
      <View style={{}}>
        <View
          style={[
            styles.giftCartContainer,
            this.props.giftCartContainerStyles,
          ]}
          testID="discountCouponInput"
          accessibilityLabel="discountCouponInput"
        >
          {this.props.CoupenCode != '' ?
            <TextInput
              style={{
                height: 40,
                flex: 1,
                marginLeft: 10,
                placeholderTextColor: 'gray',
                borderRadius: 25,

              }}
              value={this.props.CoupenCode}
              placeholder={this.props.coupenPlaceHolder}
              onChangeText={(text) => this.props.OnCoupenCodeUpdate(text)}
              testID="couponCode"
              accessibilityLabel="couponCode"

            />
            :
            <TextInput
              style={{
                height: 40,
                flex: 1,
                marginLeft: 10,
                placeholderTextColor: 'gray',
                borderRadius: 25,

              }}
              value={this.props.CoupenCode}
              placeholder={this.props.coupenPlaceHolder}
              onChangeText={(text) => this.props.OnCoupenCodeUpdate(text)}
              testID="giftCardLabel"
              accessibilityLabel="giftCardLabel"
            />
          }


          <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => this.props.OnCoupenApplyClick()}


          >
            <Text
              style={{
                alignSelf: 'center',
                marginRight: 10,
                fontWeight: "800",
                color: colors.GRAY_TEXT,
              }}
              testID="applyDiscountCoupon"
              accessibilityLabel="applyDiscountCoupon"
            >
              {this.props.coupenButton}
            </Text>
          </TouchableOpacity>

        </View>

        <View>


          {this.props && this.props.isDisplayCoupen && <View>

            {this.props.coupenAppliedList && <FlatList
              data={this.props.coupenAppliedList}
              renderItem={this.renderAppliedCoupenList}
              keyExtractor={(item, index) => index}
            />}
          </View>}


          {this.props && this.props.coupenResponceMessage ? <View>

            {this.props && this.props.IsCoupenApplied ? <View style={styles.giftCartResponceContainer}>
              <Text style={styles.cgiftCartResponceText}
                testID={this.props.success_Gift_Card_TestId}
                accessibilityLabel={this.props.success_Gift_Card_TestId}
              >{this.props.coupenResponceMessage}</Text>
            </View>
              :

              <View style={{ ...styles.giftCartResponceContainer, borderColor: colors.PRIMARY, backgroundColor: colors.COUPEN_REDBACKGROUND, }}>
                <Text style={{ ...styles.cgiftCartResponceText, color: colors.PRIMARY }}
                  testID={this.props.error_Gift_Card_TestId}
                  accessibilityLabel={this.props.error_Gift_Card_TestId}
                >{this.props.coupenResponceMessage}</Text>
              </View>
            }
          </View>
            :
            <></>
          }

        </View>

      </View>
    );
  };

  renderDelivery = () => {
    return (
      <>
        {this.props && this.props.addressList && <View
          style={[styles.deliveryContainer, this.props.deliveryContainerStyles]}>
          <View
            style={[
              styles.colomViewContainer,
              this.props.colomViewContainerStyles,
            ]}>
            {(this.props.showAddress) == 'true' && <><Text>{this.props.addressTitle}</Text>
              <TouchableOpacity onPress={() => this.props.OnAddressChange()}>
                <Text style={[styles.boldGrayText, this.props.boldGrayTextStyles]}>
                  {this.props.addressButton}
                </Text>
              </TouchableOpacity></>}
          </View>

          <FlatList
            data={this.props.addressList}
            renderItem={this.renderAddressList}
            keyExtractor={(item, index) => index}
          />
        </View>}
      </>
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <Text style={[styles.titleContainer, this.props.titleContainerStyles]}
          testID={this.props.testId}
          accessibilityLabel={this.props.testId}>
          {this.props.title}
        </Text>
        <View style={{
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
          <FlatList
            testId={this.props.cart_sub_testId}
            accessibilityLabel={this.props.cart_sub_testId}
            data={this.props.listOfCharges}
            renderItem={this.renderTitleValue}
            keyExtractor={(item, index) => index}
          />

          {this.props && this.props.listOfGiftResponce && <FlatList
            data={this.props.listOfGiftResponce}
            renderItem={this.renderGiftCardList}
            keyExtractor={(item, index) => index}
          />}
          <View
            style={[
              styles.colomViewContainer,
              this.props.colomViewContainerStyles,
            ]}>
            <Text style={styles.NormalText} testID={this.props.totalOrderTestId} accessibilityLabel={this.props.totalOrderTestId}> {this.props.totalText}</Text>
            <Text style={[styles.boldText, this.props.boldTextStyles]} testID={this.props.totalOrderTestId} accessibilityLabel={this.props.totalOrderTestId}>
              {this.props.totalValue}
            </Text>
          </View>
        </View>

        {this.renderGiftCard()}
        {this.renderDelivery()}

        <FlatList
          horizontal
          data={this.props.paymentIconList}
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderPaymentIconList}
          keyExtractor={(item, index) => index}
        />
      </View >
    );
  }
}
