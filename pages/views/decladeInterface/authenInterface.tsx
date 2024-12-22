import { UserCredential } from "firebase/auth";

export interface data_return {
    code: Number | String;
    user: UserCredential
}