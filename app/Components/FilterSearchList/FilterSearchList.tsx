

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Images, Loaders, Icons } from '@assets';
import { Colors } from '@theme';
const styles = require('./FilterSearchListStyles');
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
      backButtonImage: Icons.arrowBack,
      headerText: 'Your Account',
      GrettingText: 'Hello',
      CustomerName: 'Joe Bloggs',
      LogoutText: 'Log out',
      LogoutImage: Icons.arrowBack,
      isMoreClicked: false,
      isChecked: false,
      dataSource: [],
      sliceDataSource: [],
      fullDataSource: [],

    };
    this.arrayholder = [];
    this.renderHeader = this.renderHeader.bind(this);
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.renderMainFullData = this.renderMainFullData.bind(this);
  }

  async componentDidMount() {
    var ListData = this.props && this.props.listData && this.props.listData
    await this.setState({
      dataSource: ListData.slice(0, 4),
      fullDataSource: ListData,
    })



    this.arrayholder = ListData
  }
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      fullDataSource: newData,
      text: text,
    });
  }


  renderHeader = () => {
    return (
      <View style={[styles.headerContainer, this.props.headerContainerStyles]}>
        <View style={[styles.searchContainer, this.props.searchContainer]}>
          <TextInput
            style={styles.searchInputs}
            value={this.state.text}
            placeholder="Search"
            onChangeText={(text) => this.SearchFilterFunction(text)}
          />
        </View>
      </View>
    );
  };


  selectRadio = (item, index) => {
    let IdArray = [];
    let PassData = {};
    tempArray = this.state.fullDataSource;
    let tempArray = Array.apply(null, Array(this.state.fullDataSource.length)).map((v, i) => {
      if (i == index) {
        let tempRoom = this.state.fullDataSource[i];
        if (this.state.fullDataSource[i].FilterItemState == 0) {
          tempRoom.FilterItemState = 1
          IdArray.push(this.state.fullDataSource[i]);

        } else if (this.state.fullDataSource[i].FilterItemState == 1) {
          tempRoom.FilterItemState = 0
        }
        return tempRoom;
      }
      else {
        let tempRoom = this.state.fullDataSource[i];
        tempRoom.FilterItemState = this.state.fullDataSource[i].FilterItemState
        if (this.state.fullDataSource[i].FilterItemState == 1) {
          IdArray.push(this.state.fullDataSource[i]);
        }
        return tempRoom;
      }

    });


    this.setState({
      fullDataSource: tempArray,
    });
    PassData = { parent: item, child: IdArray }
    this.props.userClick(PassData);
  };

  renderSwitch(param, item, index) {
    switch (param) {
      case 0:
        return (<TouchableOpacity style={styles.unSelChkBox} onPress={() => { this.selectRadio(item, index) }}></TouchableOpacity>);
      case 1:
        return (<TouchableOpacity style={styles.selChkBox} onPress={() => { this.selectRadio(item, index) }}><Text style={{ color: Colors.WHITE, }}>✔</Text></TouchableOpacity>);
      case 2:
        return (<View style={styles.disabledChkbox}><Text style={{ color: Colors.WHITE }}>✔</Text></View>);
      case 3:
        return (<View style={styles.disabledChkbox}></View>)
      default:
        return (<></>);
    }
  }
  OrderDetailsItems = ({ item, index }) => {
    return (
      <View key={item.Id} style={[styles.ItemContainer, this.props.ItemContainerStyles]}>
        <View
          style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
          {this.renderSwitch(item.FilterItemState, item, index)}
          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.Name}
          </Text>
        </View>
      </View>

    );
  };


  OnMoreClicked = async () => {
    var ListData = this.state.fullDataSource

    if (this.state.isMoreClicked == false) {
      await this.setState({ dataSource: ListData })
    }
    if (this.state.isMoreClicked == true) {
      await this.setState({ dataSource: ListData.slice(0, 4), })
    }
    await this.setState({ isMoreClicked: !this.state.isMoreClicked })
  }

  renderMain = () => {
    return (
      <View>
        {this.props && this.props.listData && this.props.listData.length > 4 && <>
          {this.renderHeader()}
        </>}
        <FlatList  
          testID={this.props.checkboxKey}
          accessibilityLabel= {this.props.checkboxKey}
          style={[styles.container, this.props.containerStyles]}
          data={this.state.dataSource}
          initialNumToRender={40}
          maxToRenderPerBatch={8}
          removeClippedSubviews={true}
          disableVirtualization={true}
          renderItem={this.OrderDetailsItems}
          updateCellsBatchingPeriod={25}
          windowSize={11}
          keyExtractor={(item, index) => index}
        />
        {this.state.fullDataSource.length > 4 &&
          <TouchableOpacity 
          testID = {this.props.viewMoreKey}
          accessibilityLabel= {this.props.viewMoreKey}
           onPress={() => this.OnMoreClicked()}>
            <Text style={styles.viewMoreText}>{!this.state.isMoreClicked ? "View More" : "View Less"}</Text>
          </TouchableOpacity>
        }

      </View>
    )
  }


  renderMainFullData = () => {
    return (
      <View>
        {this.state.fullDataSource.length > 4 && <>
          {this.renderHeader()}
        </>}
        <FlatList
          style={[styles.container, this.props.containerStyles]}
          data={this.state.fullDataSource}
          initialNumToRender={40}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={25}
          windowSize={11}
          removeClippedSubviews={true}
          renderItem={this.OrderDetailsItems}
          keyExtractor={(item, index) => index}
        />
        {this.state.dataSource.length > 4 &&
          <TouchableOpacity onPress={() => this.OnMoreClicked()}>
            <Text style={{ alignSelf: 'center', color: Colors.PRIMARY, textDecorationLine: 'underline' }}>{!this.state.isMoreClicked ? "View More" : "View Less"}</Text>
          </TouchableOpacity>
        }

      </View>
    )
  }

  render() {
    return (
      <View>
        {this.renderMain()}
      </View>
    );
  }
}