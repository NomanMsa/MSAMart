import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { Colors } from '@theme';
import { Checkbox } from 'react-native-paper';
const styles = require('./CheckBoxAttributeStyles');
export default class extends Component {
  static defaultProps = {
    userClick: () => { },
    minVal: 0,
    maxVal: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      isMoreClicked: false,
      isChecked: false,
      dataSource: [],
      sliceDataSource: [],
      fullDataSource: [],

    };
    this.arrayholder = [];
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }

  componentDidMount() {
    var newCheckBoxData = []
    newCheckBoxData = this.props.listData

    this.setState(
      {
        dataSource: newCheckBoxData,
        fullDataSource: this.props.listData,
        sliceDataSource: this.props && this.props.listData && this.props.listData.slice(0, 4),

      })
    this.arrayholder = this.props.listData

  }





  selectRadio = (item, index) => {
    let IdArray = [];

    //console.log("Radio.................", item, index)
    tempArray = this.state.dataSource;
    let tempArray = Array.apply(null, Array(this.state.dataSource.length)).map((v, i) => {

      if (i == index) {
        let tempRoom = this.state.dataSource[i];
        if (this.state.dataSource[i].IsPreSelected == false) {
          tempRoom.IsPreSelected = true
          IdArray.push(this.state.dataSource[i]);

        } else if (this.state.dataSource[i].IsPreSelected == true) {
          tempRoom.IsPreSelected = false
        }

        return tempRoom;
      }
      else {
        let tempRoom = this.state.dataSource[i];
        tempRoom.FilterItemState = this.state.dataSource[i].FilterItemState
        if (this.state.dataSource[i].IsPreSelected == true) {
          IdArray.push(this.state.dataSource[i]);
        }
        return tempRoom;
      }

    });
    this.setState({
      dataSource: tempArray,
      sliceDataSource: tempArray,
      // selectedColor: item.ColorSquaresRgb,
      // selectedColorName: item.Name,
    });
    ///  let PassData = {parent:item, child:IdArray}
    this.props.userClick(this.state.dataSource, this.props.Id);
    //this.props.onColorSelect(item);
    //this.props.listData(item);
  };
  renderSwitch(param, item, index) {
    switch (param) {
      case 0:
        return (<Checkbox
          status={this.state.isChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            this.selectRadio(item, index)
          }}
          color={Colors.PRIMARY}
        />);
      // case 0:
      //   return (<Checkbox
      //     status={this.state.isChecked ? 'checked' : 'unchecked'}
      //     onPress={() => {
      //       this.setState({isChecked:!this.state.isChecked})
      //     }}
      //     color={Colors.PRIMARY}
      //   />);
      case 1:
        return (<Checkbox
          status={this.state.isChecked ? 'unchecked' : 'checked'}
          onPress={() => {
            this.selectRadio(item, index)
          }}
          color={Colors.PRIMARY}
        />);
      case 2:
        return (<Checkbox
          status={'checked'}
          disabled={true}
          onPress={() => {
            this.setState({ isChecked: !this.state.isChecked })
          }}
          color={Colors.PRIMARY}
        />);
      case 3:
        return (<Checkbox
          status={'unchecked'}
          disabled={true}
          onPress={() => {
            this.setState({ isChecked: !this.state.isChecked })
          }}
          color={Colors.PRIMARY}
        />);

      default:
        return (<></>);
    }
  }

  OrderDetailsItems = ({ item, index }) => {
    return (
      // <TouchableOpacity
      //   onPress={(item) =>
      //     this.props.navigation.navigate('ProductDetails', {
      //       passData: item,
      //     })
      //   }>
      <View key={index} style={[styles.ItemContainer, this.props.ItemContainerStyles]}>

        <View
          style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
          {/* <View style={{height:20, width:20, borderWidth: 1,borderRadius: 4,}}></View> */}


          {/* {this.renderSwitch(item.FilterItemState, item, index)} */}
          <Checkbox
            status={item.IsPreSelected ? 'checked' : 'unchecked'}
            onPress={() => {
              this.selectRadio(item, index)
            }}
            color={Colors.PRIMARY}
          />

          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.Name}
          </Text>
          {/* <Text
              style={[styles.categoryText, this.props.categoryTextStyles]}
              // numberOfLines={1}
              // ellipsizeMode={'tail'}
              >
              {item.category}
            </Text> */}
        </View>
      </View>

    );
  };


  render() {
    return (
      <View style={{ alignItems: 'center', }}>
        <>
          {
            this.state.dataSource ?
              <>
                <Text style={[styles.normalText, this.props.normalTextStyles]}>
                  title
            </Text>


                <FlatList
                  style={[styles.container, this.props.containerStyles]}
                  data={this.state.dataSource}
                  renderItem={this.OrderDetailsItems}
                  keyExtractor={(item, index) => index}
                />
              </>
              :
              <></>
          }</>
      </View>
    );
  }
}
