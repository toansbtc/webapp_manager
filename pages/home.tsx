import { UserCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image'
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from './api/config/fireBase';
import { getItemSession } from './api/Function/sessionFunction';
import Profile from '../pages/pageComponent/profile'
import Ballot from '../pages/pageComponent/ballot'

const page = 'home' || 'profile' || 'ballot'
export default function home() {
    const router = useRouter();
    const [user, setuser] = useState('');
    const [mainPage, setMainPage] = useState<typeof page>('home');

    useEffect(() => {
        // const unsubscriple = onAuthStateChanged(auth, (currentUser) => {
        //     if (!currentUser && !sessionStorage.getItem(user)) {
        //         router.replace('/')
        //     }
        // })
        // return () => unsubscriple();

        const data = getItemSession()
        if (data === 'undefined') {
            router.replace('/')

        }
        else
            setuser(data)

    }, [router])

    // console.log('use', get_user())

    return (
        <div className="d-flex vh-100">
            <div className="sidebar bg-info-subtle shadow" style={{ width: 250 }}>
                <div className='w-100 bg-info p-3'>
                    <Image src="/bg.jpg"
                        width={100}
                        height={100}
                        alt='avata'
                        style={{ borderRadius: 50 }} />
                    {/* <div>{user}</div> */}
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" onClick={() => {
                            setMainPage('home')
                        }}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => {
                            setMainPage('profile')
                        }}>Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => {
                            setMainPage('ballot')
                        }}>Ballot</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => {
                            signOut(auth);
                            sessionStorage.clear();
                            router.replace('/')
                        }}>Logout</a>
                    </li>
                </ul>
            </div>


            <div className="content flex-grow-1 p-4">
                {mainPage == 'profile' && (<div>
                    <Profile user={user} />
                </div>)

                }
                {mainPage == 'ballot' && (<div>
                    <Ballot />
                </div>)

                }

            </div>
        </div>
    )
}
