   
import axios from "axios";

export default async function handler(req, res) {
	let { id, message, email } = req.body;
    const currentTime = new Date(); 

     try {
       const response = await axios.post('http://localhost:3001/comment/create', {
         ids: id,
         message: message,
          email: email,
		 date: currentTime
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }