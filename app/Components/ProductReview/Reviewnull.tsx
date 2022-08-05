import React, { Component } from 'react'
import { Text, View, TextInput, Alert } from 'react-native'
import Modal from "react-native-modal";
import { Images, Icons } from '@assets';
import TapRating from '../StarRatings/TapRating';
import Button from '../Button/Button';
import { Colors } from "@theme";
const styles = require('./ProductReviewStyles');

export default class extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        modalVisible: this.props.modalVisible
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        this.props.oncancel()
    }


    render() {
        const { modalVisible } = this.state;
        return (<>
            <Modal style={styles.modalView} isVisible={modalVisible}>
                <View style={styles.Inputbox}>
                    <Text style={styles.Inputlabel}>
                        You have not purchase this product
                    </Text>
                    <View style={styles.Inputbtn}>
                        <Button
                            title={'Back'}
                            btnStyle={{ borderWidth: 1, borderColor: Colors.PRIMARY, backgroundColor: Colors.WHITE, width: "48%", marginLeft: 5, marginRight: 0, height: 40, }}
                            titleStyle={{ color: Colors.PRIMARY, fontSize: 16 }}
                            OnClick={() => this.setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>

        </>)

    }
}