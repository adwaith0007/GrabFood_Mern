import{r,i as o,_ as d,j as e,A as g,B as x,F as j}from"./index-PMf8wB1j.js";import{B as p}from"./Charts-z3KXHYM_.js";const f="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp",b=()=>{const[s,c]=r.useState([]),[n,l]=r.useState([]),[h,u]=r.useState([]);r.useEffect(()=>{o.get("/admin/customers").then(a=>{a.data.success?l(a.data.data):d.error("Error while loading data")}).catch(a=>{d.error("Error while loading data"),console.log(a)})},[]),r.useEffect(()=>{(async()=>{try{const t=await o.get("/product/get");t.data.success&&u(t.data.data)}catch(t){console.error("Error while loading products",t)}})()},[]),r.useEffect(()=>{(async()=>{try{const t=await o.get("/order/monthlyStats");c(t.data.monthlyRevenue)}catch(t){console.error(t)}})()},[]),console.log("mr:",s);const m=s&&s.length>0?s.pop():void 0;return e.jsxs("div",{className:"admin-container",children:[e.jsx(g,{}),e.jsxs("main",{className:"dashboard",children:[e.jsxs("div",{className:"bar",children:[e.jsx(x,{}),e.jsx("input",{type:"text",placeholder:"Search for data, users, docs"}),e.jsx(j,{}),e.jsx("img",{src:f,alt:"User"})]}),e.jsxs("section",{className:"widget-container",children:[e.jsx(i,{amount:!0,value:m,heading:"Revenue"}),e.jsx(i,{value:n.length,heading:"Users"}),e.jsx(i,{value:h.length,heading:"Products"})]}),e.jsx("section",{className:"graph-container",children:e.jsxs("div",{className:"revenue-chart",children:[e.jsx("h2",{children:"Revenue & Transaction"}),e.jsx(p,{data_2:s,data_1:[0,0,0,2071,1030],title_1:"Revenue",title_2:"Transaction",bgColor_1:"rgb(0, 115, 255)",bgColor_2:"rgba(53, 162, 235, 0.8)"})]})})]})]})},i=({heading:s,value:c,amount:n=!1})=>e.jsx("article",{className:"widget",children:e.jsxs("div",{className:"widget-info",children:[e.jsx("p",{children:s}),e.jsx("h4",{children:n?`₹${c}`:c})]})});export{b as default};
