import axios from 'axios'

export const getCookiesData = async () => {
    const res = await axios.post('/api/users/getCookies')
	return res.data
}