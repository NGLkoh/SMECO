   
import axios from "axios";

export default async function handler(req, res) {
const UAT_URL = process.env.UAT_URL;
	let { featuredBanner, featuredTitle, featuredDecs, contactAddress,contactMobile, contactEmail, contactfacebook} = req.body;
     try {
       const response = await axios.post(`${UAT_URL}/web/create`, {
       	        featuredBanner: featuredBanner,
				featuredTitle: featuredTitle,
				featuredDecs: featuredDecs,
				contactAddress: contactAddress,
				contactMobile: contactMobile,
				contactEmail: contactEmail,
				contactfacebook: contactfacebook
         // add more data if needed
       });
       console.log(response.data);
       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error.response.status).json({ message: error.message });
     }
   }