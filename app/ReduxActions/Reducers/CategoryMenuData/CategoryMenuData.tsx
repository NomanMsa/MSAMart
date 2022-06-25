
const initialState = {
    MenuData: ''
}

const CategoryMenuData = (state = initialState, action) => {
    // console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_CATEGORY_DATA') {
        return {
            MenuData: action.paylod.MenuData,
        }
    }

    return state
}
export default CategoryMenuData