// otpUtils.js
import axios from "axios";

// Function to generate a 6-digit OTP
export const generateOtp = (length = 6) => {
  const characters = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(index);
  }
  return otp;
};

// Function to handle sending OTP
export const handleSendOtp = async (mobileno) => {
  const otp = generateOtp(6);
  const proxyUrl = `http://192.168.1.48:9090/register/sendOtp?mobileno=${mobileno}&otp=${otp}`;

  try {
    const response = await axios.get(proxyUrl);
    console.log("SMS Response:", response.data, otp);
    if (response.data.status === "success") {
      alert("OTP sent successfully");
      return otp;
    } else {
      alert("Failed to send OTP");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
export const handleEmailOtp = async (email) => {
 
  const emailUrl = `http://192.168.1.48:9090/register/sendEmail/${email}`;

  try {
    const response = await axios.post(emailUrl);
    console.log(response.data);
    if(response.data){
        alert("otp sent to email");
        return String(response.data);

    }
  } catch (error) {
    console.error("error sending eamil", error);
  }
};

export const handleOtpVerification = (otp, enteredotp) => {
  if (otp === enteredotp) {
    return true;
  } else {
    return false;
  }
};
export const handleEmailOtpVerification =(num1, num) =>{

    if (num1 === num) {
        
        return true;
    }
    else{
        return false;
    }
}
// import React from 'react'

// function otpFunctions() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default otpFunctions
