const initialState = '';

const PushData = (state = initialState, action) => {

    if (action.type === 'ON_PUSH_CLICK') {
        return action.paylod.navUrl
    }
    return state
}
export default PushData