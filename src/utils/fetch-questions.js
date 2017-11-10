import axios from 'axios'
import boom from 'boom'

export default async (queryUrl) => {
	try {
		// get request
		const { data } = await axios.get(queryUrl)
		// check response code
		if (data.response_code !== 0) throw new Error()
		// return results
		return data.results
	} catch (err) {
		// rethrow as external error
		throw new boom.badGateway('error fetching questions')
	}
}
