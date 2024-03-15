import { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import api from '../../api';
const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const CouponPage = () => {
    const [size, setSize] = useState<number>(8);
    const [prefix, setPrefix] = useState<string>("");
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
  
    const [coupon, setCoupon] = useState<string>("");
    const [couponName, setCouponName] = useState<string>("");
    const [discount, setDiscount] = useState('');

  
    const copyText = async (coupon: string) => {
      await window.navigator.clipboard.writeText(coupon);
      setIsCopied(true);
    };
  
    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (!includeNumbers && !includeCharacters && !includeSymbols)
        return alert("Please Select One At Least");
  
      let result: string = prefix || "";
      const loopLength: number = size - result.length;
  
      for (let i = 0; i < loopLength; i++) {
        let entireString: string = "";
        if (includeCharacters) entireString += allLetters;
        if (includeNumbers) entireString += allNumbers;
        if (includeSymbols) entireString += allSymbols;
  
        const randomNum: number = ~~(Math.random() * entireString.length);
        result += entireString[randomNum];
      }
  
      setCoupon(result);


      const formData = new FormData();

      formData.append("couponName", couponName )

      formData.append("discount", discount )

      formData.append("couponCode", coupon )

      api.post('/coupon/add',formData)


    };
  
    useEffect(() => {
      setIsCopied(false);
    }, [coupon]);
  
    return (
      <div className="admin-container">
        <AdminSidebar />
        <main className="dashboard-app-container">
          <h1>Coupon</h1>
          <section>
            <form className="coupon-form" onSubmit={submitHandler}>

                
                
              <input
                type="text"
                placeholder="Coupon Name"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                maxLength={size}
              />

             

                
            {/* <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            /> */}

                <input
                type="number"
                placeholder="Discount in %"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                maxLength={size}
              />
               
  
              <fieldset>
                <legend>Include</legend>
  
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers((prev) => !prev)}
                />
                <span>Numbers</span>
  
                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((prev) => !prev)}
                />
                <span>Characters</span>
  
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((prev) => !prev)}
                />
                <span>Symbols</span>
              </fieldset>

               
              <button type="submit">Generate</button>
            </form>
  
            {coupon && (
              <code>
                {coupon}{" "}
                <span onClick={() => copyText(coupon)}>
                  {isCopied ? "Copied" : "Copy"}
                </span>{" "}
              </code>
            )}
          </section>
        </main>
      </div>
    );
  };

export default CouponPage