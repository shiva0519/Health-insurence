import axios from "axios";
const payment_url='http://localhost:9090/payment'
const register='http://localhost:9090/register'

class HealthinsurenceService{

    static addCustomer( addCustomer){
        return axios.post(payment_url+"/"+addCustomer)
    }
    
}
export default new HealthinsurenceService();



// function HealthinsurenceService() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default HealthinsurenceService



