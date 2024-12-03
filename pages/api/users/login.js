   
import axios from "axios";
import Cookies from "cookies";

export default async function handler(req, res) {
const UAT_URL = process.env.UAT_URL;
	let { username, password } = req.body;
     console.log(username , " test")
     try {
       const response = await axios.post(`${UAT_URL}/user/search`, {
         username: username,
         password: password,
         // add more data if needed
       });
       console.log(response.data, 'dsdsd');
	   let data = response.data.result[0]
	  if(data) {
       if(data.active) {
		const cookie = new Cookies(req, res)
		cookie.set('auth',response.data.message, {httpOnly: true})
		cookie.set('userData', JSON.stringify(data))
       } }

       res.status(200).json(response.data);
     } catch (error) {
       console.log(error);
       res.status(error).json({ message: error.message });
     }
   }