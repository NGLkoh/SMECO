   
import axios from "axios";

export default async function handler(req, res) {
	let { id, title, description, fileName } = req.body;
    const currentTime = new Date(); 

     try {
       const response = await axios.post('http://localhost:3001/event/create', {
         ids: id,
         title: title,
		 date: currentTime,
         description: description, 
         fileName: fileName, 
         users: []
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }