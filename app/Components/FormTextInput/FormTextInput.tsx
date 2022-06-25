import * as React from 'react';
import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '@theme';

type Props = TextInputProps & {
  error?: string;
  guide?: string;
};

interface State {
  isFocused: boolean;
}

class FormTextInput extends React.Component<Props, State> {
  static defaultProps = {
    leftIconClick: () => { },
    leftIcon: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      icEye: 'visibility-off', // default icon to show that password is currently hidden
      password: '', // actual value of password entered by the user
      showPassword: true, // boolean to show/hide the password
    };
    this.renderInput = this.renderInput.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderGuide = this.renderGuide.bind(this);
  }
  textInputRef = React.createRef<TextInput>();

  readonly state: State = {
    isFocused: false,
  };

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };
  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };
  renderInput = () => {
    const {
      error,
      guide,
      onFocus,
      onBlur,
      style,
      placeholderTextColor,
      inputStyle,
      ...otherProps
    } = this.props;
    const { isFocused } = this.state;
    return (
      <>
        <TextInput
          ref={this.textInputRef}
          selectionColor={Colors.LIGHT_GRAY_TEXT}
          style={[styles.textInput, inputStyle]}
          isEditable={this.props.isEnabled}
          placeholderTextColor={placeholderTextColor}
          testID={this.props.testId}
          accessibilityLabel={this.props.testId}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          {...otherProps}
        />
        {this.props.leftComponent}
        {this.props.leftIcon && <TouchableOpacity style={[styles.icoContainer]} onPress={() => this.props.leftIconClick()}>
          <Image source={this.props.leftIconImg} style={[styles.leftIcoStyle, this.props.leftIcoStyle]} />
        </TouchableOpacity>}
      </>
    );

  }
  renderError = () => {
    return (
      <>
        {this.props.error && <Text style={[styles.errorText, { fontsize: 8 }]}
          testID={this.props.error_testId}
          accessibilityLabel={this.props.error_testId}

        >{this.props.error || ''}</Text>}
      </>
    );

  }
  renderGuide = () => {
    return (
      <>
        {this.props.guide && <Text style={styles.guideText}>{this.props.guide || ''}</Text>}
      </>
    );

  }
  render() {
    const {
      error,
      onFocus,
      onBlur,
      style,
      placeholderTextColor,
      inputStyle,
      withBorder,
      ...otherProps
    } = this.props;
    const { isFocused } = this.state;
    let ContainerStyles = styles.container;
    if (withBorder) { ContainerStyles = styles.withBorderCont }
    return (
      <>
        {(this.props.title && this.props.title != '') && <Text style={[styles.title, this.props.titleStyles]}>{this.props.title}{this.props.mandatory && <Text style={styles.mandatoryField}> *</Text>}</Text>}
        {this.renderGuide()}
        <View style={[ContainerStyles, style]}>
          {this.renderInput()}
        </View>
        {this.renderError()}
      </>
    );
  }
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  mandatoryField: {
    color: Colors.PRIMARY,
  },
  withBorderCont: {
    borderWidth: 1,
    borderColor: Colors.BLACK,
    borderRadius: 30,
    flexDirection: 'row',
    marginTop: 10,
  },
  title: {
    margin: 20,
    marginTop: 10,
    marginBottom: -5,
    fontSize: 14,
    color: Colors.GRAY_TEXT,
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdana',
      },
    }),
  },
  textInput: {
    flex: 5,
    color: Colors.DARK_GRAY_TEXT,
    ...Platform.select({
      ios: {
        fontWeight: '400',
        fontFamily: 'verdana',
      },
      android: {
        fontWeight: 'normal',
        fontFamily: 'verdana',
      },
    }),
    fontSize: 14,
    ...Platform.select({
      ios: {
        padding: 16,
      },
      android: {
        paddingLeft: 6,
      },
    }),
  },
  errorText: {
    //marginTop: 8,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    color: Colors.PRIMARY,
    ...Platform.select({
      android: {
        paddingLeft: 6,
      },
    }),
  },
  guideText: {
    //marginTop: 8,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    color: Colors.PRIMARY,
    ...Platform.select({
      android: {
        paddingLeft: 6,
      },
    }),
  },
  icon: {
    position: 'absolute',
    top: 33,
    right: 0,
  },
  icoContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    //backgroundColor:Colors.BLACK,
  },
  leftIcoStyle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    alignSelf: 'center',
    tintColor: Colors.GRAY_TEXT,
  },
});

export default FormTextInput;
