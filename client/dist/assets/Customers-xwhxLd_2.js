import{r,i as m,_ as c,j as a,L as j,S as t,T as b}from"./index-gIIwSxQ2.js";const g=[{Header:"S.NO",accessor:"no"},{Header:"USERNAME",accessor:"username"},{Header:"EMAIL",accessor:"email"},{Header:"PHONE",accessor:"phone"},{Header:a.jsx("div",{className:"flex justify-center ",children:"All Orders"}),accessor:"orderDetails"},{Header:"BLOCK",accessor:"block"}],y=()=>{const[n,d]=r.useState([]),[i,h]=r.useState([]),[u,p]=r.useState(!0);r.useEffect(()=>{m.get("/admin/customers").then(s=>{s.data.success?d(s.data.data):c.error("Error while loading customers")}).catch(s=>{c.error(s.response.data.message),console.error(s)}).finally(()=>{p(!1)})},[]),r.useEffect(()=>{const s=n.map((e,o)=>({no:o+1,username:e.username,email:e.email,phone:e.phone,orderDetails:a.jsx(j,{className:"flex justify-center",to:`/admin/customer/${e._id}/products`,children:"View"}),block:a.jsx("button",{className:`px-2 py-1  ${e.isBlocked?"bg-red-500 text-white  ":"bg-green-500 text-white"}`,onClick:()=>x(e._id,e.isBlocked),children:e.isBlocked?"Unblock":"Block"})}));h(s)},[n]);const x=async(s,e)=>{try{const o=await m.put(`/admin/customers?id=${s}`,{isBlocked:!e}),k=n.map(l=>l._id===s?{...l,isBlocked:!e}:l);o.data.success&&(d(k),c.success(`Customer ${e?"Unblocked":"Blocked"} successfully`))}catch(o){console.error("Error updating block status:",o),c.error(o.response.data.message)}},f=r.useMemo(()=>Array(10).fill({}).map(()=>({no:a.jsx(t,{width:30}),username:a.jsx(t,{width:100}),email:a.jsx(t,{width:100}),phone:a.jsx(t,{width:100}),orderDetails:a.jsx(t,{width:100}),block:a.jsx(t,{width:100})})),[]),w=b(g,u?f:i,"dashboard-product-box","Products",!u&&i.length>6)();return a.jsx("main",{className:"h-full",children:w})};export{y as default};