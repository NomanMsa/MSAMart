
const initialState = {
    HomeData: ''
}

const HomeData = (state = initialState, action) => {
    // console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_HOME_DATA') {
        return {
            HomeData: action.paylod.HomeData,
        }
    }

    return state
}
export default HomeData