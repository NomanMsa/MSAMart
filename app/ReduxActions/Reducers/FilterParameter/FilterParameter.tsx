
const initialState = {

    minPrize: 0,
    maxPrize: 0,

}

const FilterParameter = (state = initialState, action) => {
    console.log("updates*********************", action)

    if (action.type === 'UPDATE_PRICE_PARAMETER') {
        return {

            minPrize: Number(action.paylod.minPrize),
            maxPrize: Number(action.paylod.maxPrize),
        }
    }

    if (action.type === 'CLEAR_PRICE_PARAMETER') {
        return {
            minPrize: 0,
            maxPrize: 0,
        }
    }
    return state
}
export default FilterParameter