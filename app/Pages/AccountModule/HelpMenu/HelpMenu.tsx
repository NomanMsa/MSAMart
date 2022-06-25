import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import styles from './HelpMenuStyles';
type WindowDimensions = { width: number; height: number };
import { Colors } from '@theme';
import { Images, Icons } from '@assets';
import SafeAreaView from 'react-native-safe-area-view';

export default class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButtonImage: Icons.arrowBack,
      headerText: 'Help',
      GrettingText: 'Hello',
      CustomerName: 'Joe Bloggs',
      LogoutText: 'Log out',
      LogoutImage: Icons.arrowBack,
      listData: [
        {
          id: 1,
          Listitem: 'Contact us',
          sublist: [
            {
              subListitem: 'Report abuse',
              page: 'ContactUs',
            },
            {
              subListitem: 'Submit a dispute',
              page: 'ContactUs',
            },
            // {
            //   subListitem: 'Visit the mall',
            //   page: 'ContactUs',
            // },
          ],
        },
        {
          id: 1,
          Listitem: 'Help Center',
          sublist: [
            {
              subListitem: 'Delivery',
              page: 'Delivery',
            },
            {
              subListitem: 'Return',
              page: 'Returns',

            },
            {
              subListitem: 'Privacy Policy',
              page: 'PrivacyPolicy',

            },
            {
              subListitem: 'Terms and conditions',
              page: 'TermsConditions',

            },
          ],
        },
      ],
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.DetailsItems = this.DetailsItems.bind(this);
    //this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }
  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            style={styles.logoutAvatar}
            source={this.state.backButtonImage}
          />

          <Text style={[styles.headerText, this.props.headerTextStyle]}>
            {this.state.headerText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  OrderDetailsItems = ({ item, index }) => {
    return (
      <View key={index}
        style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
        <Text style={[styles.listItemText, this.props.listItemTextStyles]}>
          {item.Listitem}
        </Text>
        <FlatList
          style={[styles.container, this.props.containerStyles]}
          data={item.sublist}
          renderItem={this.DetailsItems}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };
  DetailsItems = ({ item, index }) => {
    return (
      <TouchableOpacity key={index}
        onPress={() => { if (item.page != '') { this.props.navigation.navigate(item.page) } }}
        style={[
          styles.internalItemContainer,
          this.props.internalItemContainerStyles,
        ]}>
        <Text style={[styles.normalText, this.props.normalTextStyles]}>
          {item.subListitem}
        </Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <>
        <View style={{ backgroundColor: Colors.PRIMARY }}>
          <SafeAreaView>
            <View style={styles.pageContainer}>
              {this.renderHeader()}

              <FlatList
                style={[styles.container, this.props.containerStyles]}
                data={this.state.listData}
                renderItem={this.OrderDetailsItems}
                keyExtractor={(item, index) => index}
              />
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  }
}
