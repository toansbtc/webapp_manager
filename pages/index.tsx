import React, { useEffect, useState } from 'react'
import Head from "next/head";
import Image from 'next/image'
import { signOut } from 'firebase/auth';
import Active from './views/commonPages/active';
import Home from './views/commonPages/home';
import Yourng from './views/yourngPages';
// import { prisma_sql } from './api/DB/PostgreSQL';
import axios from 'axios';
import Navbar from './views/components/navbar';
import { setInterval } from 'timers';
import action from './api/DB/actionDB';
import { useLoading } from "./views/loadingPages/loadingContext"
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData, handleHomeImagePath } from './api/redux/homeDataSlice';
import { appDispatch, rootState } from './api/redux/store';
import actionDB from './api/DB/actionDB';
import getItemSession from './views/Function/sessionFunction';


const page = 'home' || 'active' || 'young'
export default function index() {


  const [isScrolled, setIsScrolled] = useState(false);
  const [link, setLink] = useState<typeof page>('home')
  const [imageIntroduct, setImageIntroduct] = useState({ "introduct": "", "id": null, "type": "" })
  const [imageList, setImageList] = useState([])
  const [indexImage, setIndexImage] = useState(0);
  const [editImage, setEditImage] = useState(false);
  const [onChangeImagePath, setOnChangeImagePath] = useState("");
  const [user, setUser] = useState({ "role": 1000, "username": "anonimous" });



  const { setIsLoading } = useLoading();
  const dispatch = useDispatch<appDispatch>();
  const { dataDescription, dataFatherIntro, dataImagePath, loading, error } = useSelector((state: rootState) => state.homedata)
  let touchStartX = 0;





  // set data for image path when change
  useEffect(() => {

    if (loading)
      setIsLoading(true)
    else {
      setIsLoading(false)
      setImageIntroduct(dataImagePath)
      console.log('dataImagePath', dataDescription, dataFatherIntro, dataImagePath)
    }

  }, [dataImagePath])

  // function to set link navbar
  const setLinkFromNavbar = (link: typeof page) => {
    setLink(link)
  }


  // add scroll to window
  useEffect(() => {
    // const resuilt = axios.post("/api/DB/CRUDaccountRole", { "action": actionDB.CREATE, "data": { "user_token": "Admin", "role": 0, "is_active": true } })
    // axios.post("/api/DB/CRUDaccountRole", { "action": actionDB.UPDATE, "data": { "user_token": "Admin", "password": "AAaa**22" } }).then((resuilt) => {
    //   console.log("resuilt", resuilt)
    // })

    if (getItemSession() !== 'undefined') {
      const user = JSON.parse(getItemSession());
      console.log("user is: ", user)
      setUser(user)
    }


    // const interval = setInterval(() => {
    //   if (indexImage < imageList.length - 1)
    //     setIndexImage(indexImage + 1)
    //   else if (indexImage == imageList.length - 1)
    //     setIndexImage(0);
    // }, 3000)

    // loadImageList();

    const handleScroll = () => {
      const triggerHeight = window.innerHeight / 1.3;
      setIsScrolled(window.scrollY > triggerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      // clearInterval(interval)
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  // get image path form data
  useEffect(() => {
    if (imageIntroduct.introduct) {
      const data = imageIntroduct.introduct.split('\n')
      setOnChangeImagePath(imageIntroduct.introduct)
      setImageList(data)
      console.log("image list path", imageList)
    }
  }, [imageIntroduct])



  // function loadImageList() {
  //   try {

  //     axios.post("/api/DB/CRUDintroHome", { "action": action.GETDATA, "data": { "type": "image" } }).then((result) => {
  //       console.log("image introduct", result)
  //       setImageIntroduct(result.data)
  //     })

  //   } catch (error) {
  //     console.log(error)
  //   }
  //   finally {

  //   }
  // }


  // add or update image path 
  async function handleImagePath(e) {
    e.preventDefault();
    setImageIntroduct({ id: imageIntroduct.id, introduct: onChangeImagePath, type: imageIntroduct.type })
    try {
      setEditImage(false)
      setIsLoading(true)
      if (imageIntroduct.id) {

        await axios.post("/api/DB/CRUDintroHome", { "action": action.UPDATE, "data": { "introduct": onChangeImagePath, "id": imageIntroduct.id } }).then((result) => {

          if (result.status === 200) {
            dispatch(handleHomeImagePath({ "introduct": onChangeImagePath, "id": imageIntroduct.id } as any))
            alert("update image path success!")

          }
        })
      }
      else {
        await axios.post("/api/DB/CRUDintroHome", { "action": action.CREATE, "data": { "introduct": onChangeImagePath, "type": "image" } }).then((result) => {

          if (result.status === 200) {
            setIsLoading(true)
            dispatch(
              fetchHomeData({
                loadingIntroHome: false,
                loadingFatherInfor: false,
                loadingImage: true,
              })
            );
            setIsLoading(false)
            alert("create image path success")
          }
        })
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false)
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

      {link === "home" ? (

        <header className="position-relative">
          {/* Dynamic class applied for scroll effect */}
          <div
            onTouchStart={(e) => {
              touchStartX = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const touchEndX = e.changedTouches[0].clientX;
              if (touchStartX - touchEndX > 50) {
                // Detect swipe left
                if (indexImage < imageList.length - 1)
                  setIndexImage(indexImage + 1)
              } else if (touchEndX - touchStartX > 50) {
                // Detect swipe right (optional)
                if (0 < indexImage && indexImage <= imageList.length - 1)
                  setIndexImage(indexImage - 1)
              }
            }}
            style={{
              height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              backgroundColor: '#000',
            }}
            className={` bg-image ${isScrolled ? 'scrolled' : ''}`}>

            <button className='icon-right text-center' onClick={() => {
              if (indexImage < imageList.length - 1)
                setIndexImage(indexImage + 1)
              else if (indexImage == imageList.length - 1)
                setIndexImage(0)

            }}>
              {">"}
            </button>
            <button className='icon-left text-center' onClick={() => {
              if (0 < indexImage && indexImage <= imageList.length - 1)
                setIndexImage(indexImage - 1)
            }}>
              {"<"}
            </button>


            {user.role == 0 && (<Image style={{ position: 'fixed', top: '10%', right: 0, background: 'white' }} src={"/pen_icon_edit.png"} alt='icon pen' width={30} height={30} onClick={() => setEditImage(true)} />)}


            <Image
              unoptimized
              src={imageList[indexImage]}
              width={200}
              height={200}
              alt="image"
              style={{ width: '100%', height: '100%', transition: 'transform 0.5s ease', }}
            />

            <div className='dotsContainer '>
              {imageList.map((_, index) => (
                <span
                  key={index}
                  className='dot'
                  style={{
                    backgroundColor: indexImage === index ? '#333' : '#ddd',
                  }}
                  onClick={() => setIndexImage(index)}
                />
              ))}
            </div>


          </div>
          <Navbar setLink={setLinkFromNavbar} style={!isScrolled ? "bg-transparent" : "bg-black"} />


          <div className={`home-container ${isScrolled ? 'visible' : ''}`}>
            <Home />
          </div>
        </header>


      ) : (
        <div style={{ height: '100vh', width: '100%', display: 'grid' }}>
          <div><Navbar setLink={setLinkFromNavbar} style={"bg-black"} /></div>
          <div>
            {link === 'active' && (
              <div className=''>
                <Active />
              </div>
            )}
            {link === 'young' && (
              <div>
                <Yourng />
              </div>
            )}
          </div>
        </div>

      )}





      {/* Main Layout */}

      {/* {link === 'active' && (
        <div className=''>
          <Active />
        </div>
      )}
      {link === 'young' && (
        <div>
          <Yourng />
        </div>
      )} 
       {link === 'home' && (
          <div className={`home-container ${isScrolled ? 'visible' : ''}`}>
            <Home />
          </div>
        )} */}




      {/* open edit image path */}
      {editImage && (
        <div
          className="modal show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditImage(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleImagePath}>


                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">image path:</label>
                    <textarea
                      // maxLength={250}
                      aria-valuemax={100}
                      style={{ width: '100%', height: 170 }}
                      aria-multiline
                      id="introduction"
                      name="introduction"
                      value={onChangeImagePath}
                      onChange={(e) => { setOnChangeImagePath(e.target.value) }}
                      className="form-control"
                      required
                    />
                  </div>



                  <button type="submit" className="btn btn-primary">{imageIntroduct.id ? "Cập nhật" : "Thêm mới"}</button>


                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {openLogin && (<Loggin_registerModal controlModal={controlModal} />)} */}
    </>
  )
}


