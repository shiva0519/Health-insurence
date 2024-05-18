import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import pageturner from "../components/images/page-turner.png";

import { ReactComponent as StickerSVG } from "../components/images/health.svg";

import { ReactComponent as CustomerSVG } from "../components/images/Customer.svg";

import "./Profile.css";
import MySVGComponent from "./MySvgComponent";

function Profile() {
  const [values, setValues] = useState({});
  const [policyvalues, setPolicyValues] = useState({});

  const [editMode, setEditMode] = useState(false);


  const location = useLocation();
  const { values1 } = location.state;
  console.log(values1.username + "8888888888888888888888");

  const defalutPolicyvalues = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registerResponse = await axios.get(
          `http://localhost:9090/register/getById/${values1.username}`
        );
        setValues(registerResponse.data);

        const paymentResponse = await axios.get(
          `http://localhost:9090/payment/getCustomerDetailsByMail/${values1.username}`
        );
        setPolicyValues(paymentResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Cleanup function can be added here if necessary
  }, [values1.username]);

  let navigate = useNavigate();
  const handlenavigate = () => {
    navigate("/PolicyDetails", { state: { values1 } });
  };
  const svgStyles = {
    backgroundImage: `
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='475' height='475' viewBox='0 0 200 200'%3E%3Crect fill='%23ffffff' width='200' height='200'/%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'%3E%3Cstop offset='0' stop-color='%23005092'/%3E%3Cstop offset='1' stop-color='%23007cc4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon fill='url(%23a)' points='0 174 0 0 174 0'/%3E%3Cpath fill='%23000' fill-opacity='0.37' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/%3E%3Cpath fill='url(%23b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/%3E%3C/svg%3E"),
        linear-gradient(to bottom, #f0f0f0, #f8f8f8)`, // Additional background gradient for fallback
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleContentChange = (key, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [key]: newValue
    }));
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:9090/register/user/update/${values.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      // Handle successful response (e.g., show success message)
      console.log('User details updated successfully');
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };


  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div className=" fixed-menu" id="profileBackground">
      <div className="container-fluid p-2 mb-5 bg-primary  text-white text-center ">
        <h1>Profile</h1>
      </div>

      <div
        className="container-fluid  d-flex p-3 text-white rounded-3"
        id="profilebanner"
        style={{
          marginLeft: "auto",
          maxWidth: "80%",
          backgroundColor: "#91b1e6",
        }}
      >
        <div className="sticker ">
          <div className="sticker-image-container">
            <StickerSVG className="sticker-image" />
          </div>
          <div className="welcome-message ">
            <a
              className="btn  text-light "
              data-bs-toggle="offcanvas"
              href="#offcanvas"
              role="button"
              aria-controls="offcanvasExample"
            >
              <i className="fa-solid fa-user"> My Profile</i>
              <hr></hr>
            </a>
          </div>

          <div className="welcome-message ">
            <h4>Welcome {values.firstname}</h4>
            <hr></hr>
            <i> </i>
          </div>
          <div className="welcome-message ">
            <h4> Phno {values.contactNo}</h4>
            <hr></hr>
          </div>
        </div>
      </div>

      <div className="container-fluid  p-5">
        <h4 className="text-start text-light">Your recent ploicy details </h4>
        <div className="card  d-flex flex-row align-items-center">
        <div className="p-3">
                    <CustomerSVG className="sticker-image" />
                </div>

          <div className="mt-3 table-responsive ">
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-primary">
                <tr>
                  <th scope="col">Payment_Id</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Insurance Cover</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Plan Type</th>
                  <th scope="col">Relation Type</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(policyvalues) &&
                  policyvalues.map((policyvalues, index) => (
                    <tr key={index}>
                      <td>&#8377;{policyvalues.userId}</td>
                      <td>{policyvalues.duration}</td>
                      <td>{policyvalues.insurence_cover}</td>
                      <td>{policyvalues.intrest}</td>
                      <td>{policyvalues.planType}</td>
                      <td>{policyvalues.relationType}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-outline-primary" onClick={handlenavigate}>
            Take New Policy
          </button>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-10"
        id="offcanvas"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="container text-center">
          <h1 className="fa-solid fa-user"></h1>
        </div>
        <div className="offcanvas-header d-flex justify-content-center p-3 mb-3 text-danger">
          <h4 className="offcanvas-title text-muted text-light  mb-3">
            My Profile
          </h4>
          <hr></hr>
          <br />
        </div>

        <div className="container">
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Name</h6>
            </div>
            <div className="col-8">
              {/* <h6 className="text-primary">{values.firstname}</h6> */}
              {editMode ? (
            <h6
              className="text-primary editable"
              contentEditable
              onBlur={(e) => handleContentChange('firstname', e.target.innerText)}
              dangerouslySetInnerHTML={{ __html: values.firstname }}
            />
          ) : (
            <h6 className="text-primary">{values.firstname}</h6>
          )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Email</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.email}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Phone No</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.contactNo}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Date of Birth</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.dateofbirth}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Address</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.address}</h6>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="text-muted">Marital Status</h6>
            </div>
            <div className="col-8">
              <h6 className="text-primary">{values.maritual}</h6>
            </div>
          </div>
          <div className="row mb-3 text-center ms-5">
            <div className="col-4 ms-5">
        <button className="btn btn-primary" onClick={editMode ? handleSave : handleEditClick}>
          {editMode ? 'Save' : 'Edit'}
        </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
