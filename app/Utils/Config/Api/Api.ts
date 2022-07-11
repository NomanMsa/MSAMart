import { Platform } from 'react-native';
import Constants from '../Constants/Constants';

const Api = {
  /////Login API List/////////////////////
 
  Login: Constants.BASEs_URL + 'ManageUserAccess/login',
  ForgotPassword: Constants.BASEs_URL + 'customer/passwordrecovery',
  PasswordRecoveryUserValidation: Constants.BASEs_URL + 'customer/PasswordRecoveryConfirm?',
  SubmitRecoveredPassword: Constants.BASEs_URL + 'customer/PasswordRecoveryConfirm?',//SubmitRecoveredPassword
  /////Logout API List/////////////////////
  Logout: Constants.BASEs_URL + 'customer/logout',

  ////Registration API ////////////////////
  Register: Constants.BASEs_URL + 'customer/register',

  /////Home API List/////////////////////
  Home: Constants.BASEs_URL + 'home/homepage',
  Widgets: Constants.BASEs_URL + 'homepageproducts/invoke',
  
  removeWishlistItem:Constants.BASEs_URL + 'shoppingcart/wishlist/remove?productId=',

  /////ProductDetail API List/////////////////////
  ProductDetail: Constants.BASEs_URL + 'product/productdetails',
  UpdateAttributeAPI:
    Constants.BASEs_URL + '/ShoppingCart/ProductDetails_AttributeChange',
  notifyMeAPI: Constants.BASEs_URL + 'backinstocksubscription/subscribepopup?productId=',
  notifyMeSubscriptionAPI:
  Constants.BASEs_URL + 'backinstocksubscription/subscribepopup?productId=',

  

  /////AddToCart API List/////////////////////
  AddToCart: Constants.BASEs_URL + 'shoppingcart/addproducttocart_details',

  /////Shopping page API List/////////////////////
  getShoppingCartList: Constants.BASEs_URL + 'shoppingcart/cart',
  UpdateShoppingCartList: Constants.BASEs_URL + 'shoppingcart/updatecart',
  ApplyCoupens:Constants.BASEs_URL +'shoppingcart/applydiscountcoupon?discountcouponcode=',


  ApplyCoupen:
    Constants.BASEs_URL +
    'shoppingcart/applydiscountcoupon?discountcouponcode=', //shoppingcart/applydiscountgiftcouponcode
  CancelCoupen: Constants.BASEs_URL + 'shoppingcart/removediscountcoupon?discountId=', 
  CancelGiftCard:
    Constants.BASEs_URL + 'shoppingcart/removegiftcardcode?giftCardId=',

  /////CategoryProduct API List/////////////////////
  CategoryProduct: Constants.BASEs_URL + 'catalog/category',

  /////Search API List/////////////////////
  Search: Constants.BASEs_URL + 'Catalog/SearchTermAutoComplete?term=',

  /////AddToWishlist API List/////////////////////
 

  ////////////// wish list page/////////////////
  getWishlist: Constants.BASEs_URL + 'shoppingcart/wishlist',
  getuserWishlist: Constants.BASEs_URL + 'shoppingcart/wishlist',

  UpdateButtonWishlist: Constants.BASEs_URL + 'shoppingcart/updatewishlist',


  ///////User Address list on checkout page///////////
  UserAddressList: Constants.BASEs_URL + 'checkout/onepagecheckout',

  ///////User Address list on account addresses page///////////
  UsersAddress: Constants.BASEs_URL + 'customer/addresses',

  ///////User Address delete on checkout page///////////
  UserAddressDelete: Constants.BASEs_URL + 'customer/addressdelete',

  ////////// get shopping count /////////////////
  getShoppingCount: Constants.BASEs_URL + 'FlyoutShoppingCart/Invoke',
  
  

  ////////// widget product add wishlist  /////////////////
  widgetProductAddWishlist:Constants.BASEs_URL +'shoppingcart/addproducttocart_catalog',

  //////////Users Address APIs//////////////////////////
  getAddressById: Constants.BASEs_URL + 'customer/addressedit', 
  getCountryList: Constants.BASEs_URL + 'customer/addressadd',
  getStateByCountryId: Constants.BASEs_URL + 'country/GetStatesByCountryId',
 
  setDefaultAddress: Constants.BASEs_URL + 'customer/address/default',
  editAddress: Constants.BASEs_URL + 'customer/addressedit',
  defaultAddress: Constants.BASEs_URL + 'customer/address/default',

  addAddress: Constants.BASEs_URL + 'customer/addressadd',
  //https://dmtest.dpworld.com/api/v1/customers/address/default?id=5236
  //////////////FilterPage API List/////////////////////////

  filterMenuAPI: Constants.BASEs_URL + 'catalogsfilters/products',
  vendorFilterAPI: Constants.BASEs_URL + 'catalog/vendor',
  ManufacturerFilterAPI:
    Constants.BASEs_URL + 'catalog/manufacturer',//getproductsby
  orderCompleted: Constants.BASEs_URL + 'checkout/completed',

  orderHistory: Constants.BASEs_URL + 'order/customerorders',
  orderDetails: Constants.BASEs_URL + 'order/details',
 

  ordreTotal: Constants.BASEs_URL + 'ordertotals/invoke',

  CancelReasonCall: Constants.BASEs_URL + 'orders/CancelOrder',
  SubmitCancelReqest: Constants.BASEs_URL + 'orders/CancelOrder',

  InvoiceAPI: Constants.BASEs_URL + 'order/getpdfinvoice?orderId=',
  externalSearchAPI: Constants.BASEs_URL + 'Catalog/Search',

  ////////////////////// Help Center ///////////////////////////////
  userInfo: Constants.BASEs_URL + 'customer/info',
  
  contactUs: Constants.BASEs_URL +'common/contactussend',
  DelivryAPI: Constants.BASEs_URL + 'topic/gethelpcentercontaxt',

  PrivacyPolicyAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  TermsAndConditionAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  returnPolicyAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  HelpCenterAllInOneAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',

  /////////////////////// Email a friend //////////////////////////
  userEmailDetailAPI: Constants.BASEs_URL + 'shoppingcart/emailwishlist',
  sendEmailAPI: Constants.BASEs_URL + 'shoppingcart/emailwishlistsend',

  reOrder: Constants.BASEs_URL + 'order/reorder',
  cancelOrder: Constants.BASEs_URL + 'orders/cancel',

  shipmentDetails: Constants.BASEs_URL + 'order/shipmentdetails',

  ////////////////////// Help Menu ////////////////////
  helpData: Constants.BASEs_URL + 'topic/gethelpcentercontaxt',

  ////////////////////// Regenerate Session ////////////////////
  getSession: Constants.BASEs_URL + 'ManageUserAccess/getsession',

  DiscountBanner: Constants.BASEs_URL + 'discounts/banner',
  GetPage: Constants.BASEs_URL + 'general/getpage',
  sendFCMToken: Constants.BASEs_URL + 'notification/downloadnotification',

  returnReqDetails: Constants.BASEs_URL + 'returnrequest/returnrequest',
  uploadReturnFile: Constants.BASEs_URL + 'returnreqest/uploadfilereturnreqest',
  submitReturnDetails: Constants.BASEs_URL + 'ReturnRequest/ReturnRequest',
  ////////////////////// Returned Order ////////////////////
  ReturnedRequestHistory: Constants.BASEs_URL + 'ReturnRequest/CustomerReturnRequests',
  ShipmentDetails:
    Constants.BASEs_URL + 'orders/returnshipmentdetails?returnShipmentId=',
    
  UserActivation: Constants.BASEs_URL + 'customer/accountactivation?',
  SocialActivation: Constants.BASEs_URL + 'authentication/external/socialmediaauth',
  GetDiscountTextByCountry: Constants.BASEs_URL + 'footer/getfooter',

  //############################## OMAN/KSA ##############################################
  FetchServiceableCountry: Constants.BASEs_URL + 'country/fetchserviceablecountry',
  SetShipToCountry: Constants.BASEs_URL + 'country/setshiptocountry',


  CheckAppleUser: Constants.BASEs_URL + 'authentication/external/GetCustomerInfoByToken',
  ///////////////////// APNs To FCM ////////////////////////
  ReturnFCMToken: 'https://iid.googleapis.com/iid/v1:batchImport',

  ///////////////API TO GUEST USER  ///////////
  GuestUser: Constants.BASEs_URL + 'orders/ManageOrderDetail',
  Categories: Constants.BASEs_URL + 'Header/GetTopMenu',

};

export default Api;


///commented dm api//////
     //getCityByStateId: Constants.BASE_URL + 'country/getcitybystateid',
  //getAreaByCityId: Constants.BASE_URL + 'country/getaddressareabycityid',
   //Constants.BASE_URL + 'subscription/backinstocksend?productId=',
      // Widget:Constants.BASE_URL + 'widget/configuration',
  // notifyMeAPI: Constants.BASE_URL + 'subscription/backinstock?productId=',
  // AddToWishListAPI: Constants.BASE_URL + 'shoppingcart/item/addtowishlist',
  // AddToWishlist: Constants.BASE_URL + 'shoppingcart/widgetproduct/addtocart',
  //addCartButtonWishlist: Constants.BASE_URL + 'shoppingcart/wishlist/addtocart',
  //https://dmtest.dpworld.com/api/v1/shoppingcart/getcountcart
  // PrivacyPolicyAPI: Constants.BASE_URL + 'topics/getprivacypolicy',
  // shipmentDetails: Constants.BASE_URL + 'orders/shipment',
  // UserActivation: Constants.BASE_URL + 'customers/activateaccount?',