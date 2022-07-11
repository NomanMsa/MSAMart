import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'
import { getCartCountData, getHomeDataCountData, getWidgitData, getWishlistData, getShoppingCartData, getHelpCenterData } from '../API'
import { setCount, setHome, setWidget, setWishlist, setShoppingCart, setHelpModule } from '../Actions';

function* HandleCount() {
    const currentCount = state => state.Count;
    const cCount = yield select(currentCount);
    console.log('Hello Sagas!---------- worker', cCount)

    const updatedCount = yield call(getCartCountData)
    // const updatedCountResult = yield call(onSuccessGetCountCall)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY...", updatedCount)
    yield put(setCount(updatedCount));

}

function* HandleHome() {

    const updatedHome = yield call(getHomeDataCountData)
    // const updatedCountResult = yield call(onSuccessGetCountCall)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY...HandleHome", updatedHome)
    yield put(setHome(updatedHome));

}

function* HandleWidget() {

    const updatedWidget = yield call(getWidgitData)
    // const updatedCountResult = yield call(onSuccessGetCountCall)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY......HandleWidget..", updatedWidget)
    yield put(setWidget(updatedWidget));
}

function* HandleWishlist() {

    const updatedWishlist = yield call(getWishlistData)
    // const updatedCountResult = yield call(onSuccessGetCountCall)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY......HandleWishlist..", updatedWishlist)
    yield put(setWishlist(updatedWishlist));
}

function* HandleShoppingCart() {

    const updatedShoppingCart = yield call(getShoppingCartData)
    // const updatedCountResult = yield call(onSuccessGetCountCall)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY......HandleShoppingCart..", updatedShoppingCart)
    yield put(setShoppingCart(updatedShoppingCart));
}


function* HandleHelpCenter() {

    const updatedHelpCenterData = yield call(getHelpCenterData)
    console.log("API CALL DATA RECEIVED SUCCESSFULLY......HandleHelpCenter..", updatedHelpCenterData)
    if (updatedHelpCenterData.errorlist.length == 0) {

        yield put(setHelpModule(updatedHelpCenterData.model));

    }
}

// watcher saga
function* RootSaga() {
    //yield takeEvery('COUNT_CALL', HandleCount)
    // yield takeEvery('HOME_CALL', HandleHome)
    // yield takeEvery('WIDGET_CALL', HandleWidget)
   // yield takeEvery('WISHLIST_CALL', HandleWishlist)
    //yield takeEvery('SHOPPING_CALL', HandleShoppingCart)
    // yield takeEvery('HELPMODUL_CALL', HandleHelpCenter)

}

// watcher saga -> actions -> worker saga

export default RootSaga;