import { combineReducers } from 'redux'
import productReducer from './product'
import categoryReducer from './category'
import cartReducer from './cart'

//Wiki module

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer
})

export default rootReducer
