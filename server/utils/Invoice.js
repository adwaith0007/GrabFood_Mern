module.exports = ({
  name,
  phone,
  paymentMethod,
  orderDate,
  totalPrice,
  receiptId,
  products,
  address,
}) => {
  const today = new Date();
  return `
<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Invoice</title>
 <link rel="stylesheet" href="style.css" type="text/css" media="all" />
 <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>

<body>
 <div class="py-4">
   <div class="px-14 py-6">
     <table class="w-full border-collapse border-spacing-0">
       <tbody>
         <tr>
           <td class="w-full align-top">
             <div>
               <img src="https://raw.githubusercontent.com/templid/email-templates/main/templid-dynamic-templates/invoice-02/brand-sample.png" class="h-12" />
             </div>
           </td>
           <td class="align-top">
             <div class="text-sm">
               <table class="border-collapse border-spacing-0">
                 <tbody>
                   <tr>
                     <td class="border-r pr-4">
                       <div>
                         <p class="whitespace-nowrap text-slate-400 text-right">Date</p>
                         <p class="whitespace-nowrap font-bold text-main text-right">${orderDate}</p>
                       </div>
                     </td>
                     <td class="pl-4">
                       <div>
                         <p class="whitespace-nowrap text-slate-400 text-right">Invoice #</p>
                         <p class="whitespace-nowrap font-bold text-main text-right">${receiptId}</p>
                       </div>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>
           </td>
         </tr>
       </tbody>
     </table>
   </div>

   <div class="bg-slate-100 px-14 py-6 text-sm">
     <table class="w-full border-collapse border-spacing-0">
       <tbody>
         <tr>
           <td class="w-1/2 align-top">
             <div class="text-sm text-neutral-600">
               <p class="font-bold">Supplier Company INC</p>
               <p>Name: ${name}</p>
               <p>Phone: ${phone}</p>
               <!-- Assuming address is an object -->
               <p>VAT: ${address.vat}</p>
               <p>${address.street}</p>
               <p>${address.city}, ${address.state}, ${address.zipCode}</p>
               <p>${address.country}</p>
             </div>
           </td>
           <td class="w-1/2 align-top text-right">
             <div class="text-sm text-neutral-600">
               <p class="font-bold">Customer Company</p>
               <p>Phone: ${phone}</p>
               <p>VAT: ${address.vat}</p>
               <!-- Assuming address is an object -->
               <p>${address.street}</p>
               <p>${address.city}, ${address.state}, ${address.zipCode}</p>
               <p>${address.country}</p>
             </div>
           </td>
         </tr>
       </tbody>
     </table>
   </div>

   <div class="px-14 py-10 text-sm text-neutral-700">
     <table class="w-full border-collapse border-spacing-0">
       <thead>
         <tr>
           <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">#</td>
           <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Product details</td>
           <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Price</td>
           <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">Qty.</td>
           <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main">VAT</td>
           <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Subtotal</td>
           <td class="border-b-2 border-main pb-3 pl-2 pr-3 text-right font-bold text-main">Subtotal + VAT</td>
         </tr>
       </thead>
       <tbody>
         ${products
           .map(
             (product, index) => `
           <tr>
             <td class="border-b py-3 pl-3">${index + 1}.</td>
             <td class="border-b py-3 pl-2">${product.productName}</td>
             <td class="border-b py-3 pl-2 text-right">$${product.price.toFixed(
               2
             )}</td>
             <td class="border-b py-3 pl-2 text-center">${product.quantity}</td>
             <td class="border-b py-3 pl-2 text-center">${product.vat}%</td>
             <td class="border-b py-3 pl-2 text-right">$${(
               product.price * product.quantity
             ).toFixed(2)}</td>
             <td class="border-b py-3 pl-2 pr-3 text-right">$${(
               product.price *
               product.quantity *
               (1 + product.vat / 100)
             ).toFixed(2)}</td>
           </tr>
         `
           )
           .join("")}
         
            <tr>
              <td colspan="7">
                <table class="w-full border-collapse border-spacing-0">
                  <tbody>
                    <tr>
                      <td class="w-full"></td>
                      <td>
                        <table class="w-full border-collapse border-spacing-0">
                          <tbody>
                            <tr>
                              <td class="border-b p-3">
                                <div class="whitespace-nowrap text-slate-400">Net total:</div>
                              </td>
                              <td class="border-b p-3 text-right">
                                <div class="whitespace-nowrap font-bold text-main">$320.00</div>
                              </td>
                            </tr>
                            <tr>
                              <td class="p-3">
                                <div class="whitespace-nowrap text-slate-400">VAT total:</div>
                              </td>
                              <td class="p-3 text-right">
                                <div class="whitespace-nowrap font-bold text-main">$64.00</div>
                              </td>
                            </tr>
                            <tr>
                              <td class="bg-main p-3">
                                <div class="whitespace-nowrap font-bold text-white">Total:</div>
                              </td>
                              <td class="bg-main p-3 text-right">
                                <div class="whitespace-nowrap font-bold text-white">$384.00</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-14 text-sm text-neutral-700">
        <p class="text-main font-bold">PAYMENT DETAILS</p>
        <p>Banks of Banks</p>
        <p>Bank/Sort Code: 1234567</p>
        <p>Account Number: 123456678</p>
        <p>Payment Reference: BRA-00335</p>
      </div>

      <div class="px-14 py-10 text-sm text-neutral-700">
        <p class="text-main font-bold">Notes</p>
        <p class="italic">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries
          for previewing layouts and visual mockups.</p>
        </dvi>

        <footer class="fixed bottom-0 left-0 bg-slate-100 w-full text-neutral-600 text-center text-xs py-3">
          Supplier Company
          <span class="text-slate-300 px-2">|</span>
          info@company.com
          <span class="text-slate-300 px-2">|</span>
          +1-202-555-0106
        </footer>
      </div>
    </div>
</body>

</html>
    `;
};
