import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import addFatherModal from '../modals/addFatherModal';
import AddFatherModal from '../modals/addFatherModal';
import actionDB from "../../api/DB/actionDB"
import Quill_editor from '../components/quill_editor';
import 'react-quill/dist/quill.snow.css';



export default function home() {

    const [modalAddFarther, setmodalAddFarther] = useState(false)
    const [description, setDescription] = useState<any>({})
    const [inforlist, setInforList] = useState([])
    const [fatherInfor, setFatherInfor] = useState({})
    const [editInfor, setEditInfor] = useState(false)


    // useEffect(() => {
    //     const name = "dương văn quá"
    //     const time_start = "04/20/2021"
    //     const office = "staff"
    //     const introduction = "a member of team"
    //     const image_path = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
    //     const getsql = 'select * from catho_schema.farther_intro'
    //     const sql = `insert into catho_schema.farther_intro ("name","time_start","office","introduction","image_path") values ('${name}','${time_start}','${office}','${introduction}','${image_path}')`
    //     axios.post('/api/DB/PostgreSQL', { sql: getsql }).then((resuilt) => {
    //         if (resuilt.data) {
    //             setInforList(resuilt.data)
    //             console.log(resuilt.data)
    //         }
    //     })
    // }, [])

    useEffect(() => {
        // const getIntroSQL = "delete FROM intro_home "
        // axios.post('/api/DB/CRUDintroHome', { "action": actionDB.NATIVESQL, "data": { "sql": getIntroSQL } })
        loadDataFatherInforList();
        loadDataIntroduct();
    }, [editInfor])

    const loadData = (data) => {

        setDescription(data)
    }

    const loadDataIntroduct = async () => {
        const getIntroSQL = "SELECT * FROM intro_home where introduct not like 'image%'  LIMIT 1"
        await axios.post('/api/DB/CRUDintroHome', { "action": actionDB.NATIVESQL, "data": { "sql": getIntroSQL } })
            .then((result) => {
                if (result.status === 200)
                    setDescription(result.data[0] ? result.data[0] : { "introduct": '' })
            })

    }

    const loadDataFatherInforList = () => {
        axios.post('/api/DB/CRUDfatherInfor', { "action": actionDB.GETLISTDATA })
            .then((result) => {
                if (result.status === 200) {
                    const data = result.data;
                    const fatherinfor = []
                    Array.from(data).map((value: any, index) => {

                        fatherinfor.push({
                            "image_path": value.image_path.image_path,
                            "name": value.name,
                            "office": value.office,
                            "time_start": new Date(value.time_start).toISOString().split('T')[0],
                            "introduction": value.introduction,
                            "id": value.id
                        })
                    })
                    setInforList(fatherinfor);
                    setFatherInfor({})
                }
            })
    }

    const controlModal = (option) => {
        setmodalAddFarther(option)
    }
    const openCloseQuill = (option) => {
        setEditInfor(option);
    }



    return (
        <div style={styles.pageContainer}>
            <div style={styles.mainContainer}>

                <Image style={{ position: 'fixed', top: 0, right: 0 }} src={"/pen_icon_edit.png"} alt='icon pen' width={30} height={30} onClick={() => setEditInfor(true)} />
                {
                    editInfor ?
                        (
                            <Quill_editor data={description} openCloseQuill={openCloseQuill} loadData={loadData} />
                        )
                        :
                        (
                            <div id='innerHTML' dangerouslySetInnerHTML={{ __html: description ? description.introduct : '' }}></div>
                        )
                }

            </div>

            {/* main content */}
            <div style={styles.gridContainer} >
                {inforlist.map((item, index) =>
                (
                    <div key={index} className="container py-2">
                        <div className="card mx-auto shadow" style={{ maxWidth: 450 }}>

                            <Image
                                unoptimized
                                src={item.image_path}
                                alt={"image " + index}
                                width={300}
                                height={200}
                                style={styles.gridImage}
                                className="card-img-top"
                            />
                            <div className="card-body text-start bg-primary-subtle">
                                <h4 className='card-text'><strong>Tên: {item.name}</strong></h4>
                                <h5 className='card-text'>Chức vụ: {item.office}</h5>
                                <h5 className='card-text'>Thời gian bắt đầu: {item.time_start}</h5>
                                <h5 className='card-text'>Giới thiệu chung :
                                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", width: "100%", height: 100, margin: 0 }}>{item.introduction}</pre>
                                </h5>

                                <div className='row text-center'>
                                    {/* update data infor  */}
                                    <div style={{ width: '100%', backgroundColor: 'rgb(33 179 110)' }} onClick={() => {
                                        setFatherInfor(item)
                                        setmodalAddFarther(true)
                                    }}>
                                        <span>Update</span>
                                    </div>

                                    {/* delete father infor */}
                                    <div style={{ width: '100%', backgroundColor: '#b33421', marginTop: 5 }} onClick={async () => {
                                        const isConfirmed = confirm("Are you sure you want to delete this item?");

                                        if (isConfirmed) {
                                            await axios.post('/api/DB/CRUDfatherInfor', { "action": actionDB.DELETE, "data": { "id": item.id } });
                                            alert("data deleted!")
                                            loadDataFatherInforList()
                                        } else {
                                            console.log("Delete canceled");
                                        }
                                    }}>
                                        <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div>
                    <button className='btn btn-success text-center'
                        onClick={() => setmodalAddFarther(true)}>
                        +
                    </button>
                </div>
            </div>

            {modalAddFarther && (<div style={{ position: 'fixed', justifyContent: 'center', alignContent: 'center' }}><AddFatherModal controlModal={controlModal} loadList={loadDataFatherInforList} fatherIntro={fatherInfor} /></div>)}
        </div>
    )
};

// CSS-in-JS styles
const styles = {
    mainContainer: {
        padding: "5px",
        minHeight: "100px",
        margin: '0 auto',
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(272deg, #d5d5514f, #d998d440, #a7ff8396)",
        color: "#333",

    },
    pageContainer: {

        minHeight: "100vh",
        backgroundColor: "white",
        // padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        with: '100%',
    },
    mainImage: {
        borderRadius: '10px',
        width: '100%',
        height: '400px',
    },
    mainDescription: {
        // marginTop: '20px',
        flex: 1,
        fontSize: '1.2em',
        color: '#555',
        with: '100%',
        height: '500px'
    },
    gridContainer: {
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItem: {
        textAlign: 'center',
        padding: '5px',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    gridImage: {
        borderRadius: '8px',
        width: '100%',
        height: 'auto',
    },
    gridDescription: {
        marginTop: '5px',
        fontSize: '1em',
        color: '#444',
    },
};

