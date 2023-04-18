import {configureStore} from '@reduxjs/toolkit'
//importar los reducers
import userReducer from '../app/reducers/user/userSlice';
import cartReducer from '../app/reducers/cart/cartSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer
    }
})