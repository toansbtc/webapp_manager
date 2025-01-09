import Head from "next/head";
import { Inter } from "next/font/google";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, faceBookProvider, googleprovider, user } from "../../api/config/fireBase"
import { useDispatch, useSelector } from "react-redux";

import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getItemSession, key_user, setItemSession } from "../../views/Function/sessionFunction";
import { current } from "@reduxjs/toolkit";

const inter = Inter({ subsets: ["vietnamese"] });

export default function Home() {


    // const [user, setUser] = useState();



    const router = useRouter();

    const [rememberMe, setRememberMe] = useState(true);
    const [loginOrRegister, setLoginOrRegister] = useState('login');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(true);




    const handlePersistence = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence); // Persist session in localStorage
        } catch (error) {
            console.error('Error setting persistence:', error);
        }
    };


    useEffect(() => {
        if (getItemSession() != 'undefined')
            router.replace('/home')
        // const unsubscriple = onAuthStateChanged(auth, (currentUser) => {
        //   console.log(currentUser)
        //   if (currentUser && sessionStorage.getItem(user)) {
        //     console.log('odo', currentUser.email, sessionStorage.getItem(user))
        //     router.replace('/home')
        //   }
        // })

        // return () => unsubscriple();
    }, [router])

    handlePersistence();

    const authen = async (e) => {
        e.preventDefault();


        const form = new FormData(e.currentTarget)

        console.log()
        const formData = {
            'type': loginOrRegister,
            'email': form.get('email'),
            'password': form.get('password'),
        }
        setLoading(true)
        const response = await axios.post('/api/authen', formData)
        const user_data = response.data.user;

        console.log(user_data)

        if (response.data.code === 200) {
            setItemSession(key_user, user_data);
            router.replace('/home')


        }
        // else
        //   alert(response.data.code)
        setLoading(false)

    }

    const typeLogin = async (typeLogin) => {
        let result;
        try {
            setLoading(true)
            if (typeLogin === "fb")
                result = await signInWithPopup(auth, faceBookProvider)
            else if (typeLogin === "gg")
                result = await signInWithPopup(auth, googleprovider)
            setLoading(false);
            setItemSession(key_user, result.user)
            // const unsubscriple = onAuthStateChanged(auth, (currentUser) => {
            //   console.log('use', currentUser)
            //   if (currentUser) {
            //     router.replace('/home')
            //     sessionStorage.setItem(user, JSON.stringify(currentUser))
            //   }
            // })
            // return () => unsubscriple();

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Head>
                <title>Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>





            <div className="container-fluid login_background_image" >
                <div className="row justify-content-center align-items-center">


                    <div className="card col-lg-4 mt-5">

                        <div className="mt-2 mb-3 text-center">
                            <ul className="nav nav-tabs">
                                <li className={`nav-item`}>
                                    <button className={`nav-link ${loginOrRegister === 'login' ? 'active' : ''}`} aria-current="page"
                                        onClick={() => {
                                            setLoginOrRegister('login')
                                        }}
                                    >Login</button>
                                </li>
                                <li className={`nav-item`} >
                                    <button className={`nav-link ${loginOrRegister === 'register' ? 'active' : ''}`} aria-current="page"
                                        onClick={() => setLoginOrRegister(`register`)}
                                    >Register</button>
                                </li>
                            </ul>
                        </div>



                        {loginOrRegister === 'login' && (
                            <div>
                                <form onSubmit={authen}>
                                    <div className="form-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control form-control-placeholder opacity-75"
                                            name="email"
                                            id="loginEmail"
                                            placeholder="Enter your email"
                                            required
                                        // onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-placeholder opacity-75"
                                            name="password"
                                            id="loginPassword"
                                            placeholder="Password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="form-control btn btn-info">
                                        Login
                                    </button>
                                </form>
                                <div className="row mt-2 text-center">
                                    <div className="w-50">
                                        <label >
                                            <input type="checkbox" id="chk_remember" style={{ marginRight: '8px' }}
                                                onChange={(event) => {
                                                    setRememberMe(event.target.checked)
                                                }} />
                                            Remember Me
                                        </label>
                                    </div>
                                    <div className="w-50">

                                        <a href="#"  >Forgot Password?</a>

                                    </div>
                                    <div className="w-100 text-center m-2">
                                        <label >-- Login with --</label>
                                        <div className="d-flex justify-content-center mt-1">
                                            <i style={{ color: "blue", fontSize: 35 }} className=" fa-brands fa-facebook" aria-hidden="true"
                                                onClick={() => { typeLogin("fb"); console.log("fb loggin") }}></i>
                                            <div style={{ width: 50 }} />
                                            <i style={{ color: "red", fontSize: 35 }} className="fa-brands fa-google" aria-hidden="true"
                                                onClick={() => { typeLogin("gg"); console.log("gg loggin") }}
                                            ></i>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                        {loginOrRegister === 'register' && (
                            <div>
                                <form onSubmit={authen}>
                                    <div className="form-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control form-control-placeholder opacity-75"
                                            name="email"
                                            id="registerEmail"
                                            placeholder="Enter your email"
                                            // onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-placeholder opacity-75"
                                            name="password"
                                            id="registerPassword"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control form-control-placeholder opacity-75"
                                            name="retypePassword"
                                            id="retypePassword"
                                            placeholder="retype password"
                                            required
                                            onChange={(e) => {
                                                console.log(e.target.value)
                                                console.log(password)
                                                if (e.target.value === password)
                                                    setCheckPassword(false)
                                                else
                                                    setCheckPassword(true)

                                            }}
                                        />
                                        {checkPassword && (<label className="text-sm-start text-danger align-content-end">Password not match</label>)}
                                    </div>
                                    <button disabled={checkPassword} type="submit" className="form-control btn_loggin ">
                                        Register
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>



                </div>
                {
                    loading && (
                        <div className='loadingContainer'>
                            <div className='spinner'></div>
                        </div>
                    )
                }
            </div >



        </>
    );
}

