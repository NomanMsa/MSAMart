import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Dimensions, FlatList, Platform, ScrollView } from 'react-native'
import { Icons } from '@assets';
import { Colors } from "@theme";
import ButtonWithIcon from '../ButtonWithIcon/ButtonWithIcon'
import FilterSearchList from '../FilterSearchList/FilterSearchList'
import FilterCategoryList from '../FilterCategoryList/FilterCategoryList'
//import RangeSlider from 'rn-range-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
// import NestedListView, { NestedRow } from 'react-native-nested-listview';
const { width, height } = Dimensions.get('window');
const styles = require('./FilterMenuStyles');
var lowPrize = 0;
var highPrize = 0;
export default class extends Component {
  static defaultProps = {
    OnClick: () => { },
    OnSaleCollapsibleUpdate: () => { },
    OnPrizeSliderChange: () => { },
    OnSaleClicked: () => { },
    InStockClicked: () => { },
    onOtherCategoriesSelected: () => { },
    onVendordataChange: () => { },
    onManufacturerdataChange: () => { },
    onSpecificationCategoriesSelected: () => { },

  }
  constructor(props) {
    super(props)
    this.state = {
      selectedColor: '',
      selectedColorName: '',
      categoryViewMore: false,
      rangeLow: '',
      rangeHigh: '',
      upperValue: 0,
      lowerValue: 0,
      scrollEnabled: true,
      list: [
        {
          id: 1,
          title: 'Getting Started',
          body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
        },
        {
          id: 2,
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
        }
      ],
      VendorFilterItems: [],

      isCategoriesCollapsible: true,
      isPrizeCollapsible: true,
      isOnSaleCollapsible: true,
      isInStockCollapsible: true,
      isSpecificationCollapsible: true,
      isOtherAttributeCollapsible: true,
      isSizeCollapsible: true,
      isManufacturerCollapsible: true,
      isVendorCollapsible: true,
      isOnSaleChecked: false,
      isInStockChecked: false,
      selLowPrize: 0,
      selHighPrize: 0,
      attributeFilterdata: [],
      specificationFilterdata: [],

    }
    this.renderCategories = this.renderCategories.bind(this);
    this.renderPrizeRange = this.renderPrizeRange.bind(this);
    this.renderOnSellRenders = this.renderOnSellRenders.bind(this);
    this.renderInStockRenders = this.renderInStockRenders.bind(this);
    this.renderSpecificationRenders = this.renderSpecificationRenders.bind(this);
    this.renderOtherRenders = this.renderOtherRenders.bind(this);
    this.renderSize = this.renderSize.bind(this);
    this.renderManufacturers = this.renderManufacturers.bind(this);
    this.renderVendors = this.renderVendors.bind(this);
    this.onPrizeSlide = this.onPrizeSlide.bind(this);
    this.onPrizeSlideEnd = this.onPrizeSlideEnd.bind(this);

  }
  async componentDidMount() {

    await this.setState({
      selLowPrize: this.props.PrizeRangeUpdatedMin,
      selHighPrize: this.props.PrizeRangeUpdatedMax,
      attributeFilterdata: this.props.OtherFilterData.AttributeFilterGroups,
      specificationFilterdata: this.props.SpecificationData.SpecificationFilterGroups,
      // upperValue: ((this.props.PrizeRangeUpdatedMax != 0) ? this.props.PrizeRangeUpdatedMax : this.props.PrizeRangeDate.MaxPrice),
      //  lowerValue: ((this.props.PrizeRangeUpdatedMin != 0) ? this.props.PrizeRangeUpdatedMin : this.props.PrizeRangeDate.MinPrice),

    })
    if (this.props && this.props.onSaleChecked && this.props.onSaleChecked == true) {
      await this.setState({ isOnSaleChecked: true, })
    }
    if (this.props && this.props.inStockChecked && this.props.inStockChecked == true) {
      await this.setState({ isInStockChecked: true, })
    }

    // if (this.props && this.props.isAllFilterCollapcible == true) {
    //   this.renderSwitch('CloseAll')
    // }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAllFilterCollapcible == true) {
      this.renderSwitch('CloseAll')
      this.setState({
        attributeFilterdata: this.props.OtherFilterData.AttributeFilterGroups,
        specificationFilterdata: this.props.SpecificationData.SpecificationFilterGroups,
      })
    }

  }
  // componentWillUnmount() {
  // }

  oncategotySelection = async () => {
    await this.setState({
      isCategoriesCollapsible: false,
      isPrizeCollapsible: true,
      isOnSaleCollapsible: true,
      isInStockCollapsible: true,
      isSpecificationCollapsible: true,
      isOtherAttributeCollapsible: true,
      isSizeCollapsible: true,
      isManufacturerCollapsible: true,
      isVendorCollapsible: true,

    })
  }
  OnNodePress = (node) => {
    console.log("node..................................", node)
    if (node.SubCategories.length == 0) {
      this.props.navigation.navigate('FilterProductList', { passData: { pageName: 'filterMenu', data: node }, })

    }
  }

  onPrizeSlide = (low, high) => {
    //lowPrize = low;
    //highPrize = high;
    this.setState({ selLowPrize: low, selHighPrize: high, scrollEnabled: true })
    this.props.OnPrizeSliderChange(low, high)
  }

  onPrizeSlideEnd = () => {
    this.setState({ selLowPrize: lowPrize, selHighPrize: highPrize })
    this.props.OnPrizeSliderChange(lowPrize, highPrize)
  }



  // renderCategories = () => {
  //   return (
  //     <View style={styles.filterContainer}>
  //       <TouchableOpacity style={styles.filterTitleContainer} onPress={() => this.renderSwitch('Categories')}>

  //         <ButtonWithIcon
  //           userClick={(data) => this.renderSwitch('Categories')}
  //           mainContainerStyles={styles.title}
  //           // icon={Icons.notify}
  //           imageAvtarStyle={{
  //             height: 0,
  //             width: 0,
  //             margin: 5,
  //           }}
  //           titleStyle={{
  //             fontWeight: "400",
  //             //  fontSize: 13,
  //           }}
  //           Secondarytext={"Categories"}
  //           secondaryTitleStyle={{
  //             color: Colors.BLACK,
  //             ...Platform.select({
  //               ios: {
  //                 fontWeight: '800',
  //                 fontFamily: 'verdana',
  //               },
  //               android: {
  //                 fontWeight: 'normal',
  //                 fontFamily: 'verdanab',
  //               },
  //             }),
  //             fontSize: 15,
  //           }}
  //         />


  //         <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('Categories')}>

  //           {this.state.isCategoriesCollapsible ?
  //             <Image
  //               source={Icons.arrowDown}
  //             />
  //             :
  //             <Image
  //               style={{ transform: [{ rotate: '180deg' }], }}
  //               source={Icons.arrowDown}

  //             />}

  //         </TouchableOpacity>

  //       </TouchableOpacity>


  //       {this.state.isCategoriesCollapsible == false ?

  //         <View style={styles.expandViewContainer}>
  //           <>{this.props && this.props.CategoryData &&
  //             <View>{this.props.CategoryData.length > 0 ?
  //               <View style={styles.menuContainerBox}>

  //                 <NestedListView
  //                   style={{ flex: 1 }}
  //                   // onNodePressed={(node) => this.props.OnClick(node)}
  //                   data={this.state.categoryViewMore ? this.props.CategoryData : this.props.CategoryData.slice(0, 4)}
  //                   getChildrenName={(node) => 'SubCategories'}
  //                   renderNode={(node, level, isExpanded, hasChildrenNodes) => (

  //                     <NestedRow level={level}>
  //                       { level == 1 ? <View
  //                         style={styles.nodeStyle}>
  //                         <TouchableOpacity
  //                           onPress={async () => {
  //                             this.props.OnClick(node)
  //                             await this.oncategotySelection()
  //                           }}
  //                         >
  //                           <Text
  //                             style={node.CustomProperties.CurrentOrIncludeCategory ? styles.RedNodeTextStyle : styles.nodeTextStyle}>
  //                             {node.Name}
  //                           </Text>
  //                         </TouchableOpacity>

  //                       </View>
  //                         :
  //                         <View
  //                           style={styles.semiNodeStyle}>
  //                           {node.CustomProperties.CurrentOrIncludeCategory ?

  //                             <TouchableOpacity
  //                               onPress={async () => {
  //                                 this.props.OnClick(node)
  //                                 await this.oncategotySelection()
  //                               }}
  //                             >
  //                               <Text
  //                                 style={styles.semiNodeRedTextStyle}>
  //                                 {node.Name}
  //                               </Text>
  //                             </TouchableOpacity>
  //                             :
  //                             <TouchableOpacity
  //                               onPress={async () => {
  //                                 this.props.OnClick(node)
  //                                 await this.oncategotySelection()
  //                               }}
  //                             >
  //                               <Text
  //                                 style={[node.IsBrowseAllLink ? styles.semiNodeRedTextStyle : styles.semiNodeTextStyle]}>
  //                                 {node.Name}
  //                               </Text>
  //                             </TouchableOpacity>
  //                           }


  //                         </View>}
  //                     </NestedRow>
  //                   )}
  //                 />
  //                 <TouchableOpacity onPress={() => this.setState({ categoryViewMore: !this.state.categoryViewMore })}>
  //                   <Text style={{ paddingLeft: 15, color: Colors.PRIMARY, textDecorationLine: 'underline' }}>{!this.state.categoryViewMore ? "View More" : "View Less"}</Text>
  //                 </TouchableOpacity>

  //               </View>
  //               :
  //               <></>
  //             }</View>}
  //           </>

  //         </View>

  //         : <></>}

  //       {/* </Collapsible> */}
  //     </View>
  //   )
  // }

  renderCategories = () => {
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterTitleContainer} onPress={() => {
          this.renderSwitch('Categories')
        }}>

          <ButtonWithIcon
            userClick={(data) => {
              this.renderSwitch('Categories')
            }}
            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}
            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={"Categories"}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />


          <View style={styles.ArrowContainer} >

            {this.state.isCategoriesCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </View>

        </TouchableOpacity>


        {this.state.isCategoriesCollapsible == false ?



          <View style={styles.menuContainerBox}>
            <View style={styles.expandViewContainer}>
              <FilterCategoryList
                CategoryData={this.props.CategoryData}
                userClick={(item) => this.props.OnClick(item)}
              />


              {/* <NestedListView
                style={{ flex: 1 }}
                // onNodePressed={(node) => this.props.OnClick(node)}
                data={this.props.CategoryData}
                getChildrenName={(node) => 'SubCategories'}
                renderNode={(node, level, isExpanded, hasChildrenNodes) => (

                  <NestedRow level={level}>
                    { level == 1 ? <View
                      style={styles.nodeStyle}>
                      <TouchableOpacity
                        onPress={async () => {
                          this.props.OnClick(node)
                          await this.oncategotySelection()
                        }}
                      >
                        <Text
                          style={node.CustomProperties.CurrentOrIncludeCategory ? styles.RedNodeTextStyle : styles.nodeTextStyle}>
                          {node.Name}
                        </Text>
                      </TouchableOpacity>

                    </View>
                      :
                      <View
                        style={styles.semiNodeStyle}>
                        {node.CustomProperties.CurrentOrIncludeCategory ?

                          <TouchableOpacity
                            onPress={async () => {
                              this.props.OnClick(node)
                              await this.oncategotySelection()
                            }}
                          >
                            <Text
                              style={styles.semiNodeRedTextStyle}>
                              {node.Name}
                            </Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={async () => {
                              this.props.OnClick(node)
                              await this.oncategotySelection()
                            }}
                          >
                            <Text
                              style={[node.IsBrowseAllLink ? styles.semiNodeRedTextStyle : styles.semiNodeTextStyle]}>
                              {node.Name}
                            </Text>
                          </TouchableOpacity>
                        }


                      </View>}
                  </NestedRow>
                )}
              /> */}
              {/* <TouchableOpacity onPress={() => this.setState({ categoryViewMore: !this.state.categoryViewMore })}>
                    <Text style={{ paddingLeft: 15, color: Colors.PRIMARY, textDecorationLine: 'underline' }}>{!this.state.categoryViewMore ? "View More" : "View Less"}</Text>
                  </TouchableOpacity> */}

            </View>



          </View>

          : <></>}

        {/* </Collapsible> */}
      </View>
    )
  }

  renderPrizeRange = () => {
    return (
      <>
        {this.props && this.props.PrizeRangeDate && <>
          {this.props.PrizeRangeDate != '' ?
            <View style={styles.filterContainer}>
              <TouchableOpacity 
              testID = {"priceRangeSelector"}
              accessibilityLabel="priceRangeSelector"
              style={styles.filterTitleContainer} onPress={() => this.renderSwitch('PrizeRange')}>


                <ButtonWithIcon
                  testId={"priceRangeSelector"}
                  userClick={(data) => this.renderSwitch('PrizeRange')}
                  mainContainerStyles={styles.title}
                  // icon={Icons.notify}
                  imageAvtarStyle={{
                    height: 0,
                    width: 0,
                    margin: 5,
                  }}


                  titleStyle={{
                    fontWeight: "400",
                    //  fontSize: 13,
                  }}
                  Secondarytext={"Price range"}
                  secondaryTitleStyle={{
                    color: Colors.BLACK,
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
                    fontSize: 15,
                  }}
                />

                <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('PrizeRange')}>

                  {this.state.isPrizeCollapsible ?
                    <Image
                      source={Icons.arrowDown}
                    />
                    :
                    <Image
                      style={{ transform: [{ rotate: '180deg' }], }}
                      source={Icons.arrowDown}

                    />}

                </TouchableOpacity>
              </TouchableOpacity>
              {this.state.isPrizeCollapsible == false ?

                <View style={styles.expandViewContainer}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 3 * 2, alignSelf: 'center', marginBottom: -30, }}>
                    {<Text>Min: {(this.props.PrizeRangeUpdatedMin != 0) ? this.props.PrizeRangeUpdatedMin : this.props.PrizeRangeDate.MinPrice}</Text>}
                    {<Text>Max: {(this.props.PrizeRangeUpdatedMax != 0) ? this.props.PrizeRangeUpdatedMax : this.props.PrizeRangeDate.MaxPrice}</Text>}

                  </View>

                  <View 
                  testID = {"priceRangeSlider"}
                  accessibilityLabel="priceRangeSlider"
                  style={{ padding: 20, alignSelf: 'center', margin: 10, alignContent: 'center' }}>
                    {/* <RangeSlider
                      style={{ width: width / 3 * 2, height: 80, alignSelf: 'center', }}
                      min={this.props.PrizeRangeDate.MinPrice}
                      max={this.props.PrizeRangeDate.MaxPrice}
                      initialLowValue={(this.props.PrizeRangeUpdatedMin != 0) ? this.props.PrizeRangeUpdatedMin : this.props.PrizeRangeDate.MinPrice}
                      initialHighValue={(this.props.PrizeRangeUpdatedMax != 0) ? this.props.PrizeRangeUpdatedMax : this.props.PrizeRangeDate.MaxPrice}
                      step={Math.round((this.props.PrizeRangeDate.MaxPrice - this.props.PrizeRangeDate.MinPrice) / 100)}
                      selectionColor={Colors.PRIMARY}
                      labelTextColor={Colors.WHITE}
                      labelBackgroundColor={Colors.PRIMARY}
                      blankColor="#f618"
                      onValueChanged={(low, high) =>
                        this.onPrizeSlide(low, high)
                      }
                      onTouchEnd={() =>
                        this.onPrizeSlideEnd()
                      }
                    /> */}
                    <MultiSlider
                      markerStyle={{
                        ...Platform.select({
                          ios: {
                            height: 30,
                            width: 30,
                            shadowColor: '#000000',
                            shadowOffset: {
                              width: 0,
                              height: 3
                            },
                            shadowRadius: 1,
                            shadowOpacity: 0.1,
                          },
                          android: {
                            height: 30,
                            width: 30,
                            borderRadius: 50,
                            borderColor: '#000000',
                            borderWidth: 1,
                            backgroundColor: '#ffffff',

                          }
                        })
                      }}
                      pressedMarkerStyle={{
                        ...Platform.select({
                          android: {
                            height: 30,
                            width: 30,
                            borderRadius: 20,
                            backgroundColor: '#ffffff'
                          }
                        })
                      }}
                      selectedStyle={{
                        backgroundColor: Colors.PRIMARY
                      }}
                      trackStyle={{
                        backgroundColor: '#CECECE',
                        alignSelf: 'center'
                      }}
                      touchDimensions={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        slipDisplacement: 40
                      }}
                      values={[this.props.PrizeRangeUpdatedMin, this.props.PrizeRangeUpdatedMax]}
                      sliderLength={width / 3 * 2}
                      //onValuesChange={multiSliderValuesChange}
                      onValuesChangeFinish={(values) => this.onPrizeSlide(values[0], values[1])}
                      min={this.props.PrizeRangeDate.MinPrice}
                      max={this.props.PrizeRangeDate.MaxPrice}
                      step={Math.round((this.props.PrizeRangeDate.MaxPrice - this.props.PrizeRangeDate.MinPrice) / 100) ? Math.round((this.props.PrizeRangeDate.MaxPrice - this.props.PrizeRangeDate.MinPrice) / 100) : 1}
                      //allowOverlap
                      snapped
                      //customLabel={CustomLabel}
                      onValuesChangeStart={this.disableScroll}
                    // onValuesChangeFinish={this.enableScroll}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 3 * 2, alignSelf: 'center', }}>
                      <View style={{ borderWidth: 1, borderRadius: 15, }}>
                        <Text 
                        testID = {"sliderrange"}
                        accessibilityLabel="sliderrange"
                        style={{ padding: 5, paddingLeft: 10, paddingRight: 10, }}>{this.props.PrizeRangeDate.MinPrice}</Text>
                      </View>
                      <View style={{ borderWidth: 1, borderRadius: 15, }}>
                        <Text 
                        testID = {"sliderActive"}
                        accessibilityLabel="sliderActive"
                        style={{ padding: 5, paddingLeft: 10, paddingRight: 10, }}>{this.props.PrizeRangeDate.MaxPrice}</Text>
                      </View>
                    </View>

                  </View>
                </View>
                : <></>}

            </View>

            :
            <></>}
        </>}</>
    )
  }
  //enableScroll = () => this.setState({ scrollEnabled: true });
  disableScroll = () => this.setState({ scrollEnabled: false });

  SpecificationEvent = (datas, item, DataIndex) => {
    var data = datas.child
    var newArray = []
    var passData = { parent: item, child: newArray, dataIndex: DataIndex }
    this.props.onSpecificationCategoriesSelected(passData)
  }

  renderOnSellRenders = () => {
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterTitleContainer} onPress={() => this.renderSwitch('OnSell')}>


          <ButtonWithIcon
            userClick={(data) => this.renderSwitch('OnSell')}
            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: 'normal',
              //  fontSize: 13,
            }}
            Secondarytext={'On Sale'}
            secondaryTitleStyle={{
              color: Colors.BLACK,
              fontFamily: 'verdanab',
              //textDecorationLine: 'underline',
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('OnSell')}>

            {this.state.isOnSaleCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {!this.state.isOnSaleCollapsible && <View style={[styles.listItemContainer, this.props.listItemContainerStyle]}>

          {this.state.isOnSaleChecked == false ?
            <TouchableOpacity style={styles.unSelChkBox} onPress={() => this.OnSaleClick()}></TouchableOpacity>
            : <></>
          }
          {this.state.isOnSaleChecked == true ?
            <TouchableOpacity style={styles.selChkBox} onPress={() => this.OnSaleClick()}><Text style={{ color: Colors.WHITE, }}>✔</Text></TouchableOpacity>
            : <></>
          }

          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {this.props.OnSaleData.Name}
          </Text>
        </View>}
      </View>
    )
  }

  OnSaleClick = async () => {
    await this.setState({ isOnSaleChecked: !this.state.isOnSaleChecked })
    this.props.OnSaleClicked(this.state.isOnSaleChecked);
  }



  renderInStockRenders = () => {
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterTitleContainer} onPress={() => this.renderSwitch('InStock')}>

          <ButtonWithIcon
            userClick={(data) => this.renderSwitch('InStock')}
            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: 'normal',
              //  fontSize: 13,
            }}
            Secondarytext={'In Stock'}
            secondaryTitleStyle={{
              color: Colors.BLACK,
              fontFamily: 'verdanab',
              //textDecorationLine: 'underline',
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('InStock')}>

            {this.state.isInStockCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {!this.state.isInStockCollapsible && <View style={[styles.listItemContainer, this.props.listItemContainerStyle]}>

          {this.state.isInStockChecked == false ?
            <TouchableOpacity style={styles.unSelChkBox} onPress={() => this.OnInStockClick()}></TouchableOpacity>
            : <></>
          }
          {this.state.isInStockChecked == true ?
            <TouchableOpacity style={styles.selChkBox} onPress={() => this.OnInStockClick()}><Text style={{ color: Colors.WHITE, }}>✔</Text></TouchableOpacity>
            : <></>
          }

          <Text style={[styles.normalText, this.props.normalTextStyles]}>
            {this.props.InStockData.Name}
          </Text>
        </View>}
      </View>
    )
  }

  OnInStockClick = async () => {
    await this.setState({ isInStockChecked: !this.state.isInStockChecked })
    this.props.InStockClicked(this.state.isInStockChecked);
  }


  renderSpecificationRenders = ({ item, index }) => {
    return (
      <View key={index} style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterTitleContainer} onPress={() => this.onspecificationCollapsibleCllick(item, index)}>

          <ButtonWithIcon
            userClick={(data) => this.onspecificationCollapsibleCllick(item, index)}
            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={item.Name}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.onspecificationCollapsibleCllick(item, index)}>

            {!item.IsMain ?

              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {item.IsMain && <FilterSearchList
          listData={item.FilterItems}
          userClick={(data) => this.SpecificationEvent(data, item, index)}
          keyExtractor={(item, index) => index}
        />}
      </View>
    )
  }

  OtherAttributeEvent = (datas, item, dataIndex) => {
    var data = datas.child


    var newArray = []
    var passData = { parent: item, child: newArray, dataIndex: dataIndex }

    this.props.onOtherCategoriesSelected(passData)
  }

  onspecificationCollapsibleCllick = (item, index) => {


    let tempArray = Array.apply(null, Array(this.state.specificationFilterdata.length)).map((v, i) => {
      let specificationFilter = this.state.specificationFilterdata[i]
      specificationFilter.DisplayOrder = specificationFilter.DisplayOrder
      specificationFilter.FilterItems = specificationFilter.FilterItems
      specificationFilter.Id = specificationFilter.Id
      if (i == index) {

        specificationFilter.IsMain = !specificationFilter.IsMain
      } else {
        specificationFilter.IsMain = false
      }
      specificationFilter.Name = specificationFilter.Name
      return specificationFilter;
    });

    this.setState({
      specificationFilterdata: tempArray,
      isCategoriesCollapsible: true,
      isPrizeCollapsible: true,
      isOnSaleCollapsible: true,
      isInStockCollapsible: true,
      isSpecificationCollapsible: true,
      isOtherAttributeCollapsible: true,
      isSizeCollapsible: true,
      isManufacturerCollapsible: true,
      isVendorCollapsible: true,

    })
    this.attributebuteFilterStatusChange();
  }

  onAttrbuteCollapsibleCllick = (item, index) => {
    // let attributeFilters = this.state.attributeFilterdata specificationFilterdata
    // attributeFilters[index] = {
    //   FilterItems: item.FilterItems,
    //   Id: item.Id,
    //   IsMain: !item.IsMain,
    //   Name: item.Name
    // }   

    let tempArray = Array.apply(null, Array(this.state.attributeFilterdata.length)).map((v, i) => {
      let attributeFilter = this.state.attributeFilterdata[i]
      attributeFilter.FilterItems = attributeFilter.FilterItems
      attributeFilter.Id = attributeFilter.Id
      if (i == index) {

        attributeFilter.IsMain = !attributeFilter.IsMain
      } else {
        attributeFilter.IsMain = false
      }
      attributeFilter.Name = attributeFilter.Name
      return attributeFilter;
    });

    this.setState({
      attributeFilterdata: tempArray,
      isCategoriesCollapsible: true,
      isPrizeCollapsible: true,
      isOnSaleCollapsible: true,
      isInStockCollapsible: true,
      isSpecificationCollapsible: true,
      isOtherAttributeCollapsible: true,
      isSizeCollapsible: true,
      isManufacturerCollapsible: true,
      isVendorCollapsible: true,

    })
    this.specificationFilterStatusChange()
  }
  renderOtherRenders = ({ item, index }) => {
    return (
      <View key={index} style={styles.filterContainer}>
        {/* <TouchableOpacity style={styles.filterTitleContainer} onPress={() => this.renderSwitch('OtherRenders')}> */}
        <TouchableOpacity 
        testID = {"FilterOption"}
        accessibilityLabel="FilterOption"
        style={styles.filterTitleContainer} onPress={() => this.onAttrbuteCollapsibleCllick(item, index)}>

          <ButtonWithIcon
            // userClick={(data) => this.renderSwitch('OtherRenders')}
            userClick={(data) => this.onAttrbuteCollapsibleCllick(item, index)}

            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={item.Name}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />

          {/* <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('OtherRenders')}> */}
          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.onAttrbuteCollapsibleCllick(item, index)}>

            {/* {this.state.isOtherAttributeCollapsible ? */}
            {!item.IsMain ?

              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {/* {!this.state.isOtherAttributeCollapsible && <FilterSearchList
          listData={item.FilterItems}
          userClick={(data) => this.OtherAttributeEvent(data, item, index)}

        />} */}
        {item.IsMain && <FilterSearchList
          viewMoreKey={"selectMore"}
          checkboxKey={"selectCheckBox"}
          listData={item.FilterItems}
          userClick={(data) => this.OtherAttributeEvent(data, item, index)}

        />}

      </View>


    )
  }

  renderSize = () => {
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity 
        testID = {"sizeFilter"}
        accessibilityLabel="sizeFilter"
        style={styles.filterTitleContainer} onPress={() => this.renderSwitch('Size')}>

          <ButtonWithIcon
            userClick={(data) => this.renderSwitch('Size')}
            mainContainerStyles={styles.title}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={"Size"}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('Size')}>

            {this.state.isSizeCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {!this.state.isSizeCollapsible && <FilterSearchList
          viewMoreKey={"selectMoreSizes"}
          checkboxKey={"sizeCheckBox"}
          listData={this.props.Sizedata}
          userClick={(data) => console.log("checkbox..............", data)}

        />}
      </View>
    )
  }

  renderManufacturers = () => {
    return (

      <View style={styles.filterContainer}>
        <TouchableOpacity 
        testID = {"manufactureFilter"}
        accessibilityLabel="manufactureFilter"
        style={styles.filterTitleContainer} onPress={() => this.renderSwitch('Manufacturers')}>

          <ButtonWithIcon
            userClick={(data) => this.renderSwitch('Manufacturers')}
            mainContainerStyles={styles.title}
            // icon={Icons.notify}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}


            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={"Manufacturers"}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('Manufacturers')}>

            {this.state.isManufacturerCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>

        {this.state.isManufacturerCollapsible == false ? <FilterSearchList
          viewMoreKey={"selectMoreManufacturers"}
          checkboxKey={"manufactureCheckBox"}
          listData={this.props.Manufacturerdata.ManufacturerFilterItems}
          userClick={(data) => this.props.onManufacturerdataChange(data)}

        />
          : <></>}
      </View>

    )
  }

  renderVendors = () => {
    return (

      <View style={styles.filterContainer}>
        <TouchableOpacity 
        testID = {"vendorFilter"}
        accessibilityLabel="vendorFilter"
        style={styles.filterTitleContainer} onPress={() => this.renderSwitch('Vendors')}>

          <ButtonWithIcon
            userClick={(data) => this.renderSwitch('Vendors')}
            mainContainerStyles={styles.title}
            imageAvtarStyle={{
              height: 0,
              width: 0,
              margin: 5,
            }}
            titleStyle={{
              fontWeight: "400",
              //  fontSize: 13,
            }}
            Secondarytext={"Vendors"}
            secondaryTitleStyle={{
              color: Colors.BLACK,
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
              fontSize: 15,
            }}
          />

          <TouchableOpacity style={styles.ArrowContainer} onPress={() => this.renderSwitch('Vendors')}>

            {this.state.isVendorCollapsible ?
              <Image
                source={Icons.arrowDown}
              />
              :
              <Image
                style={{ transform: [{ rotate: '180deg' }], }}
                source={Icons.arrowDown}

              />}

          </TouchableOpacity>
        </TouchableOpacity>
        {this.state.isVendorCollapsible == false ? <FilterSearchList
          viewMoreKey={"selectMoreVendors"}
          checkboxKey={"vendorsCheckBox"}
          listData={this.props.Vendordata.VendorFilterItems}
          userClick={(data) => this.props.onVendordataChange(data)}

        />
          : <></>}
      </View>

    )
  }
  attributebuteFilterStatusChange = () => {
    if (this.state.attributeFilterdata && this.state.attributeFilterdata.length > 0) {
      console.log("attributebuteFilterStatusChange############", this.state.attributeFilterdata)

      // let attributeFilter = this.state.attributeFilterdata
      // for (let i = 0; attributeFilter > i; i++) {
      //   // attributeFilter[i].FilterItems = attributeFilter[i].FilterItems
      //   // attributeFilter[i].Id = attributeFilter[i].Id
      //   attributeFilter[i].IsMain = !attributeFilter[i].IsMain
      //   // attributeFilter[i].Name = attributeFilter[i].Name
      // }


      let tempArray = Array.apply(null, Array(this.state.attributeFilterdata.length)).map((v, i) => {
        let attributeFilter = this.state.attributeFilterdata[i]
        attributeFilter.FilterItems = attributeFilter.FilterItems
        attributeFilter.Id = attributeFilter.Id
        attributeFilter.IsMain = false
        attributeFilter.Name = attributeFilter.Name
        return attributeFilter;
      });

      console.log("attributebuteFilterStatusChange......", tempArray)

      this.setState({ attributeFilterdata: tempArray })
    }
  }

  specificationFilterStatusChange = () => {
    if (this.state.specificationFilterdata && this.state.specificationFilterdata.length > 0) {
      console.log("attributebuteFilterStatusChange############", this.state.specificationFilterdata)

      // let attributeFilter = this.state.attributeFilterdata
      // for (let i = 0; attributeFilter > i; i++) {
      //   // attributeFilter[i].FilterItems = attributeFilter[i].FilterItems
      //   // attributeFilter[i].Id = attributeFilter[i].Id
      //   attributeFilter[i].IsMain = !attributeFilter[i].IsMain
      //   // attributeFilter[i].Name = attributeFilter[i].Name
      // }


      let tempArray = Array.apply(null, Array(this.state.specificationFilterdata.length)).map((v, i) => {
        let specification = this.state.specificationFilterdata[i]
        specification.DisplayOrder = specification.DisplayOrder
        specification.FilterItems = specification.FilterItems
        specification.Id = specification.Id
        specification.IsMain = false
        specification.Name = specification.Name
        return specification;
      });

      console.log("attributebuteFilterStatusChange......", tempArray)

      this.setState({ specificationFilterdata: tempArray })
    }
  }

  renderSwitch(param) {
    switch (param) {
      case 'Categories':
        {
          this.setState({
            isCategoriesCollapsible: !this.state.isCategoriesCollapsible,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }


      case 'PrizeRange':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: !this.state.isPrizeCollapsible,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'OnSell':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: !this.state.isOnSaleCollapsible,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'InStock':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: !this.state.isInStockCollapsible,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }

      case 'Specification':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: !this.state.isSpecificationCollapsible,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'OtherRenders':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: !this.state.isOtherAttributeCollapsible,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'Manufacturers':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: !this.state.isManufacturerCollapsible,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'Vendors':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: !this.state.isVendorCollapsible,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      case 'CloseAll':
        {
          this.setState({
            isCategoriesCollapsible: true,
            isPrizeCollapsible: true,
            isOnSaleCollapsible: true,
            isInStockCollapsible: true,
            isSpecificationCollapsible: true,
            isOtherAttributeCollapsible: true,
            isSizeCollapsible: true,
            isManufacturerCollapsible: true,
            isVendorCollapsible: true,

          })
          this.attributebuteFilterStatusChange()
          this.specificationFilterStatusChange()
          return
        }
      default:
        return (<></>);
    }
  }


  render() {

    return (
      <ScrollView style={styles.selectContainer} scrollEnabled={this.state.scrollEnabled}>




        {this.props.CategoryData && (this.props.CategoryData.length > 0) && <>
          {this.renderCategories()}
        </>
        }
        {this.props && this.props.PrizeRangeDate && this.props.PrizeRangeDate.MaxPrice > 0 && <>
          {this.renderPrizeRange()}
        </>}

        {this.props.OnSaleData && <>
          {this.renderOnSellRenders()}
        </>}

        {this.props.InStockData && <>
          {this.renderInStockRenders()}
        </>}


        <View>
          {this.props && this.props.SpecificationData && this.props.SpecificationData.SpecificationFilterGroups && <FlatList
            style={[styles.container, this.props.containerStyles]}
            data={this.state.specificationFilterdata}
            // initialNumToRender={this.props.SpecificationData.SpecificationFilterGroups.length}
            renderItem={this.renderSpecificationRenders}
            keyExtractor={(item, index) => index}
          />}
        </View>


        {this.props && this.props.OtherFilterData && this.props.OtherFilterData.AttributeFilterGroups && <FlatList
          style={[styles.container, this.props.containerStyles]}
          data={this.state.attributeFilterdata}
          renderItem={this.renderOtherRenders}
          keyExtractor={(item, index) => index}
        />}

        {this.props && this.props.Manufacturerdata && this.props.Manufacturerdata.ManufacturerFilterItems && this.props.Manufacturerdata.ManufacturerFilterItems.length > 0 && <>
          {this.renderManufacturers()}
        </>
        }

        {this.props && this.props.Vendordata && this.props.Vendordata.VendorFilterItems && this.props.Vendordata.VendorFilterItems.length > 0 && <>

          {this.renderVendors()}
        </>}

      </ScrollView>
    )
  }
}