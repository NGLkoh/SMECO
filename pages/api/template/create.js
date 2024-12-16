   
import axios from "axios";
export const config = {

  api: {
     bodyParser:{ 
      sizeLimit: "50mb"
     }
  }
}

export default async function handler(req, res) {
const UAT_URL = process.env.UAT_URL;
	let { id, data, title, fileName, description } = req.body;
    const currentTime = new Date(); 
     try {
       const response = await axios.post(`${UAT_URL}/template/create`, {
         ids: id,
         title: title,
         data: data,
         fileName: fileName,
         description: description,
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