import {configureStore} from '@reduxjs/toolkit'
import user from './userSlice'
import general from './generalSlice'
export  default configureStore({
    reducer:{
        user:user,
        general:general
    }
})
