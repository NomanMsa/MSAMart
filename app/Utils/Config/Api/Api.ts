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
  // Widget:Constants.BASE_URL + 'widget/configuration',
  //removeWishlistItem:Constants.BASE_URL + 'shoppingcart/wishlist/remove?productId=',

  /////ProductDetail API List/////////////////////
  ProductDetail: Constants.BASEs_URL + 'product/productdetails',
  UpdateAttributeAPI:
    Constants.BASEs_URL + '/ShoppingCart/ProductDetails_AttributeChange',
  // notifyMeAPI: Constants.BASE_URL + 'subscription/backinstock?productId=',
  notifyMeAPI: Constants.BASEs_URL + 'backinstocksubscription/subscribepopup?productId=',
  notifyMeSubscriptionAPI:
  Constants.BASEs_URL + 'backinstocksubscription/subscribepopup?productId=',

    //Constants.BASE_URL + 'subscription/backinstocksend?productId=',

  /////AddToCart API List/////////////////////
  AddToCart: Constants.BASEs_URL + 'shoppingcart/addproducttocart_details',

  /////Shopping page API List/////////////////////
  getShoppingCartList: Constants.BASEs_URL + 'shoppingcart/cart',
  UpdateShoppingCartList: Constants.BASEs_URL + 'shoppingcart/updatecart',
  // AddToWishListAPI: Constants.BASE_URL + 'shoppingcart/item/addtowishlist',
  ApplyCoupens:Constants.BASEs_URL +'shoppingcart/applydiscountcoupon?discountcouponcode=',


  ApplyCoupen:
    Constants.BASEs_URL +
    'shoppingcart/applydiscountcoupon?discountcouponcode=', //shoppingcart/applydiscountgiftcouponcode
  CancelCoupen: Constants.BASEs_URL + 'shoppingcart/removediscountcoupon?discountId=', 
  CancelGiftCard:
    Constants.BASEs_URL + 'shoppingcart/removegiftcardcode?giftCardId=',

  /////CategoryProduct API List/////////////////////
  CategoryProduct: Constants.BASE_URL + 'categories/getcategory/',

  /////Search API List/////////////////////
  Search: Constants.BASEs_URL + 'Catalog/SearchTermAutoComplete?term=',

  /////AddToWishlist API List/////////////////////
  // AddToWishlist: Constants.BASE_URL + 'shoppingcart/widgetproduct/addtocart',

  ////////////// wish list page/////////////////
  getWishlist: Constants.BASEs_URL + 'shoppingcart/wishlist',
  getuserWishlist: Constants.BASEs_URL + 'shoppingcart/wishlist',

  UpdateButtonWishlist: Constants.BASEs_URL + 'shoppingcart/updatewishlist',
  //addCartButtonWishlist: Constants.BASE_URL + 'shoppingcart/wishlist/addtocart',

  ///////User Address list on checkout page///////////
  UserAddressList: Constants.BASEs_URL + 'checkout/onepagecheckout',

  ///////User Address list on account addresses page///////////
  UsersAddress: Constants.BASEs_URL + 'customer/addresses',

  ///////User Address delete on checkout page///////////
  UserAddressDelete: Constants.BASEs_URL + 'customer/addressdelete',

  ////////// get shopping count /////////////////
  getShoppingCount: Constants.BASEs_URL + 'FlyoutShoppingCart/Invoke',
  

  //https://dmtest.dpworld.com/api/v1/shoppingcart/getcountcart

  ////////// widget product add wishlist  /////////////////
  widgetProductAddWishlist:Constants.BASEs_URL +'shoppingcart/addproducttocart_catalog',

  //////////Users Address APIs//////////////////////////
  getAddressById: Constants.BASEs_URL + 'customer/addressedit', 
  getCountryList: Constants.BASEs_URL + 'customer/addressadd',
  getStateByCountryId: Constants.BASEs_URL + 'country/GetStatesByCountryId',
  //getCityByStateId: Constants.BASE_URL + 'country/getcitybystateid',
  //getAreaByCityId: Constants.BASE_URL + 'country/getaddressareabycityid',

  setDefaultAddress: Constants.BASE_URL + 'customers/address/default',
  editAddress: Constants.BASEs_URL + 'customer/addressedit',
  defaultAddress: Constants.BASE_URL + 'customers/address/default',

  addAddress: Constants.BASEs_URL + 'customer/addressadd',
  //https://dmtest.dpworld.com/api/v1/customers/address/default?id=5236
  //////////////FilterPage API List/////////////////////////

  filterMenuAPI: Constants.BASE_URL + 'catalogsfilters/products',
  vendorFilterAPI: Constants.BASEs_URL + 'catalog/vendor',
  ManufacturerFilterAPI:
    Constants.BASE_URL + 'catalog/getproductsbymanufacturer',
  orderCompleted: Constants.BASE_URL + 'checkout/product/ordercompleted',

  orderHistory: Constants.BASEs_URL + 'order/customerorders',
  orderDetails: Constants.BASEs_URL + 'order/details',
 

  ordreTotal: Constants.BASEs_URL + 'ordertotals/invoke',

  CancelReasonCall: Constants.BASE_URL + 'orders/CancelOrder',
  SubmitCancelReqest: Constants.BASE_URL + 'orders/CancelOrder',

  InvoiceAPI: Constants.BASEs_URL + 'order/getpdfinvoice?orderId=',
  externalSearchAPI: Constants.BASEs_URL + 'Catalog/Search',

  ////////////////////// Help Center ///////////////////////////////
  userInfo: Constants.BASEs_URL + 'customer/info',
  
  contactUs: Constants.BASEs_URL +'common/contactussend',
  DelivryAPI: Constants.BASEs_URL + 'topic/gethelpcentercontaxt',
  // PrivacyPolicyAPI: Constants.BASE_URL + 'topics/getprivacypolicy',
  PrivacyPolicyAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  TermsAndConditionAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  returnPolicyAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',
  HelpCenterAllInOneAPI: Constants.BASEs_URL + 'topic/topicdetailspopup',

  /////////////////////// Email a friend //////////////////////////
  userEmailDetailAPI: Constants.BASE_URL + 'shoppingcart/wishlist/email',
  sendEmailAPI: Constants.BASE_URL + 'shoppingcart/wishlist/sendemail',

  reOrder: Constants.BASEs_URL + 'order/reorder',
  cancelOrder: Constants.BASE_URL + 'orders/cancel',
  // shipmentDetails: Constants.BASE_URL + 'orders/shipment',
  shipmentDetails: Constants.BASEs_URL + 'order/shipmentdetails',

  ////////////////////// Help Menu ////////////////////
  helpData: Constants.BASEs_URL + 'topic/gethelpcentercontaxt',

  ////////////////////// Regenerate Session ////////////////////
  getSession: Constants.BASE_URL + 'users/getsession',

  DiscountBanner: Constants.BASE_URL + 'discounts/banner',
  GetPage: Constants.BASE_URL + 'general/getpage',
  sendFCMToken: Constants.BASE_URL + 'notification/downloadnotification',

  returnReqDetails: Constants.BASEs_URL + 'returnrequest/returnrequest',
  uploadReturnFile: Constants.BASEs_URL + 'returnreqest/uploadfilereturnreqest',
  submitReturnDetails: Constants.BASEs_URL + 'ReturnRequest/ReturnRequest',
  ////////////////////// Returned Order ////////////////////
  ReturnedRequestHistory: Constants.BASEs_URL + 'ReturnRequest/CustomerReturnRequests',
  ShipmentDetails:
    Constants.BASE_URL + 'orders/returnshipmentdetails?returnShipmentId=',
  // UserActivation: Constants.BASE_URL + 'customers/activateaccount?',
  UserActivation: Constants.BASEs_URL + 'customer/accountactivation?',
  SocialActivation: Constants.BASE_URL + 'authentication/external/socialmediaauth',
  GetDiscountTextByCountry: Constants.BASEs_URL + 'footer/getfooter',

  //############################## OMAN/KSA ##############################################
  FetchServiceableCountry: Constants.BASE_URL + 'country/fetchserviceablecountry',
  SetShipToCountry: Constants.BASE_URL + 'country/setshiptocountry',


  CheckAppleUser: Constants.BASE_URL + 'authentication/external/GetCustomerInfoByToken',
  ///////////////////// APNs To FCM ////////////////////////
  ReturnFCMToken: 'https://iid.googleapis.com/iid/v1:batchImport',

  ///////////////API TO GUEST USER  ///////////
  GuestUser: Constants.BASE_URL + 'orders/ManageOrderDetail',
  Categories: Constants.BASEs_URL + 'Header/GetTopMenu',

};

export default Api;
