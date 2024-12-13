import React, { useState } from 'react'
import Image from 'next/image'
import action from '@/pages/api/DB/actionDB';
import axios from 'axios';

export default function addFatherModal({ controlModal }) {
  const [imageURL, setImageURL] = useState('')
  const [imagePreview, setImagePreview] = useState(null);


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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // console.log(formData)
      // const image_path = formData.image ? "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800" : "";
      // const createImage_path = await axios.post("/api/DB/CRUDimagePath", { "action": action.CREATE, "data": { "image_path": image_path } })


      // console.log(createImage_path.data)

      // let idImagePath = null;
      // createImage_path.status === 200 ? idImagePath = createImage_path.data.id_image_path : "";

      const data = {
        'name': formData.name,
        'time_start': formData.time_start,
        'office': formData.office,
        'introduction': formData.introduction,
        "image_path": "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
      }

      const createFatherIntro = await axios.post("/api/DB/CRUDfatherInfor", { "action": action.CREATE, "data": data })


      if (createFatherIntro.status === 200) {
        alert('Form submitted successfully!');
        setFormData({ name: '', time_start: '', office: '', introduction: '', image: null });
      } else {
        alert('Error submitting the form.');
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
                onClick={() => controlModal(false)}
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
                        <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px', height: 'auto' }} />
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
                    required
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
                  <input
                    multiple
                    type="text"
                    id="introduction"
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>



                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
