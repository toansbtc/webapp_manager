import React, { useState } from 'react'
import Head from "next/head";
import Image from 'next/image'
import router, { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from './api/config/fireBase';

export default function index() {
  const route = useRouter();
  const [user, setUser] = useState('Anonymous')
  const [opneImage, setOpenImage] = useState(false)
  const [currentImageURL, setCurrentImageURL] = useState('')
  const [image, setImage] = useState(['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnixOANZkzqBvx11kY0RUPxmRlhOfSwdebNA&s',])
  const [video, setVideo] = useState(['https://www.youtube.com/watch?v=ep1_odv7PUY', 'https://www.youtube.com/watch?v=ep1_odv7PUY'])


  const showElement = (id) => {
    const element = document.getElementById(id)
    if (element.classList.contains('show')) {
      element.classList.remove('show');
    } else {
      element.classList.add('show');
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

      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">

            <span className='row text-center justify-content-between align-content-center'>
              <Image src={'/bg.jpg'} width={50} height={50} className='col' alt='logo' />
              <div className='col h-100 text-center '>MyWebsite</div>
            </span>
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}


      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="navbar-brand" >
          <button className='mr-1 btn '
            onClick={() => route.push('/authen')}
          >


            <Image src={'/churchs.jpeg'} width={55} height={50} alt='Home icon' className='rounded-circle m-lg-0' />
            <span className='text-white' style={{ marginRight: 10 }}>Logo home</span>
          </button>
        </div>
        <button className="navbar-toggler" type="button"
          onClick={() => showElement('navbarCollapse')}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse " id="navbarCollapse" >
          <ul className="navbar-nav ms-auto me-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Disabled</a>
            </li>
          </ul>
          <div className="mr-auto justify-content-between" style={{ paddingRight: 10 }}>

            <div className="dropdown">
              <text className='text-white' style={{ fontSize: 18, fontFamily: 'cursive' }}>{user !== '' ? `${user}` : ''}</text>
              <button
                className="btn bg-dark dropdown-toggle"
                style={{ color: 'white' }}
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() =>
                  showElement('userLogin')}
              >
              </button>

              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" id="userLogin">
                <li onClick={() => route.push('/authen')}>
                  Login
                </li>
                <li onClick={() => {
                  signOut(auth);
                  sessionStorage.clear();
                  router.replace('/')
                }}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

      </nav>


      {/* Main Layout */}
      <div className="container-fluid mt-5 vh-100">
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
                  {
                    image.map((imageURL, index) =>
                      <Image src={imageURL} unoptimized width={100} height={100} style={{ width: '100%', paddingBottom: 10 }} alt='image' onClick={() => {
                        setOpenImage(true)
                        setCurrentImageURL(imageURL)
                        // <div style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0 }}>
                        //   <Image src={imageURL} width={100} height={100} alt='image' style={{ width: '100%', height: '100%' }} />
                        // </div>
                      }} />
                    )
                  }
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
          <div className="col-12 col-md-8 offset-md-2 mt-3">
            <div className="pt-4 p-2 bg-white border rounded shadow-sm ">
              <h2>Main Content Area</h2>
              <p>
                This is the main content area. You can put articles, images,
                videos, or anything else here.
              </p>
              <p>
                Bootstrap helps in making the layout responsive. The left and
                right advertisements are only visible on medium to large
                screens.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-md-2  col-2 d-none d-md-block position-fixed mt-5" style={{ top: '0', right: '0', height: '100vh', width: '16.6%', paddingRight: 0 }}>
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
          </div>
        </div>
      </div>

      {/* open view image full screen */}
      {opneImage && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpenImage(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Image
                  unoptimized
                  src={currentImageURL}
                  width={200}
                  height={200}
                  alt="Popup image"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


