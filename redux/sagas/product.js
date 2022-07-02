import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, Types } from '../reducers/product';
import productService from '../services/product'
import func from '../../utils/func'

function* getProduct() {
    try {
        const data = yield call(productService.getProduct)
        yield put(Actions.getProductSuccess(data))
    } catch (error) {
        func.notificationAlert('error', 'Thông báo', 'Thao tác thất bại: ' + error.message)
    }
}

function* getProductWithFilter({ filters }) {
    try {
        console.log(filters, " fànn")
        const data = yield call(productService.getProductWithFilter, filters)
        yield put(Actions.getProductFiltersSuccess(data))
    } catch (error) {
        func.notificationAlert('error', 'Thông báo', 'Thao tác thất bại: ' + error.message)
    }
}

export default function* watchProduct() {
    yield takeLatest(Types.GET_PRODUCT_REQUEST, getProduct)
    yield takeLatest(Types.GET_PRODUCT_FILTERS_REQUEST, getProductWithFilter)
}