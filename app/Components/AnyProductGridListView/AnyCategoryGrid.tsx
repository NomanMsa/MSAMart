import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { Icons, Images, Loaders } from '@assets';
import { Colors } from "@theme";
import { ServiceCall } from '@utils';
import { Api ,EventTags,EmarsysEvents} from '@config';

import Toast from 'react-native-simple-toast';
import FleashDealsViewAll from '../FleashDealsViewAll/FleashDealsViewAll.tsx';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from "react-native-fbsdk-next";

const styles = require('./AnyProductGridListViewStyle');

export default class extends Component {
  static defaultProps = {
    listData: [],
    oncatImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
    oncatClick: () => { },
    OnWishlistClick: () => { },
    ViewAllClick: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      listData: '',
      index: 0,
      DeleteWishlistItem: [],
      DescriptionLimit: this.props.descriptionLimit == null ? 40 : this.props.descriptionLimit,
      apiLoading: false,
    };
    this.renderProductList = this.renderProductList.bind(this);
  }

  componentDidMount() {
    var newCheckBoxData = []
    newCheckBoxData = this.props.listData
    this.setState(
      {
        listData: newCheckBoxData
      })

  }

 

  renderProductList = ({ item, index }) => {
    // var image = item.DefaultPictureModel.ImageUrl;
    return (
      <TouchableOpacity key={index} style={[styles.productRowBox, this.props.productRowBoxStyle]} onPress={() => this.props.oncatClick(item)}
        testID={this.props.onImageClickTestId}
        accessibilityLabel={this.props.onImageClickTestId}
      >
            <Text style={styles.PTitle}>{item.Name}</Text>


        <View style={styles.productImageBox}
          testID="productDesktop"
          accessibilityLabel="productDesktop"
        >
          <TouchableOpacity
            testID={"selectProductMobile"}
            accessibilityLabel="selectProductMobile"

            style={styles.productImageContainer}
            onPress={() => this.props.oncatImageClick(item)}>
                
            <Image
            
              testID={"selectProductFromHomeBtn"}
              accessibilityLabel="selectProductFromHomeBtn"
              style={styles.productImage}
              source={{ uri: 'https://mobcms.msainfotech.in/images/thumbs/0000020_build-your-own-computer_550.jpeg' }}

            />
            
          </TouchableOpacity>
          </View>
        
     </TouchableOpacity>
    );
  };
  render() {
    return (
      
      <View style={[styles.listviewContainer, this.props.listViewContainerStyle]}>
        <FlatList
          data={this.props.listData}
          numColumns={2}
          columnWrapperStyle={{ flex: 1, justifyContent: 'flex-start' }}
          renderItem={this.renderProductList}
          keyExtractor={(item, index) => index}
          extraData={this.props}
        />
        <>
          {this.props.showAllButton != null ?
            <FleashDealsViewAll
              onPress={() => this.props.ViewAllClick()}
              ViewAllLeftIcon={this.props.ViewAllLeftIcon}
              ViewAllRightIcon={this.props.ViewAllRightIcon}
            />
            :
            <View></View>

          }
        </>
      </View>
    );
  }
}
