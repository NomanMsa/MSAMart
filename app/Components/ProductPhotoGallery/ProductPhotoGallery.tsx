import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import GallerySwiper from '../GallerySwiper/GallerySwiper';
import { Images, Loaders, Icons } from '@assets';
import { ThemeConfig } from '@theme';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
const window = Dimensions.get('window');
const styles = require('./ProductPhotoGalleryStyles');
export default class ProductPhotoGallery extends Component {
  static defaultProps = {
    onSlideClick: () => { },
    slideInterval: 9000,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      showViewer: true,
      showIndex: 0,
      dialog: null,
    };
  }
  render() {
    return (
      <View style={styles.contanierView}>
        <GallerySwiper
          index={this.state.showIndex}
          style={styles.wrapper}
          loop={true}
          autoplay={false}
          showPageBtn={false}
          showsButtons={false}
          containerStyle={{ marginTop: 0 }}
          bounces={true}
          pagingEnabled={true}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          dot={<View style={styles.dotStyle} />}
          activeDot={<View style={styles.activeDotStyle} />}
          paginationStyle={styles.paginationStyle}
          thumbnails={this.props.data}>
          {this.props.data.map((item, i) => (
            <View key={i} style={styles.slide}>
              <TouchableOpacity
                activeOpacity={ThemeConfig.activeOpacityHigh}
                style={styles.slideImgCont}
                onPress={() => this.setState({ dialog: i })}>
                <Image
                  style={styles.slideImg}
                  source={{ uri: item.FullSizeImageUrl }}
                  loadingIndicatorSource={Loaders.imageLoader}

                ></Image>
              </TouchableOpacity>
            </View>
          ))}
        </GallerySwiper>

        {this.props.children}
        <Modal
          visible={this.state.dialog !== null}
          animated
          transparent={true}
          onRequestClose={() => {
          }}

        >
          <View
            style={styles.modalBackdrop}>
            <TouchableOpacity onPress={() => this.setState({ dialog: null })}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "800",
                  alignSelf: 'flex-end',
                }}
                testID="closeImage"
                accessibilityLabel="closeImage"
              >
                close
              </Text>
            </TouchableOpacity>
            <View style={{ borderRadius: 20, padding: 20, }}>

              <ReactNativeZoomableView
                maxZoom={2}
                minZoom={0.5}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
                captureEvent={true}
                style={{
                  padding: 10,
                  backgroundColor: 'transperent',
                }}>
                <View style={styles.zoomImageContainer}>
                  <TouchableOpacity onPress={() => this.setState({ dialog: null })} >
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        margin: 15,
                        alignSelf: 'flex-end',
                        transform: [{ rotate: '50deg' }],
                      }}
                      source={Icons.plus}
                      testID="closeImage"
                      accessibilityLabel="closeImage"
                    />
                  </TouchableOpacity>
                  <View style={styles.zoomContainer}>

                    <Image
                      source={
                        this.state.dialog !== null
                          ? { uri: this.props.data[this.state.dialog].FullSizeImageUrl }
                          : null
                      }
                      loadingIndicatorSource={Loaders.imageLoader}
                      style={styles.zoomImage}
                      testID="enlargedImage"
                      accessibilityLabel="enlargedImage"
                    ></Image>

                  </View>
                </View>
              </ReactNativeZoomableView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
