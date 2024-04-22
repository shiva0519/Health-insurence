import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './quotation.css'


function CheckDetails() {

    const location = useLocation();
    const { values, policyType, individual, checkboxvalues, increment, proceed, percentage_value, percentage_value2, percentage_value3, percentage_value4, percentage_value5 } = location.state;

    // const{state} = useLocation();
    //          const check= state.checkboxvalues;

    let navigate = useNavigate();
    const handleInfo = () => {
        navigate("/Registration")
    }
    let checkbox = checkboxvalues
    let amount;
    if(percentage_value){
         amount=percentage_value;
    }
    else if(percentage_value2){
        amount=percentage_value2;
   }
   else if(percentage_value3){
    amount=percentage_value3;
}
 else if(percentage_value4){
    amount=percentage_value4;
}
else if(percentage_value5){
    amount=percentage_value5;
}




    return (
        <div>
            <div className='container-fluid '>
                <div className='row justify-content-center'>
                    <div className='col-sm-12 fixed-menu '>
                        <div className="container-fluid bg-primary text-lightp-1">
                            <header className='text-center'>
                                <h1 className='display-8 p-2 text-light'>Review</h1>
                            </header>
                        </div><br />
                    </div>
                </div>
                <div className='row mt-5'></div>
                <div className=' mt-5 container-fluid d-flex '>
                    <div className='row bg-primar '>

                        <div className='row   '>
                            <div className='col-sm-12 d-flex mb-3   text-primary opacity-50 '>
                                <div className='col-12 '>
                                    <h4>Your information</h4>
                                    <hr className='covers'></hr>
                                </div>

                            </div>
                        </div>
                        <div className='row d-flex justify-content-start mb-3  '>

                            <div className=' col-sm-5'>
                                <h5>User_name</h5>
                            </div>
                            <div className=' col-sm-5'>
                                <h5>: {values.firstname}</h5>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-start mb-3 '>
                            <div className=' col-5'>
                                <h5>Email</h5>
                            </div>
                            <div className=' col-5'>
                                <h5>: {values.email}</h5>
                            </div>

                        </div>
                        <div className='row d-flex  justify-content-start mb-3 '>
                            <div className='col-sm-5'>
                                <h5>Date_of_birth</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h5>: {values.dateofbirth}</h5>
                            </div>

                        </div>
                        <div className='row d-flex  justify-content-start mb-3'>
                            <div className='col-sm-5'>
                                <h5>Phone_number</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h5>: {values.contactNo}</h5>
                            </div>

                        </div>
                        <div className='row d-flex  justify-content-start mb-3'>
                            <div className='col-sm-5'>
                                <h5>Gender</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h5>: {values.gender}</h5>
                            </div>

                        </div>
                        <div className='row d-flex  justify-content-start mb-3'>
                            <div className='col-sm-5'>
                                <h5>Marital_Status</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h5>: {values.maritual}</h5>
                            </div>

                        </div>

                    </div>
                    {/* <div className=' container col-sm-5 covers rounded w- h-25 '>

                        <div className='row d-flex mb-3 text-light p-2 '>
                            <div className='col-sm-12 bg-secondary text-warning text-center pt-1 mb-3'>
                                <h4 className=''>Your Plan Details</h4>
                            </div>
                            

                        </div>
                        <div className='row d-flex '>
                            <div className='col-sm-8 mb-3'>
                                <h5>Duration</h5>
                            </div>
                            <div className='col-sm-4'>
                                <h5>: {proceed}Years

                                </h5>
                            </div>
                            <div className='col-sm-8 mb-3'>
                                <h5>Insurence Cover</h5>
                            </div>
                            <div className='col-sm-4'>
                                <h5>: &#8377;{increment}L

                                </h5>
                            </div>
                            <div className='col-sm-8'>
                                <h5>Interest</h5>
                            </div>
                            <div className='col-sm-4'>
                                <h5>: &#8377;{percentage_value}
                                    {percentage_value2}
                                    {percentage_value3}
                                    {percentage_value4}
                                    {percentage_value5}
                                </h5>
                            </div>
                            <div className='col d-flex justify-content-center mt-3 mb-2'>
                            <button className='btn btn-secondary'onClick={()=>navigate("/Quotationpage",{state:{policyType,values,individual}})} >Edit</button>
                            </div>
                        </div>

                    </div> */}

                </div>
                <div className=' row container-fluid mb-5 mt-5'>
                    <div className='col-sm-12 '>
                        <div className='row'>
                            <div className='col-sm-12 d-flex mb-3  text-primary opacity-50 '>
                                <div className='col-12 '>
                                    <h4>Your  PolicyDetails</h4>
                                    <hr className='covers'></hr>
                                </div>

                            </div>
                        </div>
                        <div className='row d-flex justify-content-start mb-3'>
                            <div className='col-sm-5'>
                                <h5>Plan Type</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h4>: {policyType}</h4>
                            </div>
                        </div>
                        <div className='row d-flex mb-3'>
                            <div className='col-sm-5'>
                                <h5>Relation type</h5>
                            </div>
                            <div className='col-sm-5'>
                                <h5>: {individual}{checkbox}</h5>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=' col-sm-12  rounded  h-25 '>
                    <div className='col-sm-12 d-flex mb-3 text-primary opacity-50  '>
                        <div className='col-12 '>
                            <h4>Your  Premium Details</h4>
                            <hr className='covers'></hr>
                        </div>

                    </div>
                    <div className='row d-flex '>
                        <div className='col-sm-5 mb-3'>
                            <h5>Duration</h5>
                        </div>
                        <div className='col-sm-5'>
                            <h5>: {proceed}Years

                            </h5>
                        </div>
                        <div className='col-sm-5 mb-3'>
                            <h5>Insurence Cover</h5>
                        </div>
                        <div className='col-sm-5'>
                            <h5>: &#8377;{increment}L

                            </h5>
                        </div>
                        <div className='col-sm-5'>
                            <h5>Interest</h5>
                        </div>
                        <div className='col-sm-5'>
                            <h5>: &#8377;{amount}
                                {/* {percentage_value}
                                {percentage_value2}
                                {percentage_value3}
                                {percentage_value4}
                                {percentage_value5} */}
                            </h5>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-10 d-flex justify-content-end mt-3 mb-2'>
                            <button className='btn btn-secondary' onClick={() => navigate("/Quotationpage", { state: { policyType, values, individual, checkboxvalues } })} >Back</button>
                        </div>
                        <div className='col-2 d-flex justify-content-start mt-3 mb-2'>
                            <button className='btn btn-success' onClick={() => navigate("/Payment", { state: { policyType, values, individual, checkboxvalues,percentage_value, amount } })}>Proceed</button>
                        </div>
                    </div>

                </div>









            </div>

        </div>
    )
}

export default CheckDetails
