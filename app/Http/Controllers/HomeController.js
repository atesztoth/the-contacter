'use strict'

const Database = use('Database')

class HomeController {

	* welcome(request, response) {
        const contacts = yield Database.select('*').from('contacts')
		yield response.sendView('home/home');
	}

}

module.exports = HomeController
