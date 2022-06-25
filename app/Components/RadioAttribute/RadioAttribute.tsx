import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Platform,
} from 'react-native';
import { Images, Loaders, Icons } from '@assets';
import { Colors } from '@theme';
import { RadioButton } from 'react-native-paper';
const styles = require('./RadioAttributeStyles');
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
    this.OrderDetailsItems = this.OrderDetailsItems.bind(this);
  }

  componentDidMount() {
    var newCheckBoxData = []
    newCheckBoxData = this.props.listData

    this.setState(
      {
        dataSource: newCheckBoxData
      })
    this.arrayholder = this.props.listData

  }





  selectRadio = (item, index) => {
    let IdArray = [];

    tempArray = this.state.dataSource;
    let tempArray = Array.apply(null, Array(this.state.dataSource.length)).map((v, i) => {

      if (i == index) {
        let tempRoom = this.state.dataSource[i];
        if (this.state.dataSource[i].IsPreSelected == false) {
          tempRoom.IsPreSelected = true
          IdArray.push(this.state.dataSource[i]);

        } else if (this.state.dataSource[i].IsPreSelected == true) {
          tempRoom.FilterItemState = false
        }

        return tempRoom;
      }
      else {
        let tempRoom = this.state.dataSource[i];
        tempRoom.IsPreSelected = false


        return tempRoom;
      }

    });
    this.setState({
      dataSource: tempArray,

    });
    this.props.userClick(item, this.state.Id);

  };
  renderSwitch(param, item, index) {
    switch (param) {
      case 0:
        return (<RadioButton
          status={this.state.isChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            this.selectRadio(item, index)
          }}
          color={Colors.PRIMARY}
        />);

      case 1:
        return (<RadioButton
          status={this.state.isChecked ? 'unchecked' : 'checked'}
          onPress={() => {
            this.selectRadio(item, index)
          }}
          color={Colors.PRIMARY}
        />);
      case 2:
        return (<RadioButton
          status={'checked'}
          disabled={true}
          onPress={() => {
            this.setState({ isChecked: !this.state.isChecked })
          }}
          color={Colors.PRIMARY}
        />);
      case 3:
        return (<RadioButton
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

      <View key={index} style={[styles.ItemContainer, this.props.ItemContainerStyles]}>

        <View
          style={[styles.listItemContainer, this.props.listItemContainerStyle]}>
          { Platform.OS == "android" ? 
            <RadioButton
              status={item.IsPreSelected ? 'checked' : 'unchecked'}
              onPress={() => {
                this.selectRadio(item, index)
              }}
              color={Colors.PRIMARY}
            />: 
            <View style={styles.iosRadioButtonStyle}>
              <RadioButton
                status={item.IsPreSelected ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.selectRadio(item, index)
                }}
                color={Colors.PRIMARY}
              />
            </View>
          }

          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {item.Name}
          </Text>

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
