import { combineReducers } from 'redux'
import productReducer from './product'
import categoryReducer from './category'

//Wiki module

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer
})

export default rootReducer
