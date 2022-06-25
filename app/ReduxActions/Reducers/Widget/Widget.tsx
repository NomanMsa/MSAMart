
const initialState = {
    WidgetData: ''
}

const Widget = (state = initialState, action) => {
    // console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_WIDGET_DATA') {
        return {
            WidgetData: action.paylod.WidgetData,
        }
    }

    return state
}
export default Widget