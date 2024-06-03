import{u as N,b as g,a as b,r,g as w,j as e,L as x,i as y,_ as L,f as _,h as E}from"./index-tC-h3qrC.js";const f="/assets/food_s1-VtsyvGrE.png",a="/assets/s2_1-85qB9-DL.png",k="/assets/s2_2-v-2gL0KK.png",u="/assets/s3-p2BBmOFi.png",t="/assets/s4_1-ckYvv_s5.png",D=()=>{const{user:d}=N(s=>s.userReducer),n=d==null?void 0:d._id,c=g(),o=b(),[l,v]=r.useState([]);return r.useEffect(()=>{(async()=>{var m,p,h,j;try{const i=await y.get(`/cart/${n}`);v(i.data.cart)}catch(i){console.error("Error fetching cart items:",i),(d==null?void 0:d.role)=="user"&&L.error(((p=(m=i.response)==null?void 0:m.data)==null?void 0:p.message)||"An error occurred"),((j=(h=i.response)==null?void 0:h.data)==null?void 0:j.message)==="User is blocked"&&(_.remove("token"),c(E()),o("/login"))}})()},[n,c,o]),r.useEffect(()=>{(l==null?void 0:l.length)>0&&l.forEach(s=>{c(w({name:s.name,productId:s.productId,price:s.price,quantity:s.quantity}))})},[l,c]),e.jsx("div",{className:" bg-[#e5d9ca] w-full ",children:e.jsxs("div",{className:"container mx-auto px-4 py-10 xl:px-0",children:[e.jsxs("div",{className:"  max-w-screen-xl md:mx-auto px-4 py-10 xl:px-0 flex justify-center items-center ",children:[e.jsxs("div",{className:"text-center md:text-left mb-10",children:[e.jsx("div",{className:" hidden md:block text-[20px] md:text-[50px]  md:leading-[60px] lg:leading-[60px] font-bold mb-3 xl:mb-10",children:e.jsxs("h1",{children:["Food you love,",e.jsx("br",{})," delivered to you"]})}),e.jsx("div",{className:" md:hidden text-[20px] sm:text-[30px] md:text-[60px] md:leading-[80px] font-bold mb-3 xl:mb-10",children:e.jsx("h1",{children:"Food you love, delivered to you"})}),e.jsx("div",{className:" hidden md:block mb-10 w-[400px] lg:w-[560px] ",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in lorem augue. Cras facilisis lacus nibh, volutpat varius neque imperdiet sit amet."})}),e.jsx("div",{className:"md:hidden flex justify-center items-center mr-3 ",children:e.jsx("div",{children:e.jsx("img",{className:"",src:f})})}),e.jsx("div",{children:e.jsx(x,{to:"/menu",className:" border bg-[#ff9e39] font-semibold px-10 py-2 rounded-[50px] ",children:"Explore Menu"})})]}),e.jsx("div",{className:" hidden md:block ",children:e.jsx("img",{src:f})})]}),e.jsx("div",{className:"h-[30vh]  hidden  ",children:e.jsxs("div",{className:"flex xl:flex-row flex-col gap-[20px] xl:gap-[200px] ",children:[e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[470px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-20 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Enjoy your Organic Food"})}),e.jsx("div",{children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsx("div",{children:e.jsx(x,{to:"/menu",className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Order Now"})})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px] absolute left-[350px]  ",src:a})})]}),e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[470px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-20 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Enjoy your Dellcious Food"})}),e.jsx("div",{children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsx("div",{children:e.jsx(x,{to:"/menu",className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Order Now"})})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px]  absolute left-[350px]  ",src:k})})]})]})}),e.jsx("div",{className:"  max-w-screen-xl md:mx-auto px-4 py-10 xl:px-0 flex justify-center items-center ",children:e.jsxs("div",{className:"flex flex-col md:flex-row w-full  mt-3 md:gap-[30px] lg:gap-[100px] ",children:[e.jsx("div",{className:"hidden md:block",children:e.jsx("img",{className:" sm:h-auto md:h-auto xl:h-[500px] w-full object-cover ",src:u,alt:"s3"})}),e.jsxs("div",{className:"mt-5 flex flex-col items-center md:items-start ",children:[e.jsx("div",{className:" text-[20px] md:text-[40px] text-center md:text-left font-bold ",children:e.jsx("h3",{children:"We Deliver Anywhere"})}),e.jsx("div",{className:"block md:hidden mt-4",children:e.jsx("img",{className:"h-[300px]  w-full object-cover",src:u,alt:"s3"})}),e.jsx("div",{className:"w-full md:w-[450px] mt-5",children:e.jsx("p",{className:"text-center md:text-left",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in lorem augue. Cras facilisis lacus nibh, volutpat varius neque imperdiet sit amet."})}),e.jsx("div",{className:"flex gap-5 mt-5",children:e.jsx("div",{children:e.jsx(x,{to:"/menu",className:"border bg-[#ffb73a] font-medium px-6 py-2 rounded-[50px]",children:"Order Now"})})})]})]})}),e.jsxs("div",{className:"h-[100vh] hidden",children:[e.jsx("div",{className:"text-[40px] font-bold ",children:e.jsxs("h3",{className:"text-center",children:["We Offer You ",e.jsx("br",{})," Different Tastes"]})}),e.jsxs("div",{className:"flex gap-5 mt-7 ",children:[e.jsxs("div",{className:"bg-[#ff9e39] w-[250px] h-[307px] rounded-[20px] ",children:[e.jsx("div",{className:"flex justify-center mt-5",children:e.jsxs("button",{className:"flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ",children:[e.jsx("img",{src:t}),"Salads"]})}),e.jsx("div",{className:"flex justify-center mt-5",children:e.jsxs("button",{className:"flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ",children:[e.jsx("img",{src:t}),"Dessert"]})}),e.jsx("div",{className:"flex justify-center mt-5",children:e.jsxs("button",{className:"flex bg-[#efe3d3] rounded-[40px] font-medium shadow gap-7  items-center pl-2 pr-20 py-2 ",children:[e.jsx("img",{src:t}),"Drinks"]})})]}),e.jsxs("div",{className:" hidden lg:grid  lg:grid-cols-2 w-[955px] gap-4   ",children:[e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-5 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Grilled Vegetables"})}),e.jsx("div",{className:"w-[200px]",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{children:e.jsx("h3",{className:" font-semibold px-6 py-2 rounded-[50px]",children:"₹450"})}),e.jsx("div",{children:e.jsx("button",{className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Add To Cart"})})]})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px] absolute left-[230px]  ",src:a})})]}),e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-5 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Grilled Vegetables"})}),e.jsx("div",{className:"w-[200px]",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{children:e.jsx("h3",{className:" font-semibold px-6 py-2 rounded-[50px]",children:"₹450"})}),e.jsx("div",{children:e.jsx("button",{className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Add To Cart"})})]})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px] absolute left-[230px]  ",src:a})})]}),e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-5 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Grilled Vegetables"})}),e.jsx("div",{className:"w-[200px]",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{children:e.jsx("h3",{className:" font-semibold px-6 py-2 rounded-[50px]",children:"₹450"})}),e.jsx("div",{children:e.jsx("button",{className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Add To Cart"})})]})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px] absolute left-[230px]  ",src:a})})]}),e.jsxs("div",{className:"flex bg-[#ede8e3]  h-[200px] w-[390px] rounded-[20px] shadow relative  ",children:[e.jsxs("div",{className:" flex flex-col pl-5 gap-3 py-5 w-[340px]  ",children:[e.jsx("div",{className:"",children:e.jsx("h3",{className:"text-[20px] font-semibold ",children:"Grilled Vegetables"})}),e.jsx("div",{className:"w-[200px]",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."})}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{children:e.jsx("h3",{className:" font-semibold px-6 py-2 rounded-[50px]",children:"₹450"})}),e.jsx("div",{children:e.jsx("button",{className:"border bg-[#ff9e39] font-semibold px-6 py-2 rounded-[50px]",children:"Add To Cart"})})]})]}),e.jsx("div",{children:e.jsx("img",{className:"h-[200px] w-[200px] absolute left-[230px]  ",src:a})})]})]})]})]})]})})};export{D as default};