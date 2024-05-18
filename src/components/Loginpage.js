import React, { useState } from 'react';
import './App.css'
import { useNavigate } from "react-router-dom";

import pic from "./images/loginbackground.png";
import Modal from "react-modal"
import RegisterPage from './Registration'
import axios from 'axios';
import Loading from '../components/Loding';




function Loginpage() {

    const s = "remember me";
    let navigate = useNavigate();
    const[loginerror,setloginerror]=useState();
    const [isLoading, setIsLoading] = useState(false);
    const vara="gddhy"

    
    
    const nameregex = /^[A-Za-z]{3,15}$/;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleClick = () => {
        
          navigate("/Healthinsurence");
       
    }

    const [values,setvalues] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleReturnToFirstPage=(formdata)=>{
       
        console.log(formdata.firstname+"data data data");
        setvalues(formdata);

        closeModal(); 
    }


    const [values1, setvalues1] = useState({ username: "", userpassword: "" })
    const [errorvalues, seterrorvalues] = useState({ uname: "", upassword: "" })

    const handlechange = (e) => {
        console.log(e.target)
        const { name, value } = e.target;

        setvalues1({ ...values1, [name]: value })

        if (name === 'username' && !value.match(nameregex)) {
            return seterrorvalues({ ...errorvalues, [name]: "Enter a valid name" })

        }
        if (name === 'userpassword' && !value.match(passwordregex)) {
            return seterrorvalues({ ...errorvalues, [name]: "password must contains" })

        }
        else {
            seterrorvalues({ ...errorvalues, [name]: "" });

        }

    }
    console.log(values.firstname+"   7")

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsLoading(true);
        setTimeout(() => {
            axios.post('http://localhost:9090/Loginpage/add',values1)
            .then(response => {
                // Handle successful response
                console.log('Response from backend:', response.data);
                // You can do something with the response here, such as redirecting the user or updating the UI
                if(response.data==="Login successfully"){
                    alert("login succesfully")
                    navigate("/Profile",{state:{ values1 }});
                }
                else if(response.data==="Invalid credentials" || response.data==="User not found"){
                    setloginerror("invalid user name or password");
                    setIsLoading(false)
                }
                else{
                    setloginerror("");
                }
                
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
        }, 2000); 
        
    }
  
   

    return (
        <div className='container-fluid'>
            <div className='row  text-light p-3 login '>
                <div className='col-sm-6'>
                    <div className="">
                        <i>Ramana Soft</i>
                    </div>
                </div>
                <div className='col-sm-6 d-flex justify-content-end'>
                    <div className="">
                        <button class="btn btn-success">ADMIN</button>
                    </div>
                </div>
            </div>
            <div className='row  p-3 mt-1 rounded-3' id="loginform" >
                <div className='col-sm-8 p-5 rounded-4'>
                    <div className="container-fluid d-flex justify-content-center">
                        <input type="button" class="btn btn-primary" value="Health-Insurence"  onClick={handleClick}/>
                        {isLoading && <Loading text="Loading....."/>}
                        <div className=''>
                        <Modal className=''
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Register Page Modal"
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent background
                                },
                                content: {
                                    width: '70%', 
                                    height: '100%', 
                                    margin: 'auto', 
                                },
                            }}
                        >
                             
                            <button onClick={closeModal} className='btn btn-danger border-0' id="btn-danger">X</button>
                            <RegisterPage onReturnToFirstPage={handleReturnToFirstPage}/>
                            {/* Render your RegisterPage component inside the modal */}
                        </Modal>
                        </div>
                    </div>
                </div><div className='col-sm-1'></div>
                <div className='col-sm-3 p-5 d-flex rounded-4 justify-content-center'>
                    <div className="row ">
                        <form onSubmit={handleSubmit} style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '10px' }}>
                            <div class=" row-12 text-center text-light mb-3 ">
                                <h3 className='text-light display-9 '> User Login</h3>
                            </div>
                            <span>{loginerror}</span>
                            <div class=" row text-center ">
                                <div className='col-sm-12  mb-3 d-flex justify-content-center'>
                                    <input type="text"
                                        name="username"
                                        id='Lname'
                                        class="form-control"
                                        placeholder="Enter username"
                                        onChange={handlechange}
                                        value={values1.uname}
                                    /></div>
                            </div>
                            {/* <span style={{ color: "red" }}>{errorvalues.uname}</span> */}
                            <div class=" row text-center ">
                                <div className='col-sm-12 mb-2 d-flex justify-content-end'>
                                    <input type="password"
                                        name="userpassword"
                                        id='Lpass'
                                        class="form-control"
                                        placeholder="Enter password"
                                        value={values1.upassword}
                                        onChange={handlechange}
                                    /></div>
                            </div>
                            {/* <span style={{color: "red" }}>{errorvalues.upassword}</span> */}
                            {/* <div className='row d-flex justify-content-center'>
                                <div className='col-sm-12'>
                                    <div class=" form-check d-flex-inline mb-2 text-light">
                                        <input type="checkbox" className='' id="checkboxx" required />{s}
                                    </div>
                                </div>
                            </div> */}

                            <div className='row mt-2 d-flex justify-content-center'>
                            <div className='col-6 d-flex justify-content-start'>
                                    <input type="button" class="btn btn-success" value="Register"  onClick={openModal}/>
                                </div>
                                <div className='col-6 d-flex justify-content-end'>
                                    <input type="submit" class="btn btn-success" value="Login"  onClick={handleSubmit} />
                                </div>
                              
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className='rounded-5'>
                <img className="img-fluid " src={pic} alt='hii' ></img>
            </div>

        </div>
    );
}

export default Loginpage
