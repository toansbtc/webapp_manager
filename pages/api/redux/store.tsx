import { configureStore } from "@reduxjs/toolkit";
import fireBaseRedux from './reduxSlice'

const store = configureStore({
    reducer: fireBaseRedux
})

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export default store;