const initialState = {
    shoppingCartCount: 0,
    wishlistCount: 0,
}

const ShoppingCartCount = (state = initialState, action) => {

    if (action.type === 'CART_COUNT_CHANGE') {
        return {
            shoppingCartCount: Number(action.paylod.cartCount),
            wishlistCount: Number(action.paylod.wishListCount),
        }
    }
    return state
}
export default ShoppingCartCount