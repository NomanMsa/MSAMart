import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    Platform
} from 'react-native';
const styles = require('./ROListItemStyle');
import { FormatDate } from '@utils'
import { Constants } from '@config';
//-----------------------Bold specific string-----------------------------------------------
const itemTitle = (itemTitle) => {
    return (
        <Text style={{ fontWeight: 'bold' }}>{itemTitle}</Text>
    )
}

export default class extends Component {
    static defaultProps = {
        onProductClick: () => { },
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //----------------------- download file -----------------------------------------------
    handleClick = (guid) => {
        console.log('url.............', guid)
        const url = Constants.HOST_URL + 'Admin/Download/GetFileUpload?downloadId=' + guid
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + guid);
            }
        });
    };

    _openLink = (itemGuid) => {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 12 }}>
                <Text style={{ ...styles.itemDetailsText, marginBottm: 8, marginLeft: 0 }}> Uploaded file: </Text>
                <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={() => { this.handleClick(itemGuid) }}>
                    <View>
                        <Text style={{ ...styles.linkingText, marginLeft: -15 }}>Download</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    //-----------------------render list Item-----------------------------------------------
    render() {
       
        return (
            <>
                {this.props.Items.map((item, i) => (<>
                    <TouchableOpacity key={i} style={{ ...styles.orderPayContainer, alignItems: 'flex-start' }} >
                        <View>
                            <Text testID = {"returnItems"} accessibilityLabel="returnItems" style={styles.itemHeaderText}>
                                Return #{item.CustomNumber} - {item.ReturnStatus}
                            </Text>
                            <Text testID = {"itemName"} accessibilityLabel="itemName" style={styles.itemDetailsText}>Returned Item: {itemTitle(item.ProductName)} x {itemTitle(item.Quantity)}</Text>
                            <Text testID = {"reasonTxt"} accessibilityLabel="reasonTxt" style={styles.itemDetailsText}>Return Reason: {item.ReturnReason}</Text>
                            <Text testID = {"actionTxt"} accessibilityLabel="actionTxt" style={styles.itemDetailsText}>Return Action: {item.ReturnAction}</Text>
                            <Text style={styles.itemDetailsText}>Date Requested: {item.CreatedOn ? FormatDate.formatDate(item.CreatedOn, 'dd/mm/yyyy') : null} {new Date(item.CreatedOn).toLocaleTimeString()}</Text>
                            <Text style={styles.itemDetailsText}>Return Status: {item.ReturnRequestStatus}</Text>
                            <Text style={{ ...styles.itemDetailsText}}>Order Item Status: {item.ItemStatus}</Text>
                            {(item.UploadedFileGuid == '00000000-0000-0000-0000-000000000000') ?
                                null
                                :
                                this._openLink(item.UploadedFileGuid)
                            }
                            {item.Comments
                                ?
                                <View>
                                    <Text style={styles.itemDetailsText}>Your Comments: </Text>
                                    <Text style={{ ...styles.itemDetailsText, marginBottom: 24, color: 'gray' }}>{item.Comments}</Text>
                                </View>
                                :
                                <View style={{ height: 16 }} />
                            }
                            {
                                // item.ReturnShipmentBriefModel.Id ?

                                    <View style={styles.orderContainer}>
                                        <View style={{ ...styles.thread, alignSelf: 'center', marginBottom: 24 }} />
                                        <Text style={styles.orderDetailHeader}>Return Shipment</Text>
                                        <View style={styles.detailContainer}>
                                            <View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}>Return Id:</Text>
                                            </View>
                                            <View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}>{item.Id}</Text>
                                            </View>
                                            {/* {(item.ReturnShipmentBriefModel.TrackingNumber) && <><View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}>Tracking Number: </Text>
                                            </View>
                                                <View style={styles.detailBlock}>
                                                    <Text style={styles.detailTxt}>{item.ReturnShipmentBriefModel.TrackingNumber}</Text>
                                                </View></>}
                                            <View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}>Date Returned: </Text>
                                            </View>
                                            <View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}>{item.ReturnShipmentBriefModel.ReturnedDate ? FormatDate.formatDate(item.ReturnShipmentBriefModel.ReturnedDate, 'dd/mm/yyyy') : null}</Text>
                                            </View> */}

                                            <View style={styles.detailBlock}>
                                                <Text style={styles.detailTxt}></Text>
                                            </View>
                                            <View style={styles.detailBlock}>
                                                <TouchableOpacity
                                                    style={styles.btnViewDetail}
                                                    onPress={() => this.props.onProductClick(item)}
                                                >
                                                    <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>View Details</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {/* <View style={{ width: '100%', height: 0.5, backgroundColor: 'gray' }} />
                                            <TouchableOpacity
                                                style={{ ...styles.btnViewDetail, width: '100%', justifyContent: 'center', alignItems: 'center' }}
                                                onPress={() => this.props.onProductClick(item.ReturnShipmentBriefModel)}
                                            >
                                                <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold' }}>View Details</Text>
                                            </TouchableOpacity> */}

                                        </View>

                                    </View>

                                   // :

                                    //null
                            }
                        </View>
                    </TouchableOpacity>
                </>)
                )}

            </>
        );
    }
}
