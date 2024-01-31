import {configureStore} from '@reduxjs/toolkit';

import adminReducer from './Redux/adminSlice'
import { adminApiSlice } from './Redux/adminapiSlice'


const store =configureStore({
    reducer:{
        auth:adminReducer,
        [adminApiSlice.reducerPath]:adminApiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(adminApiSlice.middleware),
    devTools:true
});

export default store