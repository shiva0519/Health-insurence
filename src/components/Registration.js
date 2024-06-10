import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import axios from "axios";
import {
  handleSendOtp,
  handleOtpVerification,
  handleEmailOtp,
  handleEmailOtpVerification,
} from "../components/otpFunctions";
import { Modal, Button } from "react-bootstrap";
// import "./App.css";

function Registration({ onReturnToFirstPage }) {
  const fnameregex = /^[A-Za-z]+(?:[ \s.][A-Za-z]+)*$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const phnumber_regex = /^[6-9]{1}[0-9]{9}$/;
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [emailEnteredOtp, setEmailEnteredOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  let navigate = useNavigate();

  const starting_value = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    address: "",
    email: "",
    maritual: "",
  };

  const initial_error_values = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    address: "",
    email: "",
    marital: "",
  };

  const [values, setValues] = useState(starting_value);
  const [errorValues, setErrorValues] = useState(initial_error_values);

  useEffect(() => {
    setIsPhoneNumberVerified(false);
  }, [values.contactNo]);

  useEffect(() => {
    setIsEmailOtpVerified(false);
    setIsEmailValid(false);
  }, [values.email]);

  const handleOtp = async () => {
    const num = values.contactNo;

    const generatedOtp = await handleSendOtp(num);

    if (generatedOtp) {
      setShowOtpModal(true);
      setIsOtpVerified(false);
      setOtp(generatedOtp);
    }
  };

  const EmailOtp = async () => {
    const useremail = values.email;

    const generatedEmailOtp = await handleEmailOtp(useremail);
    setEmailOtp(generatedEmailOtp);
    console.log(generatedEmailOtp + "genarated emailotp");
    if (generatedEmailOtp) {
      setShowEmailOtpModal(true);
      setIsEmailOtpVerified(false);
      setEmailOtp(generatedEmailOtp);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const isVerified = handleOtpVerification(enteredOtp, otp);
    if (isVerified) {
      setIsOtpVerified(true);
      setShowOtpModal(false);
      setIsPhoneNumberVerified(true);
      setEnteredOtp("");
    } else {
      setIsOtpVerified(false);
      alert("Wrong OTP. Please try again.");
    }
    setEnteredOtp("");
  };

  const handleEmailOtpSubmit = (e) => {
    e.preventDefault();
    console.log(emailEnteredOtp + " 88888 " + emailOtp);

    const isVerified = handleEmailOtpVerification(emailEnteredOtp, emailOtp);
    if (isVerified) {
      setIsEmailOtpVerified(true);
      setShowEmailOtpModal(false);
      setEmailEnteredOtp("");
    } else {
      setIsEmailOtpVerified(false);
      alert("Wrong OTP. Please try again.");
    }
    setEmailEnteredOtp("");
  };

  const handleBlur = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.48:9090/register/CheckMail/${values.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );
      const data = await response.json();

      if (data === true) {
        setError("This email is already registered, please login!");
        setIsEmailValid(false);
      } else {
        setError("");
        setIsEmailValid(true);
      }
    } catch (error) {
      setError("Enter a valid email.");
      setIsEmailValid(false);
    }
  };

  const validate = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    

    if (name === "firstname" && !value.match(fnameregex)) {
      return setErrorValues({ ...errorValues, [name]: "Enter a valid name" });
    } else if (
      name === "dateofbirth" &&
      (!value.match(dobRegex) || new Date(value) >= new Date())
    ) {
      return setErrorValues({
        ...errorValues,
        [name]: "Invalid date of birth",
      });
    } else if (name === "contactNo" && !value.match(phnumber_regex)) {
      return setErrorValues({
        ...errorValues,
        [name]: "Enter a valid phone number",
      });
    } else if (name === "email" && !value.match(emailregex)) {
      return setErrorValues({ ...errorValues, [name]: "Enter a valid email" });
    } else if (name === "password" && !value.match(password_regex)) {
      return setErrorValues({
        ...errorValues,
        [name]:
          "Password must contain at least one letter, one digit, and be between 8-15 characters long.",
      });
    } else {
      return setErrorValues({ ...errorValues, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !error &&
      fnameregex.test(values.firstname) &&
      phnumber_regex.test(values.contactNo) &&
      emailregex.test(values.email) &&
      password_regex.test(values.password) &&
      values.dateofbirth &&
      values.gender &&
      isOtpVerified &&
      isEmailOtpVerified
    ) {
      // navigate("/", { state: { values } });

      axios
        .post("http://192.168.1.48:9090/register/addregister", values)
        .then((response) => {
          console.log("Response from backend:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
      onReturnToFirstPage(values);
    }
  };

  const handleNumericInput = (event) => {
    const inputChar = String.fromCharCode(event.charCode);
    if (
      !/^[0-9]*$/.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault();
    }
  };

  const handleAlphabeticInput = (event) => {
    const inputChar = String.fromCharCode(event.charCode);
    if (
      !/^[A-Za-z\s]+$/.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault();
    }
  };

  const preventEnterSubmission = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 p-1">
          <div className="container-fluid bg-primary text-light p-1">
            <header className="text-center">
              <h1 className="display-8">Registration Form</h1>
            </header>
          </div>
          <br />

          <form onSubmit={handleSubmit} className="form-control">
            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Name:</label>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control-sm w-100"
                  placeholder="Enter a valid name"
                  name="firstname"
                  maxLength={30}
                  title="Name contains only alphabets"
                  value={values.firstname}
                  onChange={validate}
                  onKeyPress={handleAlphabeticInput}
                  onKeyDown={preventEnterSubmission}
                  required
                />
                <span style={{ color: "red" }}>{errorValues.firstname}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Date Of Birth:</label>
              </div>
              <div className="col-sm-6">
                <input
                  type="date"
                  className="form-control-sm w-100"
                  placeholder="Enter valid birthdate"
                  name="dateofbirth"
                  value={values.dateofbirth}
                  onChange={validate}
                  onKeyDown={preventEnterSubmission}
                  required
                />
                <span style={{ color: "red" }}>{errorValues.dateofbirth}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Contact Number:</label>
              </div>
              <div className="col-sm-6 d-flex">
                <input
                  type="text"
                  className="form-control-sm w-100"
                  placeholder="Enter valid mobile number"
                  name="contactNo"
                  maxLength={10}
                  title="Phone number should contain 10 digits"
                  value={values.contactNo}
                  onChange={validate}
                  onKeyPress={handleNumericInput}
                  onKeyDown={preventEnterSubmission}
                  required
                />
                <button
                  type="button"
                  onClick={handleOtp}
                  disabled={isPhoneNumberVerified}
                >
                  {isPhoneNumberVerified ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <span style={{ color: "red" }}>{errorValues.contactNo}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Email:</label>
              </div>
              <div className="col-sm-6 d-flex">
                <input
                  type="email"
                  className="form-control-sm w-100"
                  placeholder="Enter valid email"
                  name="email"
                  value={values.email}
                  onChange={validate}
                  onBlur={handleBlur}
                  // onKeyDown={preventEnterSubmission}
                  required
                />
                <button
                  type="button"
                  onClick={EmailOtp}
                  disabled={!isEmailValid || isEmailOtpVerified}
                >
                  {isEmailOtpVerified ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <span style={{ color: "red" }}>{errorValues.email}</span>
                <span style={{ color: "red" }}>{error}</span>
              </div>
            </div>
            <br />

            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Password:</label>
              </div>
              <div className="col-sm-6">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control-sm w-100"
                    placeholder="Enter password"
                    name="password"
                    value={values.password}
                    onChange={validate}
                    onKeyDown={preventEnterSubmission}
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <span style={{ color: "red" }}>{errorValues.password}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Address:</label>
              </div>
              <div className="col-sm-6">
                <textarea
                  className="form-control-sm w-100"
                  placeholder="Enter your address"
                  name="address"
                  value={values.address}
                  onChange={validate}
                  onKeyDown={preventEnterSubmission}
                  required
                />
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Marital Status:</label>
              </div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritual"
                    value="single"
                    checked={values.maritual === "single"}
                    onChange={validate}
                    required
                  />
                  <label className="form-check-label">Single</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritual"
                    value="married"
                    checked={values.maritual === "married"}
                    onChange={validate}
                    required
                  />
                  <label className="form-check-label">Married</label>
                </div>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Gender:</label>
              </div>
              <div className="col-sm-6">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={values.gender === "male"}
                    onChange={validate}
                    required
                  />
                  <label className="form-check-label">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={values.gender === "female"}
                    onChange={validate}
                    required
                  />
                  <label className="form-check-label">Female</label>
                </div>
              </div>
            </div>
            <br />

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <br />

            <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Enter OTP</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleOtpSubmit}>
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </form>
              </Modal.Body>
            </Modal>

            <Modal
              show={showEmailOtpModal}
              onHide={() => setShowEmailOtpModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter Email OTP</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleEmailOtpSubmit}>
                  <input
                    type="text"
                    value={emailEnteredOtp}
                    maxLength={6}
                    onChange={(e) => setEmailEnteredOtp(e.target.value)}
                    required
                  />
                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </form>
              </Modal.Body>
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
