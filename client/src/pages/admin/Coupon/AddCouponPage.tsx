import  { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import api from "../../../api";
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const AddCouponPage = () => {
  const navigate = useNavigate();

  // const [size, setSize] = useState<number>(8);
  const size = 8
  // const [prefix, setPrefix] = useState<string>("");
  const prefix= ""
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [couponData, setCouponData] = useState({
    couponName: "",
    description: "",
    discount: "",
    expiryDate: new Date(), // Initialize expiryDate as current date
  });

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols) {
      toast.error("Please select at least one option for characters");
      return;
    }

    if (
      !couponData.couponName.trim() ||
      !couponData.description.trim() ||
      !couponData.discount.trim()
    ) {
      toast.error("Please fill out all fields");
      return;
    }

    const couponNameRegex = /^[a-zA-Z0-9\s]*$/;
    if (!couponNameRegex.test(couponData.couponName)) {
      toast.error("Coupon name can only contain letters, numbers, and spaces");
      return;
    }

    if (couponData.couponName.trim().length < 5) {
      toast.error("Coupon name should contain at least 5 letters");
      return;
    }

    const discountValue = parseFloat(couponData.discount);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 70) {
      toast.error("Discount must be a number between 0 and 70");
      return;
    }
    const today = new Date();
    if (couponData.expiryDate < today) {
      toast.error("Please select a proper expiry date");
      return;
    }

    const getExpiryDateTime = () => {
      const currentDate = couponData.expiryDate;

      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedMonth = month < 10 ? "0" + month : month;
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedHours = hours < 10 ? "0" + hours : hours;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      const formattedDateTime = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;

      


    console.log("formattedDateTime:", formattedDateTime);
    

      return formattedDateTime;
    };

    getExpiryDateTime()

    
    


    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = Math.floor(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);

    try {
      const response = await api.post("/coupon/add", {
        couponName: couponData.couponName,
        description: couponData.description,
        discount: discountValue,
        expiryDate: couponData.expiryDate,
        formattedDateTime:getExpiryDateTime(),
        couponCode: result,
      });

      if (response.status === 201) {
        toast.success("Coupon created successfully");
        navigate("/admin/coupon");
      } else {
        toast.error("Coupon creation failed");
      }
    } catch (error) {
      toast.error("Error creating coupon");
      console.error("Error creating coupon:", error);
    }
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
              value={couponData.couponName}
              onChange={(e) =>
                setCouponData({ ...couponData, couponName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={couponData.description}
              onChange={(e) =>
                setCouponData({ ...couponData, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Discount in %"
              value={couponData.discount}
              onChange={(e) =>
                setCouponData({ ...couponData, discount: e.target.value })
              }
            />

            <div>
              <label>Expiry Date: </label>
              <DatePicker
                selected={couponData.expiryDate}
                onChange={(date: Date) =>
                  setCouponData({ ...couponData, expiryDate: date })
                }
              />
            </div>

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

export default AddCouponPage;
