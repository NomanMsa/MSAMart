
const initialState = {
    WishlistData: ''
}

const Wishlist = (state = initialState, action) => {
    // console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_WISHLIST_DATA') {
        return {
            WishlistData: action.paylod.WishlistData,
        }
    }

    return state
}
export default Wishlist