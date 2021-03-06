'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _boom = require('boom');

const BASE_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';

// @enum 
const difficulties = ['easy', 'medium', 'hard'];

// map category to number for trivia api
const categoryMapper = category => {
	switch (category) {
		case 'general':
			return 9;
		case 'books':
			return 10;
		case 'film':
			return 11;
		case 'music':
			return 12;
		case 'television':
			return 14;
		case 'video games':
			return 15;
		case 'board games':
			return 16;
		case 'computer science':
			return 18;
		case 'mathematics':
			return 19;
		case 'mythology':
			return 20;
		case 'sports':
			return 21;
		case 'geography':
			return 22;
		default:
			throw (0, _boom.badRequest)('invalid category');
	}
};

exports.default = (category = 'general', difficulty) => {
	// map category parameter
	const cat = categoryMapper(category);
	// form url
	let url = `${BASE_URL}&category=${cat}`;
	// optionally add difficulty param
	const diff = difficulties[difficulties.indexOf(difficulty)];
	if (diff) url += `&difficulty=${diff}`;
	// return formatted url
	return url;
};
//# sourceMappingURL=make-query.js.map
