import{r as l,j as e,C as f,l as S,u as k,k as y}from"./index-YJK9wbQ5.js";const F=({userId:r,setAddress:b,onClose:t})=>{const[o,u]=l.useState(""),[x,i]=l.useState(""),[h,p]=l.useState(""),[s,n]=l.useState(""),c=async a=>{a.preventDefault();const m={street:o,city:x,state:h,zipCode:s};try{if(!r){console.error("User ID is undefined");return}await S.put(`/addaddresses/${r}`,{userId:r,address:m}),b(m)}catch(j){console.error(j)}};return e.jsx("div",{className:"fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"bg-white p-8 z-50 rounded-md shadow-md w-[400px]",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:t,className:"text-gray-600 hover:text-gray-800",children:e.jsx(f,{size:24})})}),e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Enter Your Address "}),e.jsxs("form",{onSubmit:c,children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"street",className:"block text-sm font-medium text-gray-600",children:"Street:"}),e.jsx("input",{type:"text",id:"street",value:o,onChange:a=>u(a.target.value),onBlur:c,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"city",className:"block text-sm font-medium text-gray-600",children:"City:"}),e.jsx("input",{type:"text",id:"city",value:x,onChange:a=>i(a.target.value),onBlur:c,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"state",className:"block text-sm font-medium text-gray-600",children:"State:"}),e.jsx("input",{type:"text",id:"state",value:h,onChange:a=>p(a.target.value),onBlur:c,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"zipCode",className:"block text-sm font-medium text-gray-600",children:"ZIP Code:"}),e.jsx("input",{type:"text",id:"zipCode",value:s,onChange:a=>n(a.target.value),onBlur:c,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsx("button",{type:"submit",className:"mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",children:"Save Address"})]})]})})},D=({onClose:r,onAddressSelect:b})=>{const{user:t}=k(s=>s.userReducer),o=t._id,[u,x]=l.useState([]),[i,h]=l.useState(null);l.useEffect(()=>{o&&y.get(`http://localhost:5000/api/user/${o}/addresses`).then(s=>{x(s.data)}).catch(s=>{console.error(s)})},[o]);const p=s=>{s.preventDefault(),i&&(b(i),r()),console.log(i)};return e.jsx("div",{className:"fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"bg-white p-8 z-50 rounded-md shadow-md w-[400px]",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:r,className:"text-gray-600 hover:text-gray-800",children:e.jsx(f,{size:24})})}),e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Choose Your Address"}),e.jsxs("form",{onSubmit:p,className:"mt-5 grid gap-6",children:[u.map((s,n)=>e.jsxs("div",{className:"relative",children:[e.jsx("input",{className:"peer hidden",id:`radio_${n}`,type:"radio",name:"radio",onChange:()=>h(s)}),e.jsx("span",{className:"peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"}),e.jsx("label",{className:"peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4",htmlFor:`radio_${n}`,children:e.jsxs("div",{className:"ml-5",children:[e.jsx("span",{className:"mt-2 font-semibold",children:s.street}),e.jsx("p",{className:"text-slate-500 text-sm leading-6",children:"Delivery: 2-4 Days"})]})})]},n)),e.jsx("button",{type:"submit",className:"mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600",children:"Save Address"})]})]})})},A=({userId:r,onhandleUpdateAddress:b,currentAddress:t,onClose:o})=>{const[u,x]=l.useState(t.street||""),[i,h]=l.useState(t.city||""),[p,s]=l.useState(t.state||""),[n,c]=l.useState(t.zipCode||""),[a,m]=l.useState(!1),[j,N]=l.useState(null),g=async d=>{d.preventDefault();const v={street:u,city:i,state:p,zipCode:n};try{if(m(!0),!r){console.error("User ID is undefined");return}await y.put(`http://localhost:5000/api/user/${r}/addresses/${t._id}`,{userId:r,addressId:t._id,address:v}),b(v),o()}catch(w){console.error(w),N("Failed to update address. Please try again.")}finally{m(!1)}},C=async()=>{try{m(!0),await y.delete(`http://localhost:5000/api/user/${r}/addresses/${t._id}`),o()}catch(d){console.error(d),N("Failed to delete address. Please try again.")}finally{m(!1)}};return e.jsx("div",{className:"fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center",children:e.jsxs("div",{className:"bg-white p-8 z-50 rounded-md shadow-md w-[400px]",children:[e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:o,className:"text-gray-600 hover:text-gray-800",children:e.jsx(f,{size:24})})}),e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Update Your Address "}),j&&e.jsx("p",{className:"text-red-500 mb-2",children:j}),e.jsxs("form",{onSubmit:g,children:[e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"street",className:"block text-sm font-medium text-gray-600",children:"Street:"}),e.jsx("input",{type:"text",id:"street",placeholder:t.street,value:u,onChange:d=>x(d.target.value),onBlur:g,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"city",className:"block text-sm font-medium text-gray-600",children:"City:"}),e.jsx("input",{type:"text",id:"city",value:i,placeholder:t.city,onChange:d=>h(d.target.value),onBlur:g,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"state",className:"block text-sm font-medium text-gray-600",children:"State:"}),e.jsx("input",{type:"text",id:"state",placeholder:t.state,value:p,onChange:d=>s(d.target.value),onBlur:g,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"mb-2",children:[e.jsx("label",{htmlFor:"zipCode",className:"block text-sm font-medium text-gray-600",children:"ZIP Code:"}),e.jsx("input",{type:"text",id:"zipCode",placeholder:t.zipCode,value:n,onChange:d=>c(d.target.value),onBlur:g,className:"mt-1 p-2 border rounded-md w-full"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("button",{type:"submit",className:"mt-4 p-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600",disabled:a,children:a?"Updating...":"Update Address"}),e.jsx("button",{type:"button",onClick:C,className:"mt-4 p-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2",disabled:a,children:a?"Deleting...":"Delete Address"})]})]})]})})};export{F as A,D as C,A as U};
