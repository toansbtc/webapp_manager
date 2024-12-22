import { useEffect, useState } from "react";
import { auth, user } from "../../api/config/fireBase";
import { signOut } from "firebase/auth";
export const key_user = 'user';
export function setItemSession(key: string, value, expired: number = 1800) {

    const date = new Date();
    const expiredTime = date.getTime() + expired * 1000;
    const item = {
        expired: expiredTime,
        value: value
    }
    sessionStorage.setItem(key, JSON.stringify(item));

}

export function getItemSession() {

    const session = sessionStorage.getItem(user);
    // console.log(session)
    let timeExpired = 0;
    if (session != null) {
        const data = JSON.parse(session);
        timeExpired = data.expired
        const date = new Date();

        if (date.getTime() > timeExpired) {
            localStorage.clear();
            signOut(auth);
            return 'undefined'
        }
        return JSON.stringify(data.value)
    }
    return 'undefined'


}
