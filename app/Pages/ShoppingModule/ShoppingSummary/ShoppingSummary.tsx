import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  OrderDetails,
  ProductDetails,
  Button,
  OrderProcess,
  Footer,
  Header,
  SearchBar,
} from '@components';
import { Colors } from '@theme';
import styles from './ShoppingSummaryStyles';
import { Icons, Images, Loaders } from '@assets';
import { DrawerActions } from '@react-navigation/native';


type WindowDimensions = { width: number; height: number };

export default class ShoppingCart extends Component {
  static defaultProps = {
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
  };
  /* zone={'Product Specifications'}
      title={'Product Specifications'}
      netPrice={95}
      discountedPrice={79}
      totalStars={5}
      ratedStars={3}
      totalReviews={23}
      reviewText={'reviews'}
      currencyText */
  constructor(props) {
    super(props);
    this.state = {
      GreetingText: 'Hi',
      CustomerName: 'John Smith',
      AckText: "Your order has been confirmed. We'll be shipping it soon.",
    };
    this.renderHeaderContainer = this.renderHeaderContainer.bind(this);
  }
  componentDidMount() {
    const { passData } = this.props.route.params;
    console.log(passData);
  }
  renderHeaderContainer = () => {
    return (
      <View>
        <Text style={[styles.titleText, this.props.titleTextStyles]}>
          {this.state.GreetingText} {this.state.CustomerName}
        </Text>
        <Text style={[styles.NormalText, this.props.NormalTextStyles]}>
          {this.state.AckText}
        </Text>
      </View>
    );
  };

  render() {
    return (<>
      <SafeAreaView style={{ flex: 0, backgroundColor: Colors.PRIMARY }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
        {/* <Header
          burgerMenuClick={(data) => {
            this.props.navigation.toggleDrawer();
          }} */}
        <Header
          burgerMenuClick={(data) => {
            //this.props.navigation.toggleDrawer();
            this.props.navigation.dispatch(DrawerActions.openDrawer());
            //this.props.navigation.openDrawer()
          }}
          backButtonClick={() => this.props.navigation.pop()}
          NavButton={true}
          userIcoStyles={{ tintColor: Colors.WHITE }}
          cartIcoStyles={{ tintColor: Colors.WHITE }}
          menuIcoStyles={{ tintColor: Colors.WHITE }}
          logoStyles={{ tintColor: Colors.WHITE }}
          fullRowBottom={
            <SearchBar
              onFocus={(data) =>
                this.props.navigation.navigate('Search', { passData: data })
              }
              editable={false}
              onSearchContainer={(data) =>
                this.props.navigation.navigate('Search', { passData: data })
              }
              onTextChange={(data) => console.log(data)}
              onSearch={(data) =>
                this.props.navigation.navigate('Search', { passData: data })
              }
              isEnabled={false}
              styles={{ borderWidth: 0 }}
              iconColor={Colors.BLACK}
              iconContainerStyles={{
                backgroundColor: Colors.SECONDAY_COLOR,
              }}
              placeholderStyles={{}}
            />
          }
          fullRowTop={<></>}
          styles={{
            backgroundColor: Colors.PRIMARY,
            borderBottomColor: Colors.SILVER,
          }}
          userClick={async (data) => { if (await AsyncStorage.getItem('loginStatus') == 'true') { this.props.navigation.navigate('Account', { passData: data, }) } else { this.props.navigation.navigate('SignIn', { passData: data, }) } }}
          cartClick={(data) =>
            this.props.navigation.navigate('ShoppingCart', {
              passData: data,
            })
          }
          logoClick={(data) => this.props.navigation.navigate('Home')}
        />
        <ScrollView
          style={styles.pageStyles}
          contentInsetAdjustmentBehavior="automatic">
          <View style={[styles.mainContainer, this.props.mainContainerStyle]}>
            {this.renderHeaderContainer()}
            <OrderDetails
              OrderNumberLabel={' Order No.'}
              OrderNumber={'134984796468'}
              VenderTitle={'Vendor:'}
              VenderName={'Dubai Electronics'}
              dateLabel={'Placed:'}
              date={'14/05/2020'}
              titleData={[
                {
                  id: 1,
                  Title: 'Name Customer',
                },
                {
                  id: 1,
                  Title: 'Shipping Address',
                },
                {
                  id: 1,
                  Title: 'Phone number',
                },
              ]}
              data={[
                {
                  id: 1,
                  customerName: 'John Smith',
                  shippingAddress:
                    '1801, Horizon Towers AI Marzha St, Jumeirah Dubai, UAE',
                  phoneNumber: '+ 971 90909090',
                },
              ]}
            />
            <ProductDetails
              ListTitle={'Your items'}
              titleData={[
                {
                  id: 1,
                  Title: 'Product Details',
                },
                {
                  id: 1,
                  Title: ' ',
                },
                {
                  id: 1,
                  Title: ' ',
                },
                {
                  id: 1,
                  Title: ' Quentity',
                },

                {
                  id: 1,
                  Title: 'Prize',
                },
                {
                  id: 1,
                  Title: ' ',
                },
              ]}
              OrederDetailsdata={[
                {
                  id: 1,
                  imageURL: 'https://placeimg.com/480/480/tech',
                  productName: 'John Smith',
                  productCategory: 'T-shirt',
                  productColor: 'Black/White/Gray',
                  Quentity: '1',
                  Prize: 'AED 320.00',
                },
                {
                  id: 1,
                  imageURL: 'https://placeimg.com/480/480/tech',
                  productName: 'John Smith',
                  productCategory: 'T-shirt',
                  productColor: 'Black/White/Gray',
                  Quentity: '1',
                  Prize: 'AED 320.00',
                },
              ]}
              amountCalculationData={[
                {
                  id: 1,
                  label: 'Item SubTotal',
                  Value: 'AED 640.00',
                },
                {
                  id: 2,
                  label: 'Shipping & Handling',
                  Value: 'AED 640.00',
                },
              ]}
              TotalTextLabel={'Total'}
              TotalAmount={'AED 660.00'}
            />

            <Button
              title={'Order Details'}
              btnStyle={{ borderWidth: 0, marginRight: -10, width: 200 }}
              titleStyle={{ color: Colors.WHITE }}
            />
            <OrderProcess
              Title={'What happens next?'}
              Data={[
                {
                  id: 1,
                  imageURL: Icons.shipping,
                  name: 'shipping',
                },
                {
                  id: 2,
                  imageURL: Icons.policy,
                  name: 'policies',
                },
                {
                  id: 3,
                  imageURL: Icons.faq,
                  name: "FAQ's",
                },
              ]}
            />
          </View>
          <Footer
            footerLinksList={[
              { text: 'Privacy Policy', url: 'PrivacyPolicy' },
              { text: 'Returns', url: 'Returns' },
              { text: 'Terms and Conditions', url: 'TermsConditions' },
              { text: 'Contact Us', url: 'ContactUs' },
              { text: 'Delivery', url: 'Delivery' },
              { text: 'Laws and Regulations', url: 'LawsRegulations' },
            ]}
            onNavLink={(data) => this.props.navigation.navigate(data.url)}
          />
        </ScrollView>
      </SafeAreaView></>
    );
  }
}
