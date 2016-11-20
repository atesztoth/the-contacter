'use strict'

const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')

class HomeController {

    * welcome(request, response) {
        yield response.sendView('home/home');
    }

    * registration(request, response) {
        const userData = request.all();
        const myMessages = {
            email: 'Kérem e-mail címet adjon meg!',
            required: 'A mező kitöltése kötelező.',
            unique: 'Már van ilyen felhasználónév.',
            'password.equals': 'A jelszavak nem egyeznek.',
            min: 'A jelszavaknak minimum 6 karakter hosszúnak kell lenniük.'
        }
        const validation = yield Validator.validateAll(userData, User.rules, myMessages)
        var data = {
            'errors': {}
        };
        const u = new User();

        if (request.method() === 'POST') {
            if(validation.fails()) {
                data['errors'] = validation.messages();
            } else {

            }

        }

        yield response.sendView('home/registration', data);
    }

}

module.exports = HomeController
