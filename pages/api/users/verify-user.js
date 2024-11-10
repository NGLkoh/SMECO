   
import axios from "axios";
export default async function handler(req, res) {
	let { id, value } = req.body;
     console.log(id , " test")
     try {
       const response = await axios.post('http://localhost:3001/user/confirm-verify', {
         id: id,  
         value: value
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }