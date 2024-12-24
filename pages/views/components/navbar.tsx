import React, { useState } from 'react'
import router, { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../../api//config/fireBase';
import Image from 'next/image'

export default function navbar({ setLink, style }) {
    const [user, setUser] = useState('Anonymous')
    const route = useRouter();
    const showElement = (id) => {
        const element = document.getElementById(id)
        if (element.classList.contains('show')) {
            element.classList.remove('show');
        } else {
            element.classList.add('show');
        }
    };
    const navigateToActive = (category) => {
        route.push(`/active?category=${category}`);
      };
    return (
        <nav className={`navbar navbar-expand-md navbar-dark fixed-top ${style}`}>
            <div className="navbar-brand" >
                <button className='mr-1 btn '
                    onClick={() => route.push('/authen')}
                >
                    <Image src={'/church.jpeg'} priority width={55} height={50} alt='Home icon' className='rounded-circle m-lg-0' />
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
                        <a className="nav-link" onClick={() => setLink('home')}>Home</a>
                    </li>
                    <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="dropdownMenuButton"
              role="button"
              onClick={() => showElement('dropdownMenu')}
            >
              Active
            </a>
            <ul
              className="dropdown-menu"
              id="dropdownMenu"
              style={{  position: 'absolute' }}
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigateToActive('hien-mau')}
                >
                  Hiền Mẫu
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigateToActive('gia-truong')}
                >
                  Gia Trưởng
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => navigateToActive('gioi-tre')}
                >
                  Giới Trẻ
                </a>
              </li>
            </ul>
          </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => setLink('young')}>Yourng</a>
                    </li>
                </ul>

                <div className="mr-auto justify-content-between" style={{ paddingRight: 10 }}>

                    <div className="dropdown">
                        <span className='text-white' style={{ fontSize: 18, fontFamily: 'cursive' }}>{user !== '' ? `${user}` : ''}</span>
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
                            <li onClick={() => route.push('/views/yourngPages/authen', '/authen')}>
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
    )
}
