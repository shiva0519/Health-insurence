import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './quotation.css';

function Quotationpage() {

    const location = useLocation();

    const { policyType, checkboxvalues, values, individual, familyMembers } = location.state
    console.log(checkboxvalues + "checkkk")
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate("/PolicyDetails", { state: { values } })
    }
    const handleProceed = (e) => {
        const name = e.target.name
        console.log(name)
        if (proceed === "1") {
            navigate("/CheckDetails", { state: { values, policyType, individual, checkboxvalues, familyMembers, proceed, percentage_value, increment } })
        }
        if (proceed === "2") {
            navigate("/CheckDetails", { state: { values, policyType, individual, checkboxvalues, familyMembers, proceed, percentage_value2, increment } })
        }
        if (proceed === "3") {
            navigate("/CheckDetails", { state: { values, policyType, individual, checkboxvalues, familyMembers, proceed, percentage_value3, increment } })
        }
        if (proceed === "4") {
            navigate("/CheckDetails", { state: { values, policyType, individual, checkboxvalues, familyMembers, proceed, percentage_value4, increment } })
        }
        if (proceed === "5") {
            navigate("/CheckDetails", { state: { values, policyType, individual, checkboxvalues, familyMembers, proceed, percentage_value5, increment } })
        }

    }
    const [proceed, setProceed] = useState("");

    const [increment, setIncrement] = useState(2);
    // const [percentage, setPercentage] = useState()
    let percentage = "";

    const handleIncrementOrDecrement = (e) => {

        const { name, value } = e.target

        console.log(e.target)
        // let percentage_value=value*100000/100
        // setPercentage(percentage_value)
        if (name === "increment" && value <= 4) {

            setIncrement(increment + 1);
            console.log(percentage)
        }

        if (name === "decrement" && value > 2) {
            setIncrement(increment - 1);
        }

    }
    let percentage_value = increment * 100000 / 100;
    let percentage_value2 = Math.trunc(percentage_value + increment * 100000 / 110)
    let percentage_value3 = Math.trunc(percentage_value2 + increment * 100000 / 120)
    let percentage_value4 = Math.trunc(percentage_value3 + increment * 100000 / 130)
    let percentage_value5 = Math.trunc(percentage_value4 + increment * 100000 / 140)

    
    const buttonClick = (e) => {
       
        const { name, value } = e.target
        setProceed(name)
        console.log(proceed + "seted")


    }



    return (

        <div className='container-fluid '>
            <div className=" container-fluid bg-primary text-light p-1">
                <header className='text-center '>
                    <h1 className='display-8'>Quotation Details</h1>
                </header>
            </div>
            <div className='container-fluid border-3 '>
                <div className='row p-3 mt-1 rounded-3'>
                    <div className='col-sm-4 m-2'>
                        <header className='mb-3'>Hello {values.firstname}</header>
                        <h4>Plan Type: {policyType}</h4>
                        <button className='btn btn-outline-secondary mt-2' onClick={handleEditClick}>Edit</button>
                    </div>
                    <div className='col-sm-3 m-2 covers' style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(225, 255, 255, 0.2)', padding: '10px', borderRadius: '10px', height: "150px" }}>
                        <div className='row-12 p-3 mt-1 text-center'>
                            <h3 className=' display-9 '> Insurence cover</h3>
                        </div>
                        <div className='row d-flex justify-content-center  ms-'>
                            <div className='col-3 d-flex justify-content-center'>
                                {/* <input type="submit" class="btn btn-success" value="Submit" /> */}
                                <button onClick={handleIncrementOrDecrement} name='decrement' value={increment} className='btn btn-primary'>-</button>
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-primary'>&#8377;{increment}L</button>
                            </div>
                            <div className='col-3'>
                                <button onClick={handleIncrementOrDecrement} name='increment' value={increment} className='btn btn-primary'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-1'></div>
                    <div className='col-sm-3 covers m-2 ' style={{ backdropFilter: 'blur(5px)', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: '10px', borderRadius: '10px', height: "150px" }}>
                        <div className='row'>
                            <div className='col-6'>
                                <div className='row p-3 mt-1 text-center'>
                                    <h3 className=' display-9 '>Yearly</h3>
                                </div>
                                <div className='row d-flex text-center  '>
                                    <div className='col'>
                                        <button className='text-end btn btn-warning'>&#8377;{percentage_value}</button>
                                    </div>

                                </div>

                            </div>
                            <div className='col-6'>
                                <div className='row  p-2 mt-1 text-center'>
                                    <h5 className=' display-9 '> selected premium</h5>
                                </div>
                                <div className='row d-flex text-center  '>
                                    <div className='col'>
                                        <button className='text-end btn btn-warning'>&#8377;{proceed==="1"?(percentage_value): proceed==="2"?(percentage_value2):proceed==="3"?(percentage_value3):proceed==="4"?(percentage_value4):proceed==="5"&&(percentage_value5)}</button>
                                    </div>

                                </div>

                            </div>
                        </div>



                    </div>

                </div>
                <div className='row mt-5 text-center'>
                    <div className='col'>
                    <h2>Choose Your Plan</h2>
                    </div>
                </div>
                <div className='mt-3 table-responsive '>
                    <table className='table table-border-none text-center'>
                        <thead className='thead-primary'>
                            <tr>
                                <th scope='col'><button className={`btn btn-outline-primary ${proceed==="1" ? 'btn btn-primary text-light':""}`} onClick={buttonClick} name='1' value={percentage_value} > 1 year</button></th>
                                <th scope='col'><button className={`btn btn-outline-primary ${proceed==="2" ? 'btn btn-primary text-light':""}`} onClick={buttonClick} name='2' > 2 years</button></th>
                                <th scope='col'><button className={`btn btn-outline-primary ${proceed==="3" ? 'btn btn-primary text-light':""}`} onClick={buttonClick} name='3'>3 years</button></th>
                                <th scope='col'><button className={`btn btn-outline-primary ${proceed==="4" ? 'btn btn-primary text-light':""}`}onClick={buttonClick} name='4'> 4 years</button></th>
                                <th scope='col'><button className={`btn btn-outline-primary ${proceed==="5" ? 'btn btn-primary   text-light':""}`} onClick={buttonClick} name='5'> 5 years</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <th>&#8377; {percentage_value}</th>
                                <th>&#8377;{percentage_value2}</th>
                                <th>&#8377;{percentage_value3}</th>
                                <th>&#8377;{percentage_value4}</th>
                                <th>&#8377;{percentage_value5}</th>
                            </tr>

                        </tbody>
                    </table>

                </div>
                <div className='d-flex justify-content-center mt-5'>
                    <button className='btn btn-success' onClick={handleProceed}>Proceed....</button>
                </div>

            </div>

        </div>

    )
}

export default Quotationpage
