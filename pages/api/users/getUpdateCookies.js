import Cookies from 'cookies'

export default async function(req, res) {
  	let { user } = req.body;
    const cookies = new Cookies(req, res)
    const cookies_value = cookies.get('userData')
    cookies.set('userData', JSON.stringify(user))
	return res.status(200).json(cookies_value)
}