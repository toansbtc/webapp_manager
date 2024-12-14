import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import addFatherModal from '../modals/addFatherModal';
import AddFatherModal from '../modals/addFatherModal';
import actionDB from "../../api/DB/actionDB"
import { prisma } from '@/pages/api/DB/prisma';
import { handle } from '@/pages/api/Function/googleDriveFunction';

export default function home() {

    const [modalAddFarther, setmodalAddFarther] = useState(false)
    const [description, setDescription] = useState('')
    const [inforlist, setInforList] = useState([])
    const [fatherInfor, setFatherInfor] = useState({})


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
        loadDataFatherInforList();
    }, [])

    const loadDataFatherInforList = () => {
        axios.post('/api/DB/CRUDfatherInfor', { "action": actionDB.GETLISTDATA })
            .then((result) => {
                if (result.status === 200) {
                    const data = result.data;
                    const fatherinfor = []
                    Array.from(data).map((value: any, index) => {
                        console.log("data list father:", value)
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

    return (
        <div style={styles.pageContainer}>
            <div style={styles.mainImageContainer}>
                {/* <Image
                    unoptimized
                    src="/bg.jpg"
                    alt="Main Feature"
                    width={800}
                    height={200}
                    style={styles.mainImage}
                /> */}
                <p style={styles.mainDescription}>
                    {description !== '' ? description : 'Empty'}
                </p>
            </div>

            {/* Grid of Images and Descriptions */}
            <div style={styles.gridContainer}>
                {inforlist.map((item, index) =>
                (
                    <div key={index} className="container py-5">
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
                            <div className="card-body text-start">
                                <h5 className='card-title fw-bold'>Tên: {item.name}</h5>
                                <p className='card-subtitle mb-3 text-muted'><strong>Chức vụ: {item.office}</strong></p>
                                <p className='card-text'><strong>Thời gian bắt đầu: {item.time_start}</strong></p>
                                <p className='card-text'><strong>Giới thiệu chung : {item.introduction}</strong></p>
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
    pageContainer: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    mainImageContainer: {
        marginBottom: '40px',
        //   textAlign: 'center',
    },
    mainImage: {
        borderRadius: '10px',
        width: '100%',
        height: '400px',
    },
    mainDescription: {
        marginTop: '20px',
        fontSize: '1.2em',
        color: '#555',
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
        //   textAlign: 'center',
        padding: '10px',
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
        marginTop: '15px',
        fontSize: '1em',
        color: '#444',
    },
};

