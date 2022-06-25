import { StyleSheet } from 'react-native';
import { Dimensions,} from 'react-native';

const absoluteStretch = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({

  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 40,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
	  height:SCREEN_HEIGHT,
	  width:SCREEN_WIDTH,
	  backgroundColor: "rgba(256, 256, 256, 0.38)",
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'bold',
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular',
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsibleList:{
	marginLeft:4,
	marginRight:4,
	marginTop:2,
	marginBottom:2,
	borderBottomWidth:1,
	borderTopWidth:1 ,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
    //marginLeft: 5,
    //marginRight: 5,
    //marginTop: 10, 
  },
  collapsibleHeader:{
	flexDirection:'row',
    //color: 'white',
	alignItems:'center',padding:20,
	fontSize:20,
	backgroundColor:"rgba(38, 166, 154, 1)",
  },
  userBackdrop:{
	marginLeft:4,
	marginRight:4,
	backgroundColor:'#FFFFFF',
	marginTop:20,
	borderBottomWidth:1,
	borderTopWidth:1 ,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
  },
  
  questionnairesBackdrop:{
	marginLeft:4,
	marginRight:4,
	backgroundColor:'#e0f2f1',
	marginTop:20,
	marginBottom:40,
	borderBottomWidth:1,
	borderTopWidth:1 ,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
  },
});