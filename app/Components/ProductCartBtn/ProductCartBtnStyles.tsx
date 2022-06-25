const React = require('react-native');
const { Dimensions, StyleSheet, PixelRatio } = React;
const { width, height } = Dimensions.get('window');
import { Colors } from "@theme";
var RESPONSIVE_FONT_LABEL   = 15;
var RESPONSIVE_TIMER_BOX   = '42%';


if (PixelRatio.get() <= 2) {
	RESPONSIVE_FONT_LABEL = 11;
	var RESPONSIVE_TIMER_BOX   = '40%';
}
module.exports = StyleSheet.create({
	cartBtn:{
		width:44,
		height:44,
		marginRight:10,
	},
})