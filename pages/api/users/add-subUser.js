   
import axios from "axios";
export default async function handler(req, res) {
	let { email, password, firstName, lastName, code, ids, businessPermit, barangayClearance } = req.body;
     console.log(email , " test")
     try {
       const response = await axios.post('http://localhost:3001/user/create', {
         username: email,
         password: password,
		 firstName: firstName,
		 lastName: lastName,
		 email: email,
		 code: code,
         businessPermit: businessPermit? businessPermit : "",
         barangayClearance: barangayClearance ? barangayClearance : "",
         profileSet: 0,
         active: false,
		 userType: 'sub-user',
		 ids: ids
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }