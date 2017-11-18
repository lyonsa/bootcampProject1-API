import axios from 'axios'
import boom, { badGateway } from 'boom'

export default async (queryUrl) => {
	try {
		// get request
		const { data } = await axios.get(queryUrl)
		// check response code
		if (data.response_code !== 0) throw new Error()
		const questions = data.results
		// format answers to map
		const formattedQuestions = questions.map(question => {
			// format answers
			const answers = []
			answers.push([question.correct_answer, true])
			question.incorrect_answers.forEach(answer =>
				answers.push([answer, false])
			)
			// shuffle answers
			for (let i = answers.length - 1; i > 0; i--) {
				const rand = Math.floor(
					Math.random() * (i + 1)
				)
				const tmp = answers[i]
				answers[i] = answers[rand]
				answers[rand] = tmp
			}
			// clear old properties
			delete question.incorrect_answers
			delete question.correct_answer
			question.answers = answers
			return question
		})
		// return results
		return formattedQuestions
	} catch (err) {
		// rethrow as external error
		throw badGateway('error fetching questions')
	}
}
