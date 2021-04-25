import { combineReducers } from "redux";
import authReducer from './auth'
import productsReducer from './products'
import cartReducer from './cart'
import historiesReducer from './histories'

const rootReducer = combineReducers({
    authReducer, productsReducer, cartReducer, historiesReducer
})

export default rootReducer