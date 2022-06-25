
const initialState = {
    DeliveryData: '',
    PrivacyPolicyData: '',
    ReturnsData: '',
    TermsAndConditionData: '',
}

const PolicyStaticData = (state = initialState, action) => {
    //console.log("CategoryMenuData...........", action);

    if (action.type === 'ADD_ALL_POLICY_STATIC_DATA') {
        return {
            DeliveryData: action.paylod.DeliveryData,
            PrivacyPolicyData: action.paylod.PrivacyPolicyData,
            ReturnsData: action.paylod.ReturnsData,
            TermsAndConditionData: action.paylod.TermsAndConditionData,
        }
    }

    return state
}
export default PolicyStaticData