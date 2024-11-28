   
import axios from "axios";
export default async function handler(req, res) {
	let { id, data} = req.body;
     try {
       const response = await axios.post('http://localhost:3001/user/edit-profile-blog', {
         id: id,
         data: data
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }