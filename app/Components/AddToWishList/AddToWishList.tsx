import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { Icons } from '@assets';
import { Colors } from '@theme';
import { default as ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon.tsx';

const styles = require('./AddToWishListStyle');
const { width, height } = Dimensions.get('window');

export default class extends Component {
  static defaultProps = {
    onImageClick: () => { },
    onTitleClick: () => { },
    onImgTopRtIcon: () => { },
    onCartClick: () => { },
    UpdateWishlistClick: () => { },
    EmailClick: () => { },
    AddToCartClick: () => { },
    onAddToCartClick: () => { },
    onRemoveClick: () => { },
    QuentityUpdate: () => { },
    onItemClick: () => { },
  };

  constructor(props) {
    super(props);
    this.state = {
      Quantity: 0,
      maxProductCount: 100,
      isRemoveChecked: false,
      isAddCartChecked: false,
      wishListData: []
    };
    this.renderProductList = this.renderProductList.bind(this);

  }
  async componentDidMount() {
    console.log("flag data----", this.props.flag)
    await this.setState({ wishListData: this.props && this.props.wishListData,
    userWishListFlag: this.props.flag 
  });

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("next props.----", nextProps.flag);
  //   if (nextProps.flag !== this.state.userWishListFlag) {
	// 	  this.setState({ userWishListFlag: nextProps.flag });
	// 	}
  // }

  cartclick(data) {
    this.props.AddToCartClick(data)
    console.log(data);

  }
  
  onQuentityChange = (text, item, index) => {

    let IdArray = [];

    tempArray = this.state.wishListData;

    let tempArray = Array.apply(null, Array(this.state.wishListData.length)).map((v, i) => {
      if (i == index) {
        let tempRoom = this.state.wishListData[i];
        if (text < this.state.maxProductCount) {
          tempRoom.Quantity = text
          IdArray.push(this.state.wishListData[i]);
        }

        return tempRoom;
      }
      else {
        let tempRoom = this.state.wishListData[i];
        tempRoom.Quentity = tempRoom.Quentity

        return tempRoom;
      }
    })


    this.setState({ wishListData: tempArray })

    this.props.QuentityUpdate(this.state.wishListData[index])

  }

  renderProductList = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => this.props.onItemClick(item)}
        testID="wishListItems"
        accessibilityLabel="wishListItems"
      >

        <View style={styles.rowDirectionContianer}>
          <View>
            <Image
              style={styles.imageStyle}
              source={{ uri: item.Picture.ImageUrl }}
            />
          </View>
          <View style={{ justifyContent: 'space-between', }}>
            <Text style={styles.desTextStyle}>{""}</Text>

            <View style={styles.desContainer}>
              <Text style={styles.desTextStyle}
                testID="productDetail"
                accessibilityLabel="productDetail"
              >{item.ProductName}</Text>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, }}>
              <View>
              <TouchableOpacity onPress={() => this.cartclick(item)}>
                <Text style={styles.radioText}
                  testID="addToCartBtn"
                  accessibilityLabel="addToCartBtn"
                >ADD TO CART</Text>
              </TouchableOpacity>
            </View>
            <View>
              {this.state.userWishListFlag !== true ?
              <View>
                <TouchableOpacity onPress={() => this.props.onRemoveClick(item)}>
                  <Text style={styles.radioText}
                    testID="wishListRemoveBtn">REMOVE</Text>
                </TouchableOpacity>
                </View>
              : <></>
              } 
              
            </View>
            </View>
          </View>

        </View>
        <View style={styles.bottomContianer}>

          <View style={styles.BottonContentContainer}>

          </View>
          <View style={styles.bottomRightContainer}>
            <Text style={styles.prizeText}>Price: {item.UnitPrice}</Text>

          </View>

        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View
        style={[styles.listviewContainer, this.props.listviewContainerStyle]}>
        <>
          {this.props.ListTitle != "" ?
            <Text style={[styles.ListTitleText, this.props.ListTitleText]}
              testID="wishListTitle"
              accessibilityLabel="wishListTitle">{this.props.ListTitle}
            </Text>
            :
            <></>
          }
          {this.props.SoldBy != "" ?
            <Text style={[styles.rateText1, this.props.rateText1Styles]}>
              {"Sold By: "}{this.props.SoldBy}
            </Text>
            :
            <></>
          }
        </>

        <>
          {this.props && this.props.wishListData && <FlatList
            data={this.props.wishListData}
            extraData={this.state}
            renderItem={this.renderProductList}
            keyExtractor={(item, index) => index}
          />}
        </>

          {this.state.userWishListFlag !== true ?
            <View style={{ margin: 30, alignItems: 'center', }}>

              <ButtonWithIcon
                testId={"emailFriendTitle"}
                mainContainerStyles={
                  {
                    padding: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 30,
                    height: 50,
                    width: width / 4 * 3,
                  }}
                icon={Icons.emailFriend}
                imageAvtarStyle={{
                  tintColor: Colors.WHITE,
                  height: 30,
                  width: 30,
                  margin: 5,
                }}
                text={"EMAIL A FRIEND"}
                titleStyle={{
                  color: Colors.WHITE,
                  fontSize: 15,
                  ...Platform.select({
                    ios: {
                      fontWeight: '800',
                      fontFamily: 'verdana',
                    },
                    android: {
                      fontWeight: 'normal',
                      fontFamily: 'verdanab',
                    },
                  }),
                  alignSelf: 'center',
                }}

                userClick={() =>
                  this.props.EmailClick()
                }
              />
            </View> : 
            <></> }
      </View>

    );
  }
}
