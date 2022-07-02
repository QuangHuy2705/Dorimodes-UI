import { takeLatest, put, call } from 'redux-saga/effects';
import { Actions, Types } from '../reducers/category';
import categoryService from '../services/category'
import func from '../../utils/func'

function* getCategory() {
    try {
        const data = yield call(categoryService.getCategory)
        yield put(Actions.getCategorySuccess(data))
    } catch (error) {
        func.notificationAlert('error', 'Thông báo', 'Thao tác thất bại: ' + error.message)
    }
}

export default function* watchProduct() {
    yield takeLatest(Types.GET_CATEGORY_REQUEST, getCategory)
}