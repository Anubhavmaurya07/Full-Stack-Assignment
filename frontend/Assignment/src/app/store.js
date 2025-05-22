import {configureStore} from '@reduxjs/toolkit'
import authReduer from '../features/auth/authSlice.js'
import movieReducer from '../features/movies/movieSlice.js'


export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authReduer,
        movies: movieReducer,
    },
})