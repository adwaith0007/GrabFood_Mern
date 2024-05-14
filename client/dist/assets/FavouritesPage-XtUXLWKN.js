import{u as N,r,j as e,T as k,U as P,i,_ as c}from"./index-OHPKI3E0.js";const C="http://localhost:5000",F=[{Header:e.jsx("div",{className:"flex justify-center ",children:"Item"}),accessor:"item"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Product Name"}),accessor:"productName"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Unit Price"}),accessor:"unitPrice"},{Header:e.jsx("div",{className:"flex justify-center ",children:"Action"}),accessor:"action"}],R=()=>{const{user:u}=N(s=>s.userReducer),o=u._id,[m,f]=r.useState([]),[n,l]=r.useState([]),[d,x]=r.useState(null),[h,a]=r.useState(!1),[v,g]=r.useState();r.useEffect(()=>{const s=t=>{t.target.closest(".dropdown")||x(null)};return d!==null&&document.addEventListener("mousedown",s),()=>{document.removeEventListener("mousedown",s)}},[d]);const p=s=>{i.put(`/cart/add/wishlist/${o}`,{productId:s,quantity:1}).then(t=>{console.log("Product added to cart:",t.data),c.success("Product added to cart successfully"),l(t.data.data)}).catch(t=>{console.error("Error adding to cart:",t),c.error("Failed to add product to cart. Please try again later.")})},j=s=>{a(!0),g(s)},w=async()=>{await i.put(`/wishlist/remove/${o}`,{selectedProductId:v,quantity:1}).then(s=>{console.log("Product removed from Favorites:",s.data),c.success("Product removed from Favorites successfully"),l(s.data.data),a(!1)}).catch(s=>{console.error("Error removing from Favorites:",s),c.error("Failed to remove product from Favorites. Please try again later.")})},y=async()=>{try{const s=await i.get(`/user/${o}/wishlist`);s.data.success?l(s.data.data):console.error("Failed to fetch user orders:",s.data.error)}catch(s){console.error("Error fetching user orders:",s)}};console.log("data:",n),r.useEffect(()=>{y()},[o]),r.useEffect(()=>{const s=n.map(t=>({item:e.jsx("img",{className:"flex justify-center",src:`${C}/${t==null?void 0:t.productImage}`}),productName:e.jsx("div",{className:"flex flex-col justify-center gap-1",children:e.jsxs("div",{className:"flex justify-center",children:[" ",t==null?void 0:t.productName]})}),unitPrice:e.jsxs("div",{className:"flex justify-center",children:["₹",t!=null&&t.discountPrice?t.discountPrice:t.price]}),action:e.jsx("div",{className:" flex justify-center   ",children:e.jsx("div",{className:"flex justify-center flex-col",children:e.jsxs("div",{className:"py-1 flex gap-3 ",role:"none",children:[e.jsx("button",{className:"flex gap-3  w-36  border rounded justify-center bg-black text-white  py-3 text-sm hover:bg-gray-100 hover:text-gray-900",role:"menuitem",onClick:()=>p(t.productId),children:e.jsx("span",{children:"Add To Cart"})}),e.jsx("button",{className:"  flex border w-36  rounded justify-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",role:"menuitem",onClick:()=>j(t.productId),children:e.jsx("span",{children:"Remove "})})]})})},t._id)}));f(s)},[n,d]);const b=k(F,m,"dashboard-product-box","Products")();return e.jsxs("div",{className:"admin-container",children:[e.jsx(P,{}),e.jsx("main",{children:b}),h&&e.jsx("div",{className:"fixed z-10 inset-0 overflow-y-auto bg-opacity-35 bg-black flex items-center justify-center",children:e.jsxs("div",{className:"inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6",role:"dialog","aria-modal":"true","aria-labelledby":"modal-headline",children:[e.jsx("div",{className:"hidden sm:block absolute top-0 right-0 pt-4 pr-4",children:e.jsxs("button",{onClick:()=>a(!1),type:"button","data-behavior":"cancel",className:"bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:[e.jsx("span",{className:"sr-only",children:"Close"}),e.jsx("svg",{className:"h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:e.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})})]})}),e.jsxs("div",{className:"sm:flex sm:items-start",children:[e.jsx("div",{className:"mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10",children:e.jsx("svg",{className:"h-6 w-6 text-blue-600",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true",children:e.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),e.jsx("div",{className:"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left",children:e.jsxs("h3",{className:"text-lg leading-6 font-medium text-gray-900",id:"modal-headline",children:["Are you sure you want remove ",e.jsx("br",{})," from Favorites"]})})]}),e.jsxs("div",{className:"mt-5 sm:mt-4 sm:flex sm:flex-row-reverse",children:[e.jsx("button",{onClick:()=>w(),type:"button","data-behavior":"commit",className:"w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm",children:"Remove"}),e.jsx("button",{onClick:()=>a(!1),type:"button","data-behavior":"cancel",className:"mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm",children:"Cancel"})]})]})})]})};export{R as default};
