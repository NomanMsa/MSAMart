
const initialState = {
    ShoppingCartData: ''
}

const ShoppingCart = (state = initialState, action) => {
    // console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_SHOPPING_DATA') {
        return {
            ShoppingCartData: action.paylod.ShoppingCartData,
        }
    }

    return state
}
export default ShoppingCart