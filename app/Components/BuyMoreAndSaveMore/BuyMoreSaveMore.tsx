import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';
import { Icons } from '@assets';
const styles = require('./BuyMoreSaveMoreStyles');

export default class App extends React.Component {

    constructor(props) {
        super()
        this.state = {
            price: 0,

        }
        this.props = props;
        this._carousel = {};
        this.onQuantityChange = { String };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.pQuantity !== this.props.pQuantity) {
            this.changeCard(nextProps.pQuantity);
        }

    }

    changeCard = (pQuantity) => {

        var result, slabValues;
        const { data } = this.props;
        var tierPrices = [];
        tierPrices = data.TierPrices;
        if (tierPrices != undefined && tierPrices != null) {
            result = tierPrices.map(o => ({ Quantity: o.Quantity }));
        }
        slabValues = result?.map(a => a.Quantity);
        console.log("Slab prices", slabValues);
        if (slabValues != null) {
            let slabAdjusted = false;
            let tempLimit = 0;
            for (var idx = 0; idx < slabValues.length; idx++) {
                const currentLimit = slabValues[idx];
                if (pQuantity >= currentLimit) {
                    tempLimit = idx;
                    slabAdjusted = true;
                } else {
                    break
                }
            }
            if (slabAdjusted === false) {
                this._carousel.snapToItem(0, true, false);
            } else {
                this._carousel.snapToItem(tempLimit, true, false);
            }
        }
    }

    handle_render_first_item = () => {
        const { data, pMiniQuantity, pPrice } = this.props;
        console.log("FirstItem", data.ProductPrice)


        return (
            <TouchableOpacity
                style={styles.button}
            >
                <View style={styles.cardContent}>
                    <View style={styles.card}>
                        <Text style={styles.titleStyle}>Per Unit {pPrice}</Text>
                        <Text style={styles.txtStyle}>- % Discount</Text>
                        <Text style={styles.txtStyle}>{pMiniQuantity} Pieces+</Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    handleFindIndex = () => {
        var result, slabValues;
        const { data, pQuantity, pMiniQuantity } = this.props;
        var tierPrices = [];
        tierPrices = data.TierPrices;
        if (tierPrices != undefined && tierPrices != null) {
            result = tierPrices.map(o => ({ Quantity: o.Quantity }));

        }
        slabValues = result?.map(a => a.Quantity);

        if (slabValues != undefined && slabValues != null) {
            let tempLimit = 0;
            let slabAdjusted = false;
            for (var idx = 0; idx < slabValues.length; idx++) {
                const currentLimit = slabValues[idx];
                if (pQuantity >= currentLimit) {
                    this._carousel.snapToItem(idx, true, false);
                    this.props.onQuantityChange(currentLimit);
                    tempLimit = idx;
                    slabAdjusted = true;
                } else {
                    break;
                }
            }
            if (slabAdjusted === false) {
                this._carousel.snapToItem(0, true, false);
            } else {
                this._carousel.snapToItem(tempLimit, true, false);
            }
        }
    }
    handleSnapToItem(index) {
        this.setState({ index: index })
        var result, result1;
        const { data, pQuantity } = this.props;
        var tierPrices = [];
        tierPrices = data.TierPrices;
        if (tierPrices != undefined && tierPrices != null) {
            result = tierPrices.map(o => ({ Quantity: o.Quantity }));
        }
        result1 = result?.map(a => a.Quantity);

        if (result1 != null) {
            this.props.onQuantityChange(result1[index]);
        }
    }

    hideIndicatorAfterCarouselLoad = (index) => {
        console.log("INDEX", index)

    }
    _renderItem({ item, index }) {
        console.log("Index", index)
        return (
            <TouchableOpacity
                style={styles.button}

            >

                <View style={styles.cardContent}>
                    <View style={styles.card}>
                        <Text style={styles.titleStyle}
                        >Per Unit {item.Price}</Text>
                        <Text style={styles.txtStyle}>{item.CalculatedDiscount.toFixed(2)} % Discount</Text>
                        <Text style={styles.txtStyle}>{item.Quantity} Pieces +</Text>

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    handleNewTierPrices = () => {
        const { data, pMiniQuantity, pPrice } = this.props;
        var newTierPrices = [];
        var newObj = {};


        if (data.TierPrices != null && pMiniQuantity < data.TierPrices[0].Quantity && pPrice != '') {
            newObj = {
                "Price": pPrice,
                "TotalPrice": pPrice,
                "CalculatedDiscount": 0,
                "Quantity": pMiniQuantity,
                "Id": 1,
                "CustomProperties": {},
            }
            newTierPrices = data.TierPrices.unshift(newObj);

        }
    }
    // goForward = () => {
    //     this._carousel.current.snapToNext();
    // };
    increase = () => {
        // console.log("CLICKING NEXT")
        this._carousel.snapToNext();
    }
    decrease = () => {
        // console.log("CLICKING PREV")
        this._carousel.snapToPrev();
    }

    render() {

        const { data, pMiniQuantity, pPrice } = this.props;
        console.log("Data", data.TierPrices[0].Quantity, data.TierPrices.Count);
        return (
            <View style={styles.parentContainer}>
                <View style={styles.container}>

                    <View style={styles.titleBlock}>
                        {data.TierPrices != null && data.TierPrices != null ?
                            <Text style={styles.productTitle}>{this.props.title}</Text>
                            :
                            <></>
                        }
                    </View>
                    {this.handleNewTierPrices()}
                    <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                        <TouchableOpacity
                            style={{ padding: 5, marginRight: -10, marginLeft: -10 }}
                            onPress={() => this.decrease()}>
                            <Image style={styles.backAvatar} source={Icons.arrowBack} />
                        </TouchableOpacity>

                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={data.TierPrices}
                            renderItem={this._renderItem.bind(this)}
                            onSnapToItem={this.handleSnapToItem.bind(this)

                            }
                            sliderWidth={400}
                            itemWidth={140}


                            layout={'default'}
                            firstItem={0}
                            horizontal={true}
                            layoutCardOffset={`9`}
                            showsHorizontalScrollIndicator={false}
                            containerCustomStyle={{ paddingLeft: 20, marginTop: 15 }}
                            activeSlideAlignment="start"
                        // initialScrollIndex={0}

                        //////for removing the flicking out image
                        // loopClonesPerSide={5}
                        // lockScrollTimeoutDuration={1000}
                        // autoplayDelay={1000}
                        // autoplayInterval={4000}

                        // loop={true}
                        // onPress={() => { this.refs.carousel.snapToNext() }}


                        // autoplay={true}
                        // loop={true}
                        // useScrollView={true}
                        // enableMomentum={true}
                        // lockScrollWhileSnapping={false}
                        // lockScrollWhileSnapping={true}
                        // loopClonesPerSide={4}
                        // swipeThreshold={20}
                        // enableSnap={true}
                        // enableMomentum={false}

                        >
                        </Carousel>
                        <TouchableOpacity
                            style={{ padding: 5, marginRight: -10, marginLeft: -10 }}
                            onPress={() => this.increase()}>
                            <Image style={styles.backAvatar} source={Icons.arrowNext} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}