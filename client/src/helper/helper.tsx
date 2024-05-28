
import toast from "react-hot-toast";
import api from "../api"



export async function authenticate(username) {

    try {
        // return await axios.post('/api/authenticate', {username})

        return await api.post('/authenticate', {username})
    } catch (error) {
        return {error:"Username doesn't exist...!"}
    }
    
}

/* get User details */
export async function getUser({username}) {
    try {
      // const {data} = await axios.get(`http://localhost:5000/api/user/${username}`);

      const {data} = await api.get(`/user/${username}`);
      return {data};
    } catch (error) {
        return {error: "Password doesn't Match...!"}
    }
}

/* register user function */
export async function registerUser( credentials) {
    try {
      

      const { data : {msg} , status } =  await api.post(`/register`, credentials );
      const {username, email} = credentials;

      /* send email */
        if(status===200){
            console.log('user registered Status "200"');
            
            

            await api.post('/registerMail',{ username , userEmail: email ,text : msg })
        }

        return Promise.resolve(msg)

    } catch (error) {
      toast.error(error.response.data.message)
      
        return Promise.reject({error})
    }
    
}


/* register admin function */
export async function registerAdmin( credentials) {
    try {
      // const { data : {msg} , status } =  await axios.post(`http://localhost:5000/api/admin/register`, credentials );
      const { data : {msg} , status } =  await api.post(`/admin/register`, credentials );
      const {name, email} = credentials;

      /* send email */
        if(status===200){
            console.log('ok');
            
            // await axios.post('http://localhost:5000/api/registerMail',{ name , userEmail: email ,text : msg })

            await api.post('/registerMail',{ name , userEmail: email ,text : msg })
        }

        return Promise.resolve(msg)

    } catch (error) {
        return Promise.reject({error})
    }
    
}

/* admin login function */
export async function adminVerifyPassword({email, password }) {
    try {

        if(email){
          //  const {data}= await axios.post(`http://localhost:5000/api/admin/login`, {email,password});
           const {data}= await api.post(`/admin/login`, {email,password});
           return Promise.resolve({data});
        }
        
    } catch (error) {
        return Promise.reject({error:"Password doesn't Match...! "})
    }
    
}
// const navigate = useNavigate();

/* login function */
// export async function verifyPassword({username, password }) {
//     try {

//         if(username){
//           //  const {data}= await axios.post(`http://localhost:5000/api/login`, {username,password});

//            const {data}= await api.post(`/login`, {username,password});
//            console.log("login verifyPassword:",data)
//            return Promise.resolve({data});
//         }
        
//     } catch (error) {

//       console.log(error.response     )

//       if (error.response.data.message === "user is not verified") {
//         toast.error("User is not verified");
        
//         // navigate("/otp");
//         generateOTP(username);
//     }

//         return Promise.reject({error:"Password doesn't Match...! "})
//     }
    
// }



export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await api.post(`/login`, { username, password });
      console.log("login verifyPassword:", data);
      return { success: true, data };
    }
  } catch (error) {
    console.log(error.response);

    if (error.response && error.response.data.message === "user is not verified") {
      return { verified: false };
    }
    toast.error(error.response.data.message)

    return { error: "Password doesn't Match...! " };
  }
}

// export async function getCustomers(){

//   try {

//     const {data} = await axios.get(`http://localhost:5000/api/admin/customers`);
//       return {data};
    
//   } catch (error) {
//     return Promise.reject({error:"Couldn't find the Customers "})
//   }
// }


export async function getCustomers() {
  try {
    // const response = await axios.get('http://localhost:5000/api/admin/customers');

    const response = await api.get('/admin/customers');

    // Check if the response status is in the success range (2xx)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      // If the status is outside the success range, handle the error
      return Promise.reject({ error: `Failed to fetch customers. Server responded with status ${response.status}` });
    }
  } catch (error) {
    // Handle unexpected errors, such as network issues
    console.error('Error fetching customers:', error);

    // Return a generic error message
    return Promise.reject({ error: 'An unexpected error occurred while fetching customers' });
  }
}




/* update user profile function  */

export async function updateUser(response){
    try {

        const token = await localStorage.getItem('token');
        // const data = await axios.put('http://localhost:5000/api/updateuser',response,{headers: {"Authorization": `Bearer ${token}`}});
        const data = await api.put('/updateuser',response,{headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error:"Couldn't Update Profile...!"})
        
    }

}


/* generate OTP */
export async function generateOTP(username){
   
  console.log("generateOTP called", username )
    try {
      // const {data : {code},status}=  await axios.get('http://localhost:5000/api/generateOTP',{params:{username}});

      const {data : {code},status}=  await api.get('/generateOTP',{params:{username}});
      
      // send mail with the OTP
      if(status===201){
       const {data:{email}} = await getUser({username});
       const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      //  await api.post('/registerMail',{username,userEmail:email,text,subject:"Password Recovery OTP"})
       await api.post('/registerMail',{username,userEmail:email,text,subject:"Password Recovery OTP"})
      }
      return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({error})
    }
}

/* verify OTP */
// export async function verifyOTP({username,code}) {

//     try {
      
//       const {data,status} =  await api.get('/verifyOTP',{params:{username,code}});
//       console.log(data)
//       return {data,status}
//     } catch (error) {
//       // toast.error(data)
//         return Promise.reject(error)
        
//     }
    
// }

export async function verifyOTP({ username, code }) {
  try {
    console.log("verifyOTP helper:", username , code  )
      const { data, status } = await api.get('/verifyOTP', { params: { username, code } });
      console.log(data);
      return { data, status };
  } catch (error) {
      // toast.error(error.response.)
      // Log the error for debugging purposes
      console.error("An error occurred while verifying OTP:", error);
      // Return a rejected promise with the error
      return Promise.reject(error);
  }
}

/* reset password */
// export async function resetPassword({username,password}) {
//     try {
//         // const {data,status} = await axios.put('http://localhost:5000/api/resetPassword',{username,password});
//         const {data : ,status} = await api.put('/resetPassword',{username,password});
//         const{ email }= data
        
//         if(status===200){
//           console.log('user registered Status "200"');
          
          

//           await api.post('/registerMail',{ username , userEmail: email ,text : msg })
//       }

//         return Promise.resolve({data,status})
//     } catch (error) {
//       toast.error(error.response.data.message)
//         return Promise.reject({error})
//     }
    
// }

export async function resetPassword({ username, password }) {
  try {
    // Call the backend API to reset the password
    const { data: { msg, email }, status } = await api.put('/resetPassword', { username, password });

    if (status === 200) {
      console.log('User password reset successful with status "200"');
      
      // Send a confirmation email after successful password reset
      await api.post('/registerMail', { username, userEmail: email, text: msg });
    }

    return Promise.resolve({ data: { msg, email }, status });
  } catch (error) {
   
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
    toast.error(errorMessage);
    return Promise.reject({ error });
  }
}


/* Add Category function */
// export async function addCategory( credentials) {
//     try {
//       const { data : {msg} , status } =  await axios.post(`http://localhost:5000/api/admin/category/add`, credentials );
      

      
//         if(status===201){
//             console.log('ok');
            
            
//         }
//         return Promise.resolve(msg)


//     } catch (error) {
//         return Promise.reject({error})
//     }
    
// }

export async function addCategory(credentials) {
    try {
      // const { data: { msg }, status } = await axios.post(`http://localhost:5000/api/admin/category/add`, credentials);

      const { data: { msg }, status } = await api.post(`/admin/category/add`, credentials);
  
      if (status >= 200 && status < 300) {
        console.log('Request successful');
      }
  
      return msg;
    } catch (error) {
      return Promise.reject({
        status: error.response?.status,
        message: error.response?.data?.error || 'Something went wrong',
      });
    }
  }

  export async function addCategory2(credentials) {
    try {
      // const { data: { msg }, status } = await axios.post(`http://localhost:5000/api/admin/category/add`, credentials);

      const { data: { msg }, status } = await api.post(`/admin/category/add`, credentials);
  
      if (status >= 200 && status < 300) {
        console.log('Request successful');
      }
  
      return msg;
    } catch (error) {
      return Promise.reject({
        status: error.response?.status,
        message: error.response?.data?.error || 'Something went wrong',
      });
    }
  }