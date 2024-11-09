   
import axios from "axios";

export default async function handler(req, res) {
	let { id } = req.body;
     try {
       const response = await axios.post('http://localhost:3001/media/search', {
         ids: id
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }