   
import axios from "axios";

export default async function handler(req, res) {
	let { title, details, link } = req.body;
    const UAT_URL = process.env.UAT_URL;
     try {
       const response = await axios.post(`${UAT_URL}/search/create`, {
         title: title,
		 details: details,
         link: link
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }