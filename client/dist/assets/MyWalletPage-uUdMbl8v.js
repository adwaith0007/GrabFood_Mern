import{u as m,r as a,j as e,U as y,i as o}from"./index-UXfRQDu2.js";const v=[{Header:e.jsx("div",{className:"flex justify-center ",children:"S.no"}),accessor:"no"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Date"}),accessor:"date"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Transaction"}),accessor:"transaction"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Amount"}),accessor:"amount"}],p=()=>{const{user:i}=m(s=>s.userReducer),c=i._id,[d,x]=a.useState([]),[n,u]=a.useState([]),[r,f]=a.useState();a.useEffect(()=>{(async()=>{try{const t=await o.get(`/user/${c}/wallet`);f(t.data.data)}catch(t){console.log(t)}})()},[c]),console.log("balance",r);const j=async()=>{try{const s=await o.get(`/order/${c}/transactions`);s.data.success?u(s.data.transactions):console.error("Failed to fetch user orders:",s.data.error)}catch(s){console.error("Error fetching user orders:",s)}};return console.log(n),a.useEffect(()=>{j()},[c]),a.useEffect(()=>{const s=n.map((t,l)=>({no:e.jsx("div",{className:"flex justify-center ",children:l+1}),date:e.jsx("div",{className:"flex flex-col justify-center gap-1",children:e.jsxs("div",{className:"flex justify-center",children:[" ",t==null?void 0:t.date]})}),transaction:e.jsx("div",{className:"flex justify-center",children:t.type}),amount:e.jsxs("div",{className:"flex justify-center",children:["₹",t.amount]}),totalPrice:t.totalPrice}));x(s)},[n]),e.jsxs("div",{className:"admin-container",children:[e.jsx(y,{}),e.jsx("div",{className:"table-container",style:{overflowY:"auto"},children:e.jsxs("table",{className:"table",style:{width:"100%"},children:[e.jsx("thead",{children:e.jsx("tr",{children:v.map(s=>e.jsx("th",{className:"text-center",children:s.Header},String(s.accessor)))})}),e.jsx("tbody",{children:d.map((s,t)=>e.jsx("tr",{children:Object.values(s).map((l,h)=>e.jsx("td",{className:"text-center",children:l},h))},t))}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("td",{colSpan:3,className:"  justify-center text-center",children:"Total:"}),e.jsx("td",{className:" flex justify-center text-center",children:r==null?void 0:r.toFixed(2)})]})})]})})]})};export{p as default};