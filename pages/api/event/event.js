   
import axios from "axios";

export default async function handler(req, res) {
const UAT_URL = process.env.UAT_URL;
     try {
       const response = await axios.post(`${UAT_URL}/event/all`);
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }