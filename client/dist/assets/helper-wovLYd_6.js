import{i as s}from"./index-pULZCOVt.js";async function n({username:t}){try{const{data:r}=await s.get(`/user/${t}`);return{data:r}}catch{return{error:"Password doesn't Match...!"}}}async function c(t){try{const{data:{msg:r},status:e}=await s.post("/register",t),{username:o,email:a}=t;return e===200&&(console.log("ok"),await s.post("/registerMail",{username:o,userEmail:a,text:r})),Promise.resolve(r)}catch(r){return Promise.reject({error:r})}}async function u(t){try{const{data:{msg:r},status:e}=await s.post("/admin/register",t),{name:o,email:a}=t;return e===200&&(console.log("ok"),await s.post("/registerMail",{name:o,userEmail:a,text:r})),Promise.resolve(r)}catch(r){return Promise.reject({error:r})}}async function l({email:t,password:r}){try{if(t){const{data:e}=await s.post("/admin/login",{email:t,password:r});return Promise.resolve({data:e})}}catch{return Promise.reject({error:"Password doesn't Match...! "})}}async function d({username:t,password:r}){try{if(t){const{data:e}=await s.post("/login",{username:t,password:r});return console.log("login verifyPassword:",e),{success:!0,data:e}}}catch(e){return console.log(e.response),e.response&&e.response.data.message==="user is not verified"?{verified:!1}:{error:"Password doesn't Match...! "}}}async function P(t){console.log("generateOTP called",t);try{const{data:{code:r},status:e}=await s.get("/generateOTP",{params:{username:t}});if(e===201){const{data:{email:o}}=await n({username:t}),a=`Your Password Recovery OTP is ${r}. Verify and recover your password.`;await s.post("/registerMail",{username:t,userEmail:o,text:a,subject:"Password Recovery OTP"})}return Promise.resolve(r)}catch(r){return Promise.reject({error:r})}}async function g({username:t,code:r}){try{console.log("verifyOTP helper:",t,r);const{data:e,status:o}=await s.get("/verifyOTP",{params:{username:t,code:r}});return console.log(e),{data:e,status:o}}catch(e){return console.error("An error occurred while verifying OTP:",e),Promise.reject(e)}}async function y({username:t,password:r}){try{const{data:e,status:o}=await s.put("/resetPassword",{username:t,password:r});return Promise.resolve({data:e,status:o})}catch(e){return Promise.reject({error:e})}}export{d as a,c as b,l as c,u as d,P as g,y as r,g as v};