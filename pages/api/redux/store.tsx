import { configureStore } from "@reduxjs/toolkit";
import fireBaseRedux from './reduxSlice'
import homeDataSlice from "./homeDataSlice";
import openClose_logginSlice from "./openClose_logginSlice";

const store = configureStore({
    reducer: {
        fireBaseRedux,
        homedata: homeDataSlice,
        controlLogin: openClose_logginSlice
    }
})

export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
export default store;
// export default function main(){};