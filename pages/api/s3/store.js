   
import axios from "axios";

export default async function handler(req, res) {
const UAT_URL = process.env.UAT_URL;
	let { id, key } = req.body;
    const currentTime = new Date(); 

     try {
       const response = await axios.post(`${UAT_URL}/media/create`, {
         ids: id,
         key: key,
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