


const initialState = {
    loginStatus: 'false',
}

const LoginStatus = (state = initialState, action) => {
    console.log("LoginStatus.............", action)

    if (action.type === 'AUTH_STATUS') {
        return {
            loginStatus: action.paylod.loginStatus,
        }
    }
    return state
}
export default LoginStatus