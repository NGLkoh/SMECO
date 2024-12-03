import Cookies from 'cookies'

export default async function(req, res) {
	const cookies = new Cookies(req, res)
	const cookies_value = cookies.get('userData')

	return res.status(200).json(cookies_value)
	
}