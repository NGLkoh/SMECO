   
import axios from "axios";

export default async function handler(req, res) {
     try {
       const response = await axios.get('http://localhost:3001/user/Users');
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }