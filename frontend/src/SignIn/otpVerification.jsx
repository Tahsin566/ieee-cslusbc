import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function OtuVerify() {
    const [otp, setOtp] = useState(Array(4).fill("")); // Array with 6 empty strings
    const inputRefs = useRef([]); // Array of refs for each input field
    const [otpInputVisible,setOtpInputVisible] = useState(false)

    const handleKeyDown = (e) => {
        if (
            !/^[0-9]{1}$/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "Delete" &&
            e.key !== "Tab" &&
            !e.metaKey
        ) {
            e.preventDefault();
        }

        if (e.key === "Delete" || e.key === "Backspace") {
            const index = inputRefs.current.indexOf(e.target);
            if (index > 0) {
                setOtp((prevOtp) => [
                    ...prevOtp.slice(0, index - 1),
                    "",
                    ...prevOtp.slice(index),
                ]);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleInput = (e) => {
        const { target } = e;
        const index = inputRefs.current.indexOf(target);
        if (target.value) {
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                target.value,
                ...prevOtp.slice(index + 1),
            ]);
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleFocus = (e) => {
        e.target.select();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text");
        if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
            return;
        }
        const digits = text.split("");
        setOtp(digits);
    };

    const handleSubmit =async(e)=>{

        e.preventDefault()

        console.log(otp?.join(""))
    }

    return (
        <div className="flex justify-center items-center flex-col min-h-screen gap-10">

            {otpInputVisible === false ? <section>

            <h1 className="text-3xl">Email Verification</h1>
            <div className="text-left">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded p-2"
                  
                  />
                <button onClick={()=>setOtpInputVisible(true)} className="bg-blue-700 p-2 rounded-md text-white mx-auto w-full mt-1 mb-5">Send otp</button>
                <Link to={'/'} className="bg-blue-700 p-2 rounded-md text-white mx-auto flex mt-1 justify-center">Home</Link>
              </div>
            
                  </section>:<section className=" dark:bg-dark px-4 space-y-4 ">
                    <div className="text-center text-2xl font-bold">OTP Verification</div>
                    <div className="text-center">Enter the OTP recieved to verify</div>
                <div className="container">
                    <form id="otp-form" className="flex gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={handleInput}
                                onKeyDown={handleKeyDown}
                                onFocus={handleFocus}
                                onPaste={handlePaste}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
                            />
                        ))}
                        {/* You can conditionally render a submit button here based on otp length */}
                    </form>
                    <button onClick={handleSubmit} className="bg-blue-700 p-2 rounded-md text-white mx-auto w-full mt-10">Verify</button>
                </div>
            </section>}
        </div>
    );
}
