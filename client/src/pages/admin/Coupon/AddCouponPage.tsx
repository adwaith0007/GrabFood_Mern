import React, { FormEvent, useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import api from '../../../api';
import DatePicker from "react-datepicker"; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const AddCouponPage = () => {
    const [size, setSize] = useState<number>(8);
    const [prefix, setPrefix] = useState<string>("");
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
    const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<string>("");
    const [couponData, setCouponData] = useState({
        couponName: '',
        description: '',
        discount: '',
        expiryDate: new Date() // Initialize expiryDate as current date
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

        if (!couponData.couponName.trim() || !couponData.description.trim() || !couponData.discount.trim()) {
            toast.error("Please fill out all fields");
            return;
        }

        const discountValue = parseFloat(couponData.discount);
        if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
            toast.error("Discount must be a number between 0 and 100");
            return;
        }

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

        // Send coupon data to the backend
        try {
            const response = await api.post('/coupon/add', {
                couponName: couponData.couponName,
                description: couponData.description,
                discount: discountValue,
                expiryDate: couponData.expiryDate, // Include expiryDate in the request
                couponCode: result // You may want to send the generated coupon code to the backend
            });

            if (response.status === 201) {
                toast.success('Coupon created successfully');
                // Handle success, like showing a success message or redirecting
            } else {
                toast.error('Coupon creation failed');
                // Handle failure, maybe show an error message to the user
            }
        } catch (error) {
            toast.error('Error creating coupon');
            console.error('Error creating coupon:', error);
            // Handle any unexpected errors
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
                            onChange={(e) => setCouponData({ ...couponData, couponName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={couponData.description}
                            onChange={(e) => setCouponData({ ...couponData, description: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Discount in %"
                            value={couponData.discount}
                            onChange={(e) => setCouponData({ ...couponData, discount: e.target.value })}
                        />

                        <div>
                            <label>Expiry Date: </label>
                            <DatePicker
                                selected={couponData.expiryDate}
                                onChange={(date: Date) => setCouponData({ ...couponData, expiryDate: date })}
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