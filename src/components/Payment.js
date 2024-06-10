
import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from './images/logoo.png';
import axios from 'axios';
import HealthinsurenceService from './HealthinsurenceService';
import { useState } from 'react';


// import HealthinsurenceService from '../components/HealthinsurenceService'



function Payment() {
    const location = useLocation();
    const { data,values,amount,familyMembers,individual,checkboxvalues,} = location.state; // Destructure the required data from location state

    const [selectedPayment, setSelectedPayment] = useState('');
    const handlePaymentChange = (event) => {
       
        setSelectedPayment(event.target.value);
      };
      const triggerBardeenWebhook = async (paymentData) => {
        try {
            // Trigger Bardeen webhook for email confirmation
            await axios.post('YOUR_BARDEEN_WEBHOOK_URL', {
                email: values.email,
                name: values.firstname,
                paymentId: paymentData.userId,
                amount: amount,
                planType: data.planType,
                relationType: paymentData.relationType,
                duration: data.duration,
                insurence_cover: data.insurence_cover,
                intrest: data.intrest,
            });
            console.log('Bardeen webhook triggered successfully');
        } catch (error) {
            console.error('Error triggering Bardeen webhook:', error);
        }
    };

    const handleClick = async () => {
        const { planType, relationType, members,familyMembers, duration, intrest, insurence_cover } = data;
    
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
              alert(response.razorpay_payment_id);
                const relationType = planType === 'individual' ? individual : (checkboxvalues ? checkboxvalues.join(', ') : '');

                const paymentData = {
                    userId: response.razorpay_payment_id,
                    planType,
                    relationType: relationType,
                    duration:duration+" Years",
                    insurence_cover:`\u20B9${data.insurence_cover}`+"L",
                    intrest:`\u20B9${data.intrest}`,
                };
               
               console.log('Sending request with userData:', paymentData);
               
                try {
                    // Send payment data to backend for processing
                //    HealthinsurenceService. addCustomer(paymentData);
                    const response = await axios.post(`http://192.168.1.48:9090/payment/addCustomer/${values.email}`, paymentData);
                    console.log('Payment processed successfully:', response.data);
                    // Handle success (e.g., show confirmation to user)
                    const invoiceData = {
                      logo: 'https://your-logo-url.com/logo.png',
                      from: "RS Insurance Company",
                      to: values.firstname,
                      items: [
                          {
                              name: `${planType} Insurance Plan`,
                              quantity: 1,
                              unit_cost: amount
                          }
                      ],
                      notes: `Policy Duration: ${duration} Years\nInterest: ₹${intrest}\nInsurance Cover: ₹${insurence_cover}L`,
                      currency: "INR"
                  };

                  const invoiceResponse = await axios.post('https://invoice-generator.com', invoiceData, {
                      headers: {
                          'Content-Type': 'application/json'
                      }
                  });

                  const invoiceUrl = invoiceResponse.data.invoice_url;
                  window.open(invoiceUrl, "_blank");
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
        <div>
          <div className='row'>
            <div className='col-sm-4'>
              <label>Select Payment Type</label>
            </div>
            <div className='col-sm-6 '>
              <input
                type='radio'
                name='option'
                value='Razor_Pay'
                onChange={handlePaymentChange}
              />
              <label htmlFor='Razor_Pay'>Razor_Pay</label>
              <input
                type='radio'
                name='option'
                value='card'
                disabled
                onChange={handlePaymentChange}
              />
              <label htmlFor='card'>Card</label>
            </div>
          </div>
          <div className='row'>
            <div className='col-2 d-flex justify-content-start mt-3 mb-2'>
              <button
                className='btn btn-success'
                onClick={handleClick}
                disabled={selectedPayment !== 'Razor_Pay'}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      );
}

export default Payment;
