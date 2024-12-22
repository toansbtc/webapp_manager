import { UserCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import Image from 'next/image'
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { auth } from '../../api/config/fireBase';
import { getItemSession } from '../Function/sessionFunction';
import Profile from "../components/profile"

const page = 'home' || 'profile' || 'ballot'
export default function active() {
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
        // <div className="d-flex vh-100">
        //     <div className="sidebar bg-info-subtle shadow" style={{ width: 250 }}>
        //         <div className='w-100 bg-info p-3'>
        //             <Image src="/bg.jpg"
        //                 width={100}
        //                 height={100}
        //                 alt='avata'
        //                 style={{ borderRadius: 50 }} />
        //             {/* <div>{user}</div> */}
        //         </div>
        //         <ul className="nav flex-column">
        //             <li className="nav-item">
        //                 <a className="nav-link active" onClick={() => {
        //                     setMainPage('home')
        //                 }}>Home</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={() => {
        //                     setMainPage('profile')
        //                 }}>Profile</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={() => {
        //                     setMainPage('ballot')
        //                 }}>Ballot</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="#">Settings</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" onClick={() => {
        //                     signOut(auth);
        //                     sessionStorage.clear();
        //                     router.replace('/')
        //                 }}>Logout</a>
        //             </li>
        //         </ul>
        //     </div>


        //     <div className="content flex-grow-1 p-4">
        //         {mainPage == 'profile' && (<div>
        //             <Profile user={user} />
        //         </div>)

        //         }
        //         {mainPage == 'ballot' && (<div>
        //             <Ballot />
        //         </div>)

        //         }

        //     </div>
        // </div>

        <div className="row">
            {/* Left Side */}
            <div className="  col-md-2 col-2 d-none d-md-block position-fixed mt-5" style={{ marginTop: '10%', top: '0', left: '0', height: '100vh', width: '16.6%', paddingLeft: 0 }}>
                <div className="pt-3 bg-light border rounded h-100 ">

                    <div style={{ height: '70%' }}>
                        <h5
                            className="text-center mb-4"
                            style={{
                                fontSize: '1.5rem',        // Larger font size
                                fontWeight: 'bold',        // Make it bold
                                color: '#ffffff',          // White text color
                                backgroundColor: '#ff5733', // Bright orange background for contrast
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for depth
                                padding: 0
                            }}
                        >
                            this is side image
                        </h5>
                        <div style={{ overflowY: 'auto', display: 'flex', whiteSpace: 'nowrap' }} >
                            {/* {
                      image.map((imageURL, index) =>
                        <Image src={imageURL} unoptimized width={100} height={100} style={{ width: '100%', paddingBottom: 10 }} alt='image' onClick={() => {
                          setOpenImage(true)
                          setCurrentImageURL(imageURL)
                          <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
                            <Image src={imageURL} width={100} height={100} alt='image' style={{ width: '100%', height: '100%' }} />
                          </div>
                        }} />
                      )
                    } */}
                        </div>
                        <div style={{ position: 'fixed', top: '73%', width: '15.2%' }}>
                            <button style={{ width: '100%' }}>hello bottom</button>
                        </div>
                    </div>
                    <div style={{ border: 4, borderColor: 'ActiveCaption', height: '30%' }}>
                        this is calender
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="col-12 col-md-10 offset-md-2 mt-3">
                <div className="pt-4 p-2 bg-white border rounded shadow-sm ">
                    <Profile user={undefined} />
                </div>
            </div>

            {/* Right Side */}
            {/* <div className="col-md-2  col-2 d-none d-md-block position-fixed mt-5" style={{ top: '0', right: '0', height: '100vh', width: '16.6%', paddingRight: 0 }}>
            <div className="pt-4 bg-light border rounded h-100">
              {
                video.map((videoURL, index) =>
                  <iframe
                    src={videoURL.replace('watch?v=', 'embed/')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onPlay={() => {

                    }}
                  />
                )
              }

            </div>
          </div> */}
        </div>
    )
}
