import React from 'react'
import Head from "next/head";
import Image from 'next/image'

export default function index() {
  return (
    <>

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
          <Image src={'/church.jpeg'} width={85} height={60} alt='icon label' className='rounded-circle m-lg-0' />
        </div>
        <button className="navbar-toggler" type="button"
          onClick={() => {
            const element = document.getElementById('navbarCollapse');
            if (element.classList.contains('show')) {
              element.classList.remove('show');
            } else {
              element.classList.add('show');
            }
          }}
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
          <button className="mr-auto ">
            <span className='text-white'>loggin</span>
          </button>
        </div>

      </nav>


      {/* Main Layout */}
      <div className="container-fluid mt-4 vh-100">
        <div className="row">
          {/* Left Advertisement Section */}
          <div className="col-2 d-none d-block">
            <div className="p-3 bg-light border rounded">
              <h5 className="text-center">Advertisement</h5>
              <p>Left Ad Content Here</p>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="col-8">
            <div className="p-4 bg-white border rounded shadow-sm">
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

          {/* Right Advertisement Section */}
          <div className="col-2 d-none d-block">
            <div className="p-3 bg-light border rounded">
              <h5 className="text-center">Advertisement</h5>
              <p>Right Ad Content Here</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
