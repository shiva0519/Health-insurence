import React from 'react'
import { useLocation } from 'react-router-dom';
import logo from './images/logoo.png'

function Payment() {

    const location = useLocation();
    const { values, percentage_value, percentage_value2, amount } = location.state;


    const handleClick = () => {
        if (true) {
            const options =
            {
                key: 'rzp_test_Su4WV4zdBIGTmZ',
                key_secret: 'EmH6eToe5CvCfAfgfADREv3C',
                amount: amount*100, // Amount in paise (e.g., 1000 paise = Ã¢â€šÂ¹10)
                name: 'RS Insurance Company',
                description: 'Product/Service Description',
                image: logo,
                handler: function (response) {

                    alert(response.razorpay_payment_id);


                },
                prefill: {
                    name: values.firstname,
                    email: values.email,
                    contact: values.contactNo,
                },
                // notes: {
                // address: userDetails.propertyflatNbr+" ," + userDetails.propertyStreet+" ,"+userDetails.propertyPincode,


                // },
                theme: {
                    color: '#F37254',
                },
            };
            var pay = new window.Razorpay(options);
             pay.open();
           
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <label>Select Payment Type</label>
                    </div>
                    <div className='col-sm-6 '>
                        <input type='radio'
                            name='option'
                            value='Razor_Pay'
                        />
                        <label for='Razor_pay'>Razor_Pay</label>
                        <input type='radio'
                            name='option'
                            value='card' disabled /><label for='card'>card</label>
                    </div>
                </div>
                <div className='row'>

                    <div className='col-2 d-flex justify-content-start mt-3 mb-2'>
                        <button className='btn btn-success'  onClick={handleClick}>Proceed</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
