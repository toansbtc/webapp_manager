import { configureStore } from "@reduxjs/toolkit";
import fireBaseRedux from './reduxSlice'
import homeDataSlice from "./homeDataSlice";

const store = configureStore({
    reducer: {
        fireBaseRedux,
        homedata: homeDataSlice
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export default store;
// export default function main(){};