import{j as e,u as I,b as C,a as q,r as u,g as k,L as g,i as h,l as x,_ as y,f as E,h as Q,v as $}from"./index-tC-h3qrC.js";const P="https://www.grabfood.life",R=({products:f,onIncrease:d,onDecrease:i,onDeleteFromCart:m})=>e.jsx("div",{className:"w-full",children:f.map(s=>{var o;return e.jsx("div",{children:e.jsxs("div",{className:"flex justify-between items-center hover:bg-gray-100 md:-mx-8 md:px-6 py-5",children:[e.jsxs("div",{className:"flex w-2/5",children:[e.jsx("div",{className:"w-24 hidden md:block ",children:e.jsx("img",{className:"h-24 w-24",src:`${P}/${(o=s.productImage[0])==null?void 0:o.replace(/ /g,"%20")}`,alt:s.name})}),e.jsxs("div",{className:"flex flex-col justify-center ml-4 flex-grow",children:[e.jsx("span",{className:"font-bold text-[12px] md:text-sm mb-2 md:mb-5",children:s.productName}),e.jsxs("span",{className:"text-center block md:hidden mb-2 w-1/5 font-semibold text-[12px] md:text-sm",children:["₹",s.price.toFixed(2)]}),e.jsx("button",{className:"font-semibold hover:text-red-500 text-gray-500 text-xs w-fit ",onClick:()=>m(s),children:"Remove"})]})]}),e.jsxs("div",{className:"flex justify-center w-1/5",children:[e.jsx("button",{onClick:()=>i(s),children:e.jsx("svg",{className:"fill-current text-gray-600 w-3",viewBox:"0 0 448 512",children:e.jsx("path",{d:"M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"})})}),e.jsx("input",{className:"mx-2 border text-center w-10",type:"text",value:s.quantity}),e.jsx("button",{onClick:()=>d(s),children:e.jsx("svg",{className:"fill-current text-gray-600 w-3  ",viewBox:"0 0 448 512",children:e.jsx("path",{d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"})})})]}),e.jsxs("span",{className:"text-center hidden md:block w-1/5 font-semibold text-[12px] md:text-sm",children:["₹",s.price.toFixed(2)]}),e.jsxs("span",{className:"text-center w-1/5 font-semibold text-[12px] md:text-sm",children:["₹",s.quantity*s.price]})]})},s._id)})}),D=()=>{const{user:f}=I(t=>t.userReducer),d=f._id,i=C(),m=q(),[s,o]=u.useState([]),[p,b]=u.useState(!0);u.useEffect(()=>{(async()=>{var a,n,l,c;try{const r=await h.get(`/cart/${d}`);o(r.data.cart),x.debug("new Cart items:",r.data.cart)}catch(r){console.error("Error fetching cart items:",r),y.error(((n=(a=r.response)==null?void 0:a.data)==null?void 0:n.message)||"An error occurred"),((c=(l=r.response)==null?void 0:l.data)==null?void 0:c.message)==="User is blocked"&&(E.remove("token"),i(Q()),m("/login"))}finally{b(!1)}})()},[d,i,m]),u.useEffect(()=>{s.length>0&&s.forEach(t=>{i(k({name:t.name,productId:t.productId,price:t.price,quantity:t.quantity}))})},[s,i]);const v=t=>{const n=s.find(l=>l.productId===t.productId);if(n){if(n.quantity+1>5){y.error("Cannot add more than 5 items to the cart.");return}const c=s.map(r=>r.productId===t.productId?{...r,quantity:r.quantity+1}:r);o(c),h.post(`/cart/add/${d}`,{product:t,quantity:1}).then(r=>x.debug("Product added to cart:",r.data)).catch(r=>console.error("Error adding to cart:",r))}},w=t=>{x.debug("Product to decrease:",t);const a=s.find(n=>n.productId===t.productId);if(!(a&&a.quantity<=1))if(a&&a.quantity>1){const n=a.quantity-1,l=s.map(c=>c.productId===t.productId?{...c,quantity:n}:c);o(l),h.post(`/cart/decrease/${d}`,{product:t,quantity:1}).then(c=>x.debug("Product decreased in cart:",c.data)).catch(c=>console.error("Error decreasing product in cart:",c))}else a&&a.quantity===1&&j(t)},j=async t=>{try{const a=await h.post(`/cart/remove/${d}`,{product:t});x.debug("Remove from cart response:",a.data),a.data.success?(o(a.data.cartItems),i($({productId:t.productId}))):console.error("Remove from cart failed:",a.data.message)}catch(a){console.error("Error deleting from cart:",a)}},N=s.reduce((t,a)=>t+a.price*a.quantity,0);return e.jsx("div",{className:"flex w-full",children:e.jsx("div",{className:"container mx-auto ",children:e.jsx("div",{className:"flex shadow-md ",children:e.jsxs("div",{className:"w-full bg-white px-10 py-10",children:[e.jsxs("div",{className:"flex justify-between border-b pb-8",children:[e.jsx("h1",{className:"font-semibold text-2xl",children:"Shopping Cart"}),e.jsxs("h2",{className:"font-semibold text-2xl",children:[s.length," Items"]})]}),e.jsxs("div",{className:"flex mt-10 mb-5",children:[e.jsx("h3",{className:"font-semibold text-gray-600 text-xs uppercase w-2/5",children:"Product Details"}),e.jsx("h3",{className:"font-semibold text-gray-600 text-xs uppercase w-1/5 text-center",children:"Quantity"}),e.jsx("h3",{className:"font-semibold text-gray-600 text-xs uppercase w-1/5 text-center",children:"Price"}),e.jsx("h3",{className:"font-semibold text-gray-600 text-xs uppercase w-1/5 text-center",children:"Total"})]}),!p&&s.length>0?e.jsx(R,{products:s,onDeleteFromCart:t=>j(t),onIncrease:t=>v(t),onDecrease:t=>w(t)}):e.jsx("p",{children:p?"Loading...":"Your cart is empty"}),e.jsxs("div",{className:"flex flex-col-reverse md:flex-row md:justify-between border-t ",children:[e.jsx("div",{children:e.jsx(g,{to:"/menu",className:"flex font-semibold text-indigo-600 text-sm mt-10 w-fit ",children:"Continue Shopping"})}),e.jsx("div",{className:"",children:e.jsx("div",{className:" md:w-[320px]   ",children:e.jsxs("div",{className:"flex font-semibold justify-between py- mt-10 text-sm uppercase",children:[e.jsx("span",{children:"Total cost"}),e.jsxs("span",{children:["₹",N]})]})})})]}),e.jsx("div",{className:"w-full  mt-10 flex justify-end  text-center ",children:(s==null?void 0:s.length)>0&&e.jsx(g,{to:"/checkout",className:"bg-indigo-500 font-semibold w-[300px] hover:bg-indigo-600 py-3 px-3 text-sm text-white uppercase ",children:"Checkout"})})]})})})})};export{D as default};