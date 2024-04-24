// import React, { useState } from 'react'
import avatar from '../../../assets/profile.png';
import  { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';
// import { profileValidation } from '../../../helper/validate';
// import convertToBase64 from '../../../helper/convert';
// import useFetch from '../../../hooks/fetch.hook';
// import { updateUser } from '../../../helper/helper'
// import { useNavigate } from 'react-router-dom'

import styles from '../../../styles/Username.module.css';
import extend from '../../../styles/Profile.module.css'

export default function ProfileUpdate() {


  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
            </span>
          </div>

          <form className='py-1' >
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={ avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  
                  <input type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                  <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                  <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

               
                  <input  className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
                  <button className={styles.btn} type='submit'>Update</button>
               
                  
              </div>

              

          </form>

        </div>
      </div>
    </div>
  )
}