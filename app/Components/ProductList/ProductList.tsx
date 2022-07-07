import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import ProductCartBtn from '../ProductCartBtn/ProductCartBtn';
import { Loaders, Images, Icons } from '@assets';
const styles = require('./ProductListStyles');

export default class ProductList extends Component {
  static defaultProps = {
    onTap: () => { },
    emptyMsg: 'No Items Found...',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      showViewer: true,
      showIndex: 0,
      listData: '',
      index: 0,
      DeleteWishlistItem: [],
      DescriptionLimit: this.props.descriptionLimit == null ? 40 : this.props.descriptionLimit,
    }
    this.renderProductList = this.renderProductList.bind(this);
    this.renderEmptyProductList = this.renderEmptyProductList.bind(this);
  }

  componentDidMount() {
    var newCheckBoxData = []
    newCheckBoxData = this.props.listData

    this.setState(
      {
        listData: newCheckBoxData
      })
    this.arrayholder = this.props.listData

  }

  UpdateWishlistandAddToCartData = async (data) => {
    let Service = {
      apiUrl: Api.widgetProductAddWishlist + '?productId=' +data.Id +'&shoppingCartTypeId=2' +'&quantity=1',
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
    
      onSuccessCall: this.onSuccessWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };
  onSuccessWishlistCall = (datas) => {
    let IdArray = [];
    let tempArray = [];
    if (datas.errorlist.length > 0) {
      var messeageString = ''
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString = datas.errorlist[i] + " ";
      }
      Alert.alert(
        'MsaMart',
        messeageString, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },], {
        cancelable: false
      }
      )


    } else {
      if( datas.message!=null && datas.message.length > 0 ){
        Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
      }




      tempArray = this.state.listData;
      tempArray = Array.apply(null, Array(this.state.listData.length)).map((v, i) => {

        if (i == this.state.index) {
          let tempRoom = this.state.listData[i];
          if (this.state.listData[i].CustomProperties.IsProductInWishlist == false) {
            tempRoom.CustomProperties.IsProductInWishlist = true
            IdArray.push(this.state.listData[i]);

          } else if (this.state.listData[i].CustomProperties.IsProductInWishlist == true) {
            tempRoom.CustomProperties.IsProductInWishlist = false
            IdArray.push(this.state.listData[i]);
          }

          return tempRoom;
        }
        else {
          let tempRoom = this.state.listData[i];
          tempRoom.CustomProperties.IsProductInWishlist = tempRoom.CustomProperties.IsProductInWishlist
          tempRoom.ProductPrice.DisableWishlistButton = tempRoom.ProductPrice.DisableWishlistButton

          return tempRoom;
        }

      });
      this.setState({
        listData: tempArray,

      });






    }
    var data = datas.model
    // this.getCartCountData()
    this.props.OnWishlistClick()
  }

  UpdateWishlistData = async (data) => {
    let Service = {
      apiUrl: Api.UpdateButtonWishlist,
      methodType: 'POST',
      headerData: { 'Content-Type': 'application/json' },
      bodyData: JSON.stringify({
        allIdsToRemove: this.state.DeleteWishlistItem,
        // allIdsToUpdate: [{"3106":"10","3107":"9"}],
        allIdsToUpdate: this.state.UpdatedQuentityItemData
      }),
      onSuccessCall: this.onSuccessUpdatedWishlistCall,
      onFailureAPI: this.onFailureAPI,
      onPromiseFailure: this.onPromiseFailure,
      onOffline: this.onOffline,
    };
    const serviceResponse = await ServiceCall(Service);
  };

  onSuccessUpdatedWishlistCall = async (datas) => {
    let IdArray = [];
    let tempArray = [];
    if (datas.errorlist.length > 0) {
      var messeageString = ''
      for (let i = 0; datas.errorlist.length > i; i++) {
        messeageString = datas.errorlist[i] + " ";
      }
      Alert.alert(
        'MsaMart',
        messeageString, [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },], {
        cancelable: false
      }
      )


    } else {
      if( datas.message!=null && datas.message.length > 0 ){
        Toast.showWithGravity(datas.message, Toast.LONG, Toast.BOTTOM);
      }
      tempArray = this.state.listData;
      tempArray = Array.apply(null, Array(this.state.listData.length)).map((v, i) => {

        if (i == this.state.index) {
          let tempRoom = this.state.listData[i];
          if (this.state.listData[i].CustomProperties.IsProductInWishlist == false) {
            tempRoom.CustomProperties.IsProductInWishlist = true
            IdArray.push(this.state.listData[i]);

          } else if (this.state.listData[i].CustomProperties.IsProductInWishlist == true) {
            tempRoom.CustomProperties.IsProductInWishlist = false
            IdArray.push(this.state.listData[i]);
          }

          return tempRoom;
        }
        else {
          let tempRoom = this.state.listData[i];
          tempRoom.CustomProperties.IsProductInWishlist = tempRoom.CustomProperties.IsProductInWishlist
          tempRoom.ProductPrice.DisableWishlistButton = tempRoom.ProductPrice.DisableWishlistButton

          return tempRoom;
        }

      });
      this.setState({
        listData: tempArray,

      });

    }
    var data = datas.model
    this.props.OnWishlistClick()

  }


  onFailureAPI(data) {
    console.log("error called.................", data);
    if( data.errorlist[0]!=null && data.errorlist[0].length > 0 ){
      Toast.showWithGravity(data.errorlist[0], Toast.LONG, Toast.BOTTOM);
    }
  }

  onPromiseFailure(data) {
    console.log(data);
  }

  onOffline(data) {
    console.log(data);
  }


  onWishlist = (item, index) => {
    let IdArray = [];

    let tempArray = []
    this.setState({ index: index })
    if (item.CustomProperties.IsProductInWishlist == false) {
      this.UpdateWishlistandAddToCartData(item)

    } else {
      var DeleteArray = []
      DeleteArray = this.state.DeleteWishlistItem;
      DeleteArray.push(item.Id)
      this.setState({ DeletedItemData: DeleteArray })
      this.UpdateWishlistData(item)
      this.setState({ DeletedItemData: [] })

    }

  }

  renderProductList({ item, index }) {
    return <View key={index} style={styles.productImgBoxContent}>
      <View style={styles.productImgBox}>
        <TouchableOpacity onPress={() => this.props.onTap(item)} >
          <View style={styles.productBoxImg}>
            {item.is_discount_count && (
              <View style={styles.field}>
                <Text style={styles.ProductDescount}>-20%</Text>
              </View>
            )}
            {item.is_fire_icon && (
              <View style={styles.ProductWish}>
                <Image style={styles.fireBtnIcon} source={Icons.fireBtn} />
              </View>
            )}
            <Image style={styles.productImg}
              source={{ uri: item.product_img }} />
          </View>
          <View style={styles.ProductTitle}>
            <Text style={styles.ProductDes}>{item.product_des}</Text>
          </View>
          <View style={styles.priceBoxItem}>

            <View style={styles.priceBox}>

              <Text style={styles.ProductPrice}>{item.product_price}</Text>
              <Text style={styles.ProductMainPrice}>{item.product_main_price}</Text>
              <View style={styles.starYellow}>
                {item.is_start_icon && (
                  <>
                    <Image style={styles.starYellowIcon} source={Icons.starYellow} />
                    <Text style={styles.starYellowText}>{item.star_rating}</Text>
                  </>
                )}
              </View>

            </View>
            <View style={styles.carBtn}>
              <ProductCartBtn />
            </View>

          </View>
        </TouchableOpacity>
      </View>
    </View>
  }
  renderEmptyProductList(txt) {
    return (<Text style={styles.menuTextStyle}>{txt}</Text>)
  }

  render() {
    const { onProClick } = this.props;
    const { onTap } = this.props;
    return (
      <>
        <View style={styles.productImgBoxContentMargin}>
          <FlatList
            //horizontal
            numColumns={2}
            data={this.props.data}
            renderItem={this.renderProductList}
            onEndReached={console.log("test")}
            onEndReachedThreshold={2}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={this.renderEmptyProductList(this.props.emptyMsg)}
            style={[{ margin: 0, padding: 0 }]}
          />
        </View>

      </>
    )
  }
}