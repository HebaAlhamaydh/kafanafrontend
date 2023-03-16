import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import dealsSlice from './deals'
import usersSlice from './users'
import claimedDealSlice from './claimedDeals'

const store = configureStore({
    reducer:{
        authSlice:auth,
        dealsSlice,
        usersSlice,
        claimedDealSlice,
    }
})

export default store