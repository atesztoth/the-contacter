'use strict'

class HomeController {

	* welcome(request, response) {
		yield response.sendView('home/home');
	}

}

module.exports = HomeController
