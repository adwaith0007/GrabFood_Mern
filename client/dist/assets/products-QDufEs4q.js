import{r as a,j as e,L as n,T as p,A as l,h,i as m}from"./index-OHPKI3E0.js";const g="http://localhost:5000",x=[{Header:"Photo",accessor:"photo"},{Header:"Name",accessor:"name"},{Header:"Price",accessor:"price"},{Header:"Category",accessor:"category"},{Header:"Action",accessor:"action"}],j=()=>{const[c,d]=a.useState([]),[t,i]=a.useState([]);a.useEffect(()=>{(async()=>{try{const s=await m.get("/product/get");s.data.success&&d(s.data.data)}catch(s){console.error("Error while loading products",s)}})()},[]),a.useEffect(()=>{const r=c.map(s=>{var o;return{photo:e.jsx("img",{src:`${g}/${(o=s.productImage[0])==null?void 0:o.replace(/ /g,"%20")}`,alt:s.name}),name:s.productName,price:`₹${s.price}`,category:s.category,action:e.jsx(n,{to:`/admin/product/${s._id}`,children:"Manage"})}});i(r)},[c]);const u=p(x,t,"dashboard-product-box","Products",t.length>6)();return e.jsxs("div",{className:"admin-container",children:[e.jsx(l,{}),e.jsx("main",{children:u}),e.jsx(n,{to:"/admin/product/add",className:"create-product-btn",children:e.jsx(h,{})})]})};export{j as default};
