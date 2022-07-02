import { all } from 'redux-saga/effects'

import product from './product'
import category from './category'

export default function* root() {
    yield all([
        product(),
        category()
    ])
}
