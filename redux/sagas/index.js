import { all } from 'redux-saga/effects'

import product from './product'
import category from './category'
import order from './order'

export default function* root() {
    yield all([
        product(),
        category(),
        order()
    ])
}
