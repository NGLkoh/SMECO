   
import axios from "axios";

export default async function handler(req, res) {
     	let { ids, userId } = req.body;
     try {
       const response = await axios.post('http://localhost:3001/event/updateUsersEventById', {
         ids: ids,
         userId: userId
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }