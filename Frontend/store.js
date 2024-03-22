import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './src/slices/AuthSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
  },
})

