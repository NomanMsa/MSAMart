import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,

} from 'react-native';
import { Icons, Images, Loaders } from '@assets';
import colors from '../../Theme/Colors';
const styles = require('./CartSummaryModelStyles');
export default class extends Component {
  static defaultProps = {
    onNavLink: () => { },
    slideInterval: 9000,
    bulletStyles: {},
    OnCoupenCodeUpdate: () => { },
    OnCoupenApplyClick: () => { },
    OnCoupenCancel: () => { },
    OnGiftCartToolTipClick: () => { },
    OnGiftCartCancel: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
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
    console.log("Item1", item)
    console.log(item);
    return (
      <View key={index} style={[styles.ValueList, this.props.ValueListStyles]}>
        <Text style={styles.NormalText}
          testID={item.testId}
          accessibilityLabel={item.testId}
        >
          {item.title} {':'}
        </Text>
        <Text style={styles.NormalText}>{item.value}</Text>
      </View>

    );
  };

  renderAddressList = ({ item, index }) => {
    console.log(item);
    return (
      <View key={index}
        style={[styles.addressContainer, this.props.addressContainerStyles]}>
        <Text style={[styles.boldGrayText, this.props.boldGrayTextStyles]}>
          {item.placeTitle}
        </Text>
        <Text style={[styles.simpleGrayText, this.props.adressTextStyle]}>
          {item.address}
        </Text>
      </View>
    );
  };

  renderPaymentIconList = ({ item, index }) => {
    console.log(item);
    return (
      <View>
        <Image
          style={[styles.paymentIcons, this.props.paymentIconsStyles]}
          source={item.image}
        />
      </View>
    );
  };

  renderAppliedCoupenList = ({ item, index }) => {
    console.log(item);
    return (
      <View key={index}
        style={[styles.CoupenListContainer, this.props.addressContainerStyles]}>
        <Text>{""}</Text>
        <Text style={[styles.simpleGrayText, this.props.adressTextStyle]}>
          {item.CouponCode}
        </Text>
        <TouchableOpacity style={styles.CoupenCancelContainer} onPress={() => this.props.OnCoupenCancel(item)}>
          <Image
            style={[styles.CoupenCancelIcons, this.props.CoupenCancelIconsStyles]}
            source={Icons.cross}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderGiftCard = () => {
    console.log("INSIDE GIFT ")
    return (
      <View style={{}}>
        <View
          style={[
            styles.giftCartContainer,
            this.props.giftCartContainerStyles,
          ]}>

          <TextInput
            style={{
              height: 40,
              flex: 1,
              marginLeft: 10,
              placeholderTextColor: 'gray',
              borderRadius: 25,

            }}
            value={this.state.text}
            placeholder={this.props.coupenPlaceHolder}
            onChangeText={(text) => this.props.OnCoupenCodeUpdate(text)}
          />


          <TouchableOpacity style={{ alignItems: 'center', }} onPress={() => this.props.OnCoupenApplyClick()}>
            <Text
              style={{
                alignSelf: 'center',
                marginRight: 10,
                fontWeight: "800",
                color: colors.GRAY_TEXT,
              }}>
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
                  testID={this.props.success_Gift_Card_TestId}
                  accessibilityLabel={this.props.success_Gift_Card_TestId}
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
            <Text>{this.props.addressTitle}</Text>
            <Text style={[styles.boldGrayText, this.props.boldGrayTextStyles]}>
              {this.props.addressButton}
            </Text>
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
        <Text style={[styles.titleContainer, this.props.titleContainerStyles]}>
          {this.props.title}
        </Text>
        <View >
          <FlatList
            data={this.props.listOfCharges}
            renderItem={this.renderTitleValue}
            keyExtractor={(item, index) => index}
          />

          {/* {this.props && this.props.listOfGiftResponce && <FlatList
            data={this.props.listOfGiftResponce}
            renderItem={this.renderGiftCardList}
            keyExtractor={(item, index) => index}
          />} */}

        </View>
      </View>
    );
  }
}
