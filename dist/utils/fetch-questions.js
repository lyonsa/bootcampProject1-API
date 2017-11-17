'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
	var _ref = _asyncToGenerator(function* (queryUrl) {
		try {
			// get request
			var _ref2 = yield _axios2.default.get(queryUrl);

			const data = _ref2.data;
			// check response code

			if (data.response_code !== 0) throw new Error();
			const questions = data.results;
			// format answers to map
			const formattedQuestions = questions.map(function (question) {
				// format answers
				const answers = [];
				answers.push([question.correct_answer, true]);
				question.incorrect_answers.forEach(function (answer) {
					return answers.push([answer, false]);
				});
				// shuffle answers
				for (let i = answers.length - 1; i > 0; i--) {
					const rand = Math.floor(Math.random() * (i + 1));
					const tmp = answers[i];
					answers[i] = answers[rand];
					answers[rand] = tmp;
				}
				// clear old properties
				delete question.incorrect_answers;
				delete question.correct_answer;
				question.answers = answers;
				return question;
			});
			// return results
			return formattedQuestions;
		} catch (err) {
			// rethrow as external error
			throw (0, _boom.badGateway)('error fetching questions');
		}
	});

	return function (_x) {
		return _ref.apply(this, arguments);
	};
})();
//# sourceMappingURL=fetch-questions.js.map
