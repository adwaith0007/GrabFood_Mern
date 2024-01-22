import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const Demo = () => {
    const [file,setFile]=useState()
    const handleUpload = async (e) =>{
        const formdata = new FormData()
        formdata.append('file',file)
        console.log(file)

       console.log(
        formdata.get('file'))

        try {
            const response = await axios.post(
              `http://localhost:5000/api/admin/demo`,
               formdata ,
              {headers:{"Content-Type": "multipart/form-data"}}
            );
      
            if (response.data.success) {
              toast.success("Product added");
              console.log(response.data);
            } else {
              toast.error(response.data.message);
              console.log("Error:", response.data.message);
            }
          } catch (error) {
            toast.error(`Error: ${error.message}`);
            console.error("Error:", error);
          }
    }
  return (
    <div>
        <input type='file' multiple onChange={e=>setFile(e.target.files[0])} ></input>
        <button onClick={handleUpload}>upload</button>
    </div>
  )
}

export default Demo