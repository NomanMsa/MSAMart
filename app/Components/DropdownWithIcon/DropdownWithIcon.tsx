import React, { Component } from 'react'
import { Text, View, Platform, Dimensions } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
const styles = require('./DropdownWithIconStyles');
const { width, height } = Dimensions.get('window');

const pickerStyle = {
  inputIOS: {
    alignSelf: 'flex-start',
    width: width - 90,
    color: 'black',
    height: '100%',
    fontFamily: 'verdana',
    fontSize: 16,
    marginLeft: 15,
  },
};
export default class extends Component {
  static defaultProps = {
    onChangeVal: () => { },
    onItemSelection: () => { },
    containerStyles:{},
    ddStyles:{},
    minVal: 0,
    maxVal: 10,
  }
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      selectedService: 'select option',
      DropdownName: 'default'
    }
    this.changeVal = this.changeVal.bind(this);
  }
  componentDidMount() {
    if (this.props.data && this.props.data[0]) {
      this.setState({
        selectedService: this.props.data[0].Name,
        selectedServiceIos: this.props.data[0].Id,
      });
      this.props.onItemSelection(this.props.data[0].Id, this.props.Id)
    }
  }
  componentWillUnmount() {

  }
  changeVal = (operation) => {
    if (operation == 'decrement' && this.state.quantity > this.props.minVal) {
      this.setState({
        quantity: parseInt(parseInt(this.state.quantity) - parseInt(1)),
      });
    } else if (operation == 'increment' && this.state.quantity < this.props.maxVal) {
      this.setState({
        quantity: parseInt(parseInt(this.state.quantity) + parseInt(1)),
      });
    }
  };

  onDropDownSelection = (service, index) => {
    this.setState({ selectedService: service, selectedServiceIos: service })
    var newList = this.props.data
    for (let i = 0; newList.length > i; i++) {
      if (service == newList[i].Id) {
        this.props.onItemSelection(newList[i].Id, this.props.Id)
      }
    }
  }

  render() {
    let newArrayOfObj = this.props.data
    let newArrayOfObjTemp = newArrayOfObj.map(({ Id, Name, ...rest }) => ({ ['Name']: Name, ['Id']: Id, ['value']: Id, ['label']: Name, ['text']: Name, ...rest }))
    newArrayOfObjTemp;
    return (
      <View>
        {this.props && this.props.title && <Text style={[styles.titleText, this.props.titleStyle]}>{this.props.title}</Text>}
        <View style={[styles.selectContainer, this.props.containerStyles]}>
          <View >


            {Platform.OS == "android" ?

              <View style={[styles.dropdownContainer, this.props.ddStyles]}>
                

                {this.props && newArrayOfObjTemp && <Picker
                  selectedValue={this.state.selectedService}
                  style={[styles.dropdownContainerInner]}
                  onValueChange={(service, index) => this.onDropDownSelection(service, index)}
                >
                 
                  {newArrayOfObjTemp.map((item, index) => {
                      var a=item.PriceAdjustment;
                      if(a==null){
                        return <Picker.Item key={index} value={item.Id} label={item.Name } />
                      }else{
                        return <Picker.Item key={index} value={item.Id} label={item.Name+'['+a+']'} />
                      }
                  })}
                </Picker>}
              </View>
              :
              <View style={[styles.dropdownContainerIos, this.props.ddStyles]}>
                {this.props && newArrayOfObjTemp && <RNPickerSelect
                  value={this.state.selectedServiceIos}
                  placeholder={''}
                  style={{ ...pickerStyle }}
                  viewContainer={{ marginTop: 10 }}
                  onValueChange={(service, index) => this.onDropDownSelection(service, index)}
                  items={newArrayOfObjTemp}
                />}
              </View>}
          </View>
        </View>
      </View>
    )
  }
}

