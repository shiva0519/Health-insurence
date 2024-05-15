// import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom';
// import logo from './images/logoo.png'
// import axios from 'axios';

// function Payment() {
    

//     const location = useLocation();
//     const { values,data, percentage_value, percentage_value2, amount } = location.state;
    
//     console.log(data.planType+"plantype");
//     console.log(data.relationType+"relationtype");
//     console.log(data.members+"memberseee");
//     console.log(data.duration+"       duration");
//     console.log(data.intrest+"amount");
//     console.log(data.insurence_cover+"  cover");
   
//     // const[userId,setuserId]=useState({});

//     const handleClick = async() => {
//         if (true) {
          
        
//             const options =
//             {
//                 key: 'rzp_test_Su4WV4zdBIGTmZ',
//                 key_secret: 'EmH6eToe5CvCfAfgfADREv3C',
//                 amount: amount*100, // Amount in paise (e.g., 1000 paise = Ã¢â€šÂ¹10)
//                 name: 'RS Insurance Company',
//                 description: 'Product/Service Description',
//                 image: logo,
//                 handler: function (response) {
//                     const id_user = response.razorpay_payment_id;
//                     alert(id_user +" successfull generated");
//                     const userData = {
//                         // Populate with relevant data fields
//                         userId:id_user,
//                         planType: data.planType,
//                         relationType: data.relationType,
//                         members:data.members,
//                         duration: data.duration,
//                         insurence_cover:data.insurence_cover ,
//                         intrest:data.intrest
//                     };
//                     console.log('Sending request with userData:', userData);
            
//                     axios.post('http://localhost:9090/payment/addCustomer',userData)
//                     .then(response => {
//                         // Handle successful response
                        
//                         console.log('Response from backend:', response.data);
//                         // You can do something with the response here, such as redirecting the user or updating the UI
                      
//                     })
//                     .catch(error => {
//                         console.error('Error submitting form:', error);
//                         if (error.response) {
//                             console.log('Server responded with:', error.response.status, error.response.data);
//                         }
//                     });
                
                

//                 },
//                 prefill: {
//                     name: values.firstname,
//                     email: values.email,
//                     contact: values.contactNo,
//                 },
//                 // notes: {
//                 // address: userDetails.propertyflatNbr+" ," + userDetails.propertyStreet+" ,"+userDetails.propertyPincode,


//                 // },
//                 theme: {
//                     color: '#d87988',
//                 },
//             };
//             var pay = new window.Razorpay(options);
//              pay.open();
//         }
       
       
        
//     }

//     return (
//         <div>
//             <div className='container'>
//                 <div className='row'>
//                     <div className='col-sm-4'>
//                         <label>Select Payment Type</label>
//                     </div>
//                     <div className='col-sm-6 '>
//                         <input type='radio'
//                             name='option'
//                             value='Razor_Pay'
//                         />
//                         <label for='Razor_pay'>Razor_Pay</label>
//                         <input type='radio'
//                             name='option'
//                             value='card' disabled /><label for='card'>card</label>
//                     </div>
//                 </div>
//                 <div className='row'>

//                     <div className='col-2 d-flex justify-content-start mt-3 mb-2'>
//                         <button className='btn btn-success'  onClick={handleClick}>Proceed</button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Payment
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from './images/logoo.png';
import axios from 'axios';
import HealthinsurenceService from './HealthinsurenceService';


// import HealthinsurenceService from '../components/HealthinsurenceService'



function Payment() {
    const location = useLocation();
    const { data,values,amount } = location.state; // Destructure the required data from location state

    const handleClick = async () => {
        const { planType, relationType, members, duration, intrest, insurence_cover } = data;

        const options = {
            key: 'rzp_test_Su4WV4zdBIGTmZ',
            amount: amount * 100, // Amount in paise (e.g., 1000 paise = ₹10)
            name: 'RS Insurance Company',
            description: 'Product/Service Description',
            image: logo,
            prefill: {
                name: values.firstname,
                email: values.email,
                contact: values.contactNo
            },
            theme: {
                color: '#d87988'
            },
            handler: async function (response) {
                const paymentData = {
                    userId: response.razorpay_payment_id,
                    planType,
                    relationType: data.relationType.join(', '),
                    duration:duration+" Years",
                    insurence_cover:`\u20B9${data.insurence_cover}`+"L",
                    intrest:`\u20B9${data.intrest}`,
                };
               
               console.log('Sending request with userData:', paymentData);
               
                try {
                    // Send payment data to backend for processing
                //    HealthinsurenceService. addCustomer(paymentData);
                    const response = await axios.post(`http://localhost:9090/payment/addCustomer/${values.email}`, paymentData);
                    console.log('Payment processed successfully:', response.data);
                    // Handle success (e.g., show confirmation to user)
                } catch (error) {
                    console.error('Error processing payment:', error);
                    // Handle error (e.g., display error message)
                }
            }
        };

        var pay = new window.Razorpay(options);
        pay.open();
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-4'>
                    <label>Select Payment Type</label>
                </div>
                <div className='col-sm-6 '>
                    <input type='radio' name='option' value='Razor_Pay' />
                    <label htmlFor='Razor_pay'>Razor_Pay</label>
                    <input type='radio' name='option' value='card' disabled />
                    <label htmlFor='card'>Card</label>
                </div>
            </div>
            <div className='row'>
                <div className='col-2 d-flex justify-content-start mt-3 mb-2'>
                    <button className='btn btn-success' onClick={handleClick}>
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
