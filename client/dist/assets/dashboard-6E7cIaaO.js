import{T as d,r as c,l,j as s,A as h,B as x,F as m,H as g,m as j}from"./index-srFotWFE.js";import{B as u}from"./Charts-IGcHOlpk.js";import{d as o}from"./data-kE7BKcmp.js";const v=[{Header:"Id",accessor:"_id"},{Header:"Quantity",accessor:"quantity"},{Header:"Discount",accessor:"discount"},{Header:"Amount",accessor:"amount"},{Header:"Status",accessor:"status"}],b=({data:a=[]})=>d(v,a,"transaction-box","Top Transaction")(),p="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp",H=()=>{const[a,n]=c.useState([]);c.useEffect(()=>{try{l.get("/order/monthlyStats").then(e=>{n(e.data.monthlyRevenue)})}catch(e){console.error(e)}},[]),console.log(a);const r=a&&a.length>0?a.pop():void 0;return s.jsxs("div",{className:"admin-container",children:[s.jsx(h,{}),s.jsxs("main",{className:"dashboard",children:[s.jsxs("div",{className:"bar",children:[s.jsx(x,{}),s.jsx("input",{type:"text",placeholder:"Search for data, users, docs"}),s.jsx(m,{}),s.jsx("img",{src:p,alt:"User"})]}),s.jsxs("section",{className:"widget-container",children:[s.jsx(t,{percent:40,amount:!0,value:r,heading:"Revenue",color:"rgb(0, 115, 255)"}),s.jsx(t,{percent:-14,value:400,color:"rgb(0 198 202)",heading:"Users"}),s.jsx(t,{percent:80,value:23e3,color:"rgb(255 196 0)",heading:"Transactions"}),s.jsx(t,{percent:30,value:1e3,color:"rgb(76 0 255)",heading:"Products"})]}),s.jsxs("section",{className:"graph-container",children:[s.jsxs("div",{className:"revenue-chart",children:[s.jsx("h2",{children:"Revenue & Transaction"}),s.jsx(u,{data_2:a,data_1:[200,444,343,556,778,455],title_1:"Revenue",title_2:"Transaction",bgColor_1:"rgb(0, 115, 255)",bgColor_2:"rgba(53, 162, 235, 0.8)"})]}),s.jsxs("div",{className:"dashboard-categories",children:[s.jsx("h2",{children:"Inventory"}),s.jsx("div",{children:o.categories.map(e=>s.jsx(y,{value:e.value,heading:e.heading,color:`hsl(${e.value*4}, ${e.value}%, 50%)`},e.heading))})]})]}),s.jsx("section",{className:"transaction-container",children:s.jsx(b,{data:o.transaction})})]})]})},t=({heading:a,value:n,percent:r,color:e,amount:i=!1})=>s.jsxs("article",{className:"widget",children:[s.jsxs("div",{className:"widget-info",children:[s.jsx("p",{children:a}),s.jsx("h4",{children:i?`₹${n}`:n}),r>0?s.jsxs("span",{className:"green",children:[s.jsx(g,{})," +",r,"%"," "]}):s.jsxs("span",{className:"red",children:[s.jsx(j,{})," ",r,"%"," "]})]}),s.jsx("div",{className:"widget-circle",style:{background:`conic-gradient(
        ${e} ${Math.abs(r)/100*360}deg,
        rgb(255, 255, 255) 0
      )`},children:s.jsxs("span",{style:{color:e},children:[r,"%"]})})]}),y=({color:a,value:n,heading:r})=>s.jsxs("div",{className:"category-item",children:[s.jsx("h5",{children:r}),s.jsx("div",{children:s.jsx("div",{style:{backgroundColor:a,width:`${n}%`}})}),s.jsxs("span",{children:[n,"%"]})]});export{H as default};