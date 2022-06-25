import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import ShoppingCartCount from '../Reducers/ShoppingCartCount/ShoppingCartCount';
import PushData from '../Reducers/PushUrl/PushData';
import FilterParameter from '../Reducers/FilterParameter/FilterParameter';
import FilterData from '../Reducers/FilterData/FilterData';
import CategoryMenuData from '../Reducers/CategoryMenuData/CategoryMenuData'
import LoginStatus from '../Reducers/LoginStatus/LoginStatus'
import PolicyStaticData from '../Reducers/PolicyStaticData/PolicyStaticData'
import HomeData from '../Reducers/HomeData/HomeData'
import Widget from '../Reducers/Widget/Widget'
import ShoppingCart from '../Reducers/ShoppingCart/ShoppingCart';
import Wishlist from '../Reducers/Wishlist/Wishlist';


import RootSaga from '../Sagas/index'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    Count: ShoppingCartCount,
    PushNavData: PushData,
    Parameter: FilterParameter,
    Filter_Data: FilterData,
    Menu_Data: CategoryMenuData,
    Login_Status: LoginStatus,
    Policy_Data: PolicyStaticData,
    Home_Data: HomeData,
    Widget_Data: Widget,
    ShoppingCart_Data: ShoppingCart,
    Wishlist_Data: Wishlist,

})
export default store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(RootSaga)
store.dispatch({ type: 'COUNT_CALL' })
//store.dispatch({ type: 'HOME_CALL' })
//store.dispatch({ type: 'WIDGET_CALL' })
store.dispatch({ type: 'WISHLIST_CALL' })
store.dispatch({ type: 'SHOPPING_CALL' })
store.dispatch({ type: 'HELPMODUL_CALL' })




