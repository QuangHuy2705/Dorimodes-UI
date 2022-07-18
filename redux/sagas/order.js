import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, Types } from '../reducers/order';
import { Actions as ActionCart } from '../reducers/cart';
import orderService from '../services/order'
import func from '../../utils/func'

function* postOrder({ data }) {
    try {
        const result = yield call(orderService.order, data)
        yield put(Actions.postOrderSuccess(result.id))
        yield put(ActionCart.removeAllCart())
    } catch (error) {
        func.notificationAlert('error', 'Thông báo', 'Thao tác thất bại: ' + error.message)
        yield put(Actions.postOrderFailure(error))
    }
}

function* shipingCompany() {
    try {
        const data = yield call(orderService.shipingCompany)
        yield put(Actions.shipingCompanySuccess(data))
    } catch (error) {
        func.notificationAlert('error', 'Thông báo', 'Thao tác thất bại: ' + error.message)
        yield put(Actions.shipingCompanyFailure(error))
    }
}

export default function* watchProduct() {
    yield takeLatest(Types.POST_ORDER_REQUEST, postOrder)
    yield takeLatest(Types.SHIPING_COMPANY_REQUEST, shipingCompany)
}