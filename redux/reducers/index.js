import { combineReducers } from 'redux'
import productReducer from './product'
import categoryReducer from './category'
import cartReducer from './cart'
import orderReducer from './order'

//Wiki module

const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer
})

export default rootReducer
