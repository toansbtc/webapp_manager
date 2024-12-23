import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import action from '@/pages/api/DB/actionDB';
import axios from 'axios';
import { getDrivePath } from '../Function/getDrivePath';

export default function addFatherModal({ controlModal, loadList, fatherIntro }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  useEffect(() => {
    if (fatherIntro) {
      setFormData(fatherIntro)
    }
    // axios.post("/api/DB/CRUDfatherInfor", { "action": action.NATIVESQL, "data": { "sql": "select * from image_path" } }).then((data) => {
    //   console.log("this is data image path", data)
    // })
  }, [])



  const [formData, setFormData] = useState({
    name: '',
    time_start: '',
    office: '',
    introduction: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      'name': formData.name,
      'time_start': formData.time_start,
      'office': formData.office,
      'introduction': formData.introduction,
      "image_path": ""
    }

    try {

      if (imageFile) {

        const formDataImage = new FormData();
        formDataImage.append("fileImage", imageFile);
        formDataImage.append("folderName", "Father");
        await axios.post("/api/controller/gg_drive", formDataImage).then((result) => {
          if (result.data) {
            console.log("data result ", result.data);
            data.image_path = result.data.fileId;
          }
        })
      }






      if (fatherIntro.id) {

        fatherIntro.name = formData.name
        fatherIntro.time_start = formData.time_start
        fatherIntro.office = formData.office
        fatherIntro.introduction = formData.introduction
        fatherIntro.image_path = data.image_path === "" ? formData.image : data.image_path

        const updateFatherIntro = await axios.post("/api/DB/CRUDfatherInfor", { "action": action.UPDATE, "data": fatherIntro })
        if (updateFatherIntro.status === 200) {
          alert('Chỉnh sửa thành công!');
        } else {
          alert('Error submitting the form.');
        }
      }
      else {
        const createFatherIntro = await axios.post("/api/DB/CRUDfatherInfor", { "action": action.CREATE, "data": data })
        if (createFatherIntro.status === 200) {
          alert('Thêm mới thành công!');
          setFormData({ name: '', time_start: '', office: '', introduction: '', image: null });
        } else {
          alert('Error submitting the form.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };




  return (
    <div>
      <div
        className={`modal show`}
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.8)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={() => { controlModal(false), loadList(); }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              <form onSubmit={handleSubmit} className="container mt-4">

                <div className="mb-3">
                  {imagePreview && (
                    <div className="mb-3">
                      <label className="form-label">Image Preview:</label>
                      <div>
                        <img width={200} height={200} src={imagePreview} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px', height: 'auto' }} />
                      </div>
                    </div>
                  )}
                  {fatherIntro.image_path && !imagePreview && (
                    <div className="mb-3">
                      <label className="form-label">Image Preview:</label>
                      <div>
                        <img width={200} height={200} src={getDrivePath(fatherIntro.image_path)} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px', height: 'auto' }} />
                      </div>
                    </div>
                  )}
                  <label htmlFor="image" className="form-label">Upload Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                    {...fatherIntro.id ? null : require}
                  />
                </div>



                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Time Start:</label>
                  <input
                    type="date"
                    id="time_start"
                    name="time_start"
                    value={formData.time_start}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">office:</label>
                  <input
                    type="text"
                    id="office"
                    name="office"
                    value={formData.office}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">introduction:</label>
                  <textarea
                    // maxLength={250}
                    aria-valuemax={100}
                    style={{ width: '100%', height: 170 }}
                    aria-multiline
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>



                <button type="submit" className="btn btn-primary">{fatherIntro.id ? "Cập nhật" : "Thêm mới"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
