import Cookies from 'cookies'

	export default async function(req, res) {
		const cookies = new Cookies(req, res)
		cookies.set('auth')
        cookies.set('userData')
	   return res.status(200).redirect(200, "/login")
	}