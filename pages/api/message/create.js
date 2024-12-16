   
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
	let { message, id, userId,name } = req.body;
    const currentTime = new Date(); 
     try {
       const response = await axios.post(`${UAT_URL}/message/create`, {
		"convo": [
			{message: message, id:  id, name : name},
            {message: "Admin will reply soon.", id:  "123", name : "System"}
		],
		"users": [
			 id, userId
		],
		"createdBy": id,
        "dateCreated": currentTime
		},
         	);
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }