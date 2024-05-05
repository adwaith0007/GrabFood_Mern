import{k as x,r as h,j as n,A as l,l as j,i}from"./index-PMf8wB1j.js";const m="https://www.grabfood.life",u=()=>{var d;const{orderId:t,productId:c}=x(),[s,o]=h.useState(null);h.useEffect(()=>{t&&c&&(async()=>{try{const p=(await i.get(`/orders/${t}/${c}`)).data;o(p),console.log(p)}catch(e){console.error("Error fetching order details:",e.response?e.response.data:e.message)}})()},[t,c]);const r=async()=>{try{await i.put(`/orders/${t}/product/${c}`,{status:"Delivered"}),o(a=>({...a,status:"Delivered"}))}catch(a){console.error("Error updating order status:",a.response?a.response.data:a.message)}};return n.jsxs("div",{className:"admin-container",children:[n.jsx(l,{}),n.jsxs("main",{className:"product-management",children:[n.jsxs("section",{style:{padding:"2rem"},children:[n.jsx("h2",{children:"Order Items"}),n.jsx(g,{name:s==null?void 0:s.productName,photo:`${m}/${s==null?void 0:s.productImage}`,quantity:s==null?void 0:s.quantity,price:s==null?void 0:s.price})]}),n.jsxs("article",{className:"shipping-info-card",children:[n.jsx("button",{className:"product-delete-btn",children:n.jsx(j,{})}),n.jsx("h1",{children:"Order Info"}),n.jsx("h5",{children:"User Info"}),n.jsxs("p",{children:["Name: ",s==null?void 0:s.userName]}),n.jsxs("p",{children:["Address: ",(d=s==null?void 0:s.address[0])==null?void 0:d.street]}),n.jsx("h5",{children:"Amount Info"}),n.jsxs("p",{children:["Subtotal: ",s==null?void 0:s.subtotal]}),n.jsxs("p",{children:["Shipping Charges: ",s==null?void 0:s.shippingCharges]}),n.jsxs("p",{children:["Tax: ",s==null?void 0:s.tax]}),n.jsxs("p",{children:["Discount: ",s==null?void 0:s.discount]}),n.jsxs("p",{children:["Total: ",s==null?void 0:s.total]}),n.jsx("h5",{children:"Status Info"}),n.jsxs("p",{children:["Status:"," ",n.jsx("span",{className:(s==null?void 0:s.status)==="Delivered"?"purple":(s==null?void 0:s.status)==="Shipped"?"green":"red",children:s==null?void 0:s.status})]}),n.jsx("button",{className:"shipping-btn",onClick:r,children:"Process Status"})]})]})]})},g=({name:t,photo:c,price:s,quantity:o})=>n.jsxs("div",{className:"transaction-product-card",children:[n.jsx("img",{src:c,alt:t}),n.jsxs("span",{children:["₹",s," X ",o," = ₹",s*o]})]});export{u as default};
