// export const CartCountChange = 'CART_COUNT_CHANGE';
// export const WishListCountChange = 'WISHLIST_COUNT_CHANGE';
const setCount = count => ({
    type: 'CART_COUNT_CHANGE',
    paylod: ({ cartCount: count.cartCount, wishListCount: count.wishListCount, })
})
const setPushNav = result => ({
    type: 'ON_PUSH_CLICK',
    paylod: (result)
})

const setHome = result => ({
    type: 'ADD_HOME_DATA',
    paylod: ({ HomeData: result })
})

const setWidget = result => ({
    type: 'ADD_WIDGET_DATA',
    paylod: ({ WidgetData: result })
})

const setWishlist = result => ({
    type: 'ADD_WISHLIST_DATA',
    paylod: ({ WishlistData: result })
})

const setShoppingCart = result => ({
    type: 'ADD_SHOPPING_DATA',
    paylod: ({ ShoppingCartData: result })
})

const setHelpModule = result => ({
    type: 'ADD_ALL_POLICY_STATIC_DATA',
    paylod: ({ DeliveryData: result.HelpTopic, PrivacyPolicyData: result.PrivacyPolicy, ReturnsData: result.ReturnPolicy, TermsAndConditionData: result.TermsAndConditions })
})

export { setCount, setHome, setWidget, setWishlist, setShoppingCart, setHelpModule, setPushNav };