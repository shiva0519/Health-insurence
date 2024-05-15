import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import "./App.css";

function Registration({ onReturnToFirstPage }) {
  const fnameregex = /^[A-Za-z]+(?:[ \s.][A-Za-z]+)*$/;
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  const phnumber_regex = /^[6-9]{1}[0-9]{9}$/;
  const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

  let navigate = useNavigate();

  const starting_value = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    Address: "",
    email: "",
    maritual: "",
  };
  const initiall_errorvalues = {
    firstname: "",
    lastname: "",
    password: "",
    dateofbirth: "",
    gender: "",
    contactNo: "",
    Address: "",
    email: "",
    maritual: "",
  };
  const [values, setvalues] = useState(starting_value);
  const [errorvalues, seterrorvalues] = useState(initiall_errorvalues);
  // const firstname=values.firstname
  // const marital=values.maritual

  const [showPassword, setShowPassword] = useState(false);
  const Visibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    setvalues({ ...values, [name]: value });

    if (name === "firstname" && !value.match(fnameregex)) {
      return seterrorvalues({ ...errorvalues, [name]: "enter a valid name" });
    } else if (name === "dateofbirth" && !value.match(dobRegex)) {
      return seterrorvalues({ ...errorvalues, [name]: "invalid date" });
    } else if (name === "dateofbirth" && new Date(value) >= new Date()) {
      return seterrorvalues({
        ...errorvalues,
        [name]: "invalid date of Birth",
      });
    } else if (name === "contactNo" && !value.match(phnumber_regex)) {
      return seterrorvalues({
        ...errorvalues,
        [name]: "enter a valid phone number",
      });
    } else if (name === "email" && !value.match(emailregex)) {
      return seterrorvalues({ ...errorvalues, [name]: "enter a valid Email" });
    } else if (name === "password" && !value.match(password_regex)) {
      return seterrorvalues({
        ...errorvalues,
        [name]:
          "At least one alphabetical character." +
          "At least one digit." +
          "Minimum length of 8 characters.",
      });
    } else {
      return seterrorvalues({ ...errorvalues, [name]: "" });
    }
  };

  const handlesubmit = (e1) => {
    e1.preventDefault();

    if (
      fnameregex.test(values.firstname) &&
      phnumber_regex.test(values.contactNo) &&
      emailregex.test(values.email)&&
      password_regex.test(values.password)&&
      values.dateofbirth &&
      values.gender

    ){
     
      navigate("/", { state: { values } });

    axios
      .post("http://localhost:9090/register/addregister", values)
      .then((response) => {
        // Handle successful response
        console.log("Response from backend:", response.data);
        // You can do something with the response here, such as redirecting the user or updating the UI
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
    onReturnToFirstPage(values);
    }
  };
  const numeric = (event) => {
    const inputChar = String.fromCharCode(event.charCode);

    const numericRegex = /^[0-9]*$/; // Regular expression to match only numeric values
    // Allow numeric characters (0-9) and control keys like backspace and delete

    if (
      !numericRegex.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault(); // Prevent the default action (i.e., typing the character)
    }
  };
  const numeric2 = (event) => {
    const inputChar = String.fromCharCode(event.charCode);
    const fnameregex1 = /^[A-Za-z\s]+(?:[ \s.][A-Za-z]+)*$/;
    // Regular expression to match only numeric values
    // Allow numeric characters (0-9) and control keys like backspace and delete
    if (
      !fnameregex1.test(inputChar) &&
      event.charCode !== 0 &&
      event.charCode !== 8
    ) {
      event.preventDefault(); // Prevent the default action (i.e., typing the character)
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 ">
          <div className="container-fluid bg-primary text-light p-1">
            <header className="text-center">
              <h1 className="display-8">Registration Form</h1>
            </header>
          </div>
          <br />

          <form onSubmit={handlesubmit} className="form-control">
            <div className="row m-2 d-flex justify-content-center">
              <div className="col-sm-4">
                <label> Name :</label>
              </div>
              <div className="col-sm-6 ">
                <input
                  type="text"
                  className="form-control-sm w-100"
                  placeholder="enter a valid name"
                  name="firstname"
                  maxLength={30}
                  title="it contains only alphabets space & dot"
                  value={values.firstname}
                  onChange={validate}
                  onKeyPress={numeric2}
                />

                <span style={{ color: "red" }}>{errorvalues.firstname}</span>
              </div>
            </div>
            <br />
            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>E-mail :</label>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className="form-control-sm w-100"
                  placeholder="enter a valid email"
                  name="email"
                  value={values.email}
                  onChange={validate}
                />
                <br />
                <span style={{ color: "red" }}>{errorvalues.email}</span>
              </div>
            </div>
            <br />
            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Password :</label>
              </div>
              <div className="col-sm-6">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control-sm "
                    style={{ width: "86%", borderRight: "none" }}
                    placeholder="enter password"
                    name="password"
                    title="At least one alphabetical character.
                                    At least one digit.
                                    Minimum length of 8 characters."
                    value={values.password}
                    onChange={validate}
                  />
                  <button
                    className="btn btn-outline-secondary border-dark form-control-sm "
                    style={{ borderLeft: "none" }}
                    type="button"
                    onClick={Visibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <br />
                <span style={{ color: "red" }}>{errorvalues.password}</span>
              </div>
            </div>
            <br />
            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Phone Number :</label>
              </div>
              <div className="col-sm-6">
                <input
                  type="text"
                  className=" form-control-sm rounded w-100 "
                  placeholder="enter phone number"
                  name="contactNo"
                  maxLength={10}
                  value={values.contactNo}
                  onChange={validate}
                  onKeyPress={numeric}
                />
                <br />
                <span style={{ color: "red" }}>{errorvalues.contactNo}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Date of Birth :</label>
              </div>
              <div className="col-sm-6">
                <input
                  type="date"
                  className="form-control-sm w-100"
                  name="dateofbirth"
                  min="1975-01-01"
                  max="2075-01-01"
                  value={values.dateofbirth}
                  onChange={validate}
                />
                <span style={{ color: "red" }}>{errorvalues.dateofbirth}</span>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Gender :</label>
              </div>
              <div className="col-sm-6">
                <select
                  name="gender"
                  id="genders"
                  value={values.gender}
                  onChange={validate}
                  className="form-control-sm w-100"
                >
                  <option value="">-select gender-</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
            <br />

            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>Address :</label>
              </div>
              <div className="col-sm-6">
                <textarea
                  className="form-control form-control-sm "
                  placeholder="Address"
                  name="address"
                />
              </div>
            </div>
            <br />
            <div className="row m-1 d-flex justify-content-center">
              <div className="col-sm-4">
                <label>marital_status :</label>
              </div>
              <div className="col-sm-6">
                <select
                  name="maritual"
                  id="marital_status"
                  className="form-control form-control-sm "
                  required
                  value={values.maritual}
                  onChange={validate}
                >
                  <option value="">-Select Marital Status-</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm-12 d-flex justify-content-center">
                <input
                  type="submit"
                  class="btn btn-primary btn-block w-50"
                  id="btnn"
                  value="Register"
                />
              </div>
            </div>

            <div />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
