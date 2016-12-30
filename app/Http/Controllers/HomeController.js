'use strict'

const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class HomeController {

    * welcome(request, response) {
        // If the user is logged in, redirect him instantly!
        if (yield request.auth.check()) {
            yield response.route('contactList')
        }

        const Contact = use('App/Model/Contact')
        const CGroup = use('App/Model/CGroup')

        yield response.sendView('home/home');
    }

    * registration(request, response) {
        let ajaxMode = false
        const user = new User()
        const userData = request.all()
        const myMessages = {
            email: 'Kérem e-mail címet adjon meg!',
            required: 'A mező kitöltése kötelező.',
            unique: 'Már van ilyen felhasználónév.',
            'password.equals': 'A jelszavak nem egyeznek.',
            min: 'A jelszavaknak minimum 6 karakter hosszúnak kell lenniük.',
            same: 'A jelszavaknak meg kell egyezniük!'
        }
        const rules = {
            // username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:6',
            password2: 'required|min:6|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules, myMessages)

        // look for AJAX call:
        if (Object.prototype.hasOwnProperty.call(userData, 'ajaxsign')) { // true
            ajaxMode = true
        }

        if (request.method() === 'POST') {
            if (validation.fails()) {

                if (ajaxMode) {
                    // then we should give a json answer:
                    let answerObject = {
                        result: 0,
                        errors: validation.messages()
                    }

                    response.json(answerObject)
                }

                yield request
                    .withAll()
                    .andWith({
                        errors: validation.messages()
                    })
                    .flash()

                response.route('regpage')
                return
            } else {
                user.email = userData.email;
                user.password = yield Hash.make(userData.password)

                yield user.save()

                if (ajaxMode) {
                    // then we should give a json answer:
                    let answerObject = {
                        result: 1,
                        errors: []
                    }

                    response.json(answerObject)
                    return
                }

                yield request.with({successMsg: 'Sikeres regisztráció! Mostmár bejelentkezhet az oldalra.'}).flash()
                response.redirect('/')
                return
            }
        }

        yield response.sendView('home/registration')
    }

    * login(request, response) {
        yield response.sendView('home/login')
    }

    * loginAction(request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            yield request.auth.attempt(email, password)
            yield request.with({successMsg: 'Sikeres bejelentkezés!'}).flash()

            response.route('contactList')
        } catch (e) {
            yield request.withAll().andWith({errors: [e]}).flash()
            response.redirect('back') // Ehhez nem kell yield, ez okozta a header módosítási hibát!
        }
    }

    * logout(request, response) {
        yield request.auth.logout()

        yield response.redirect('/')
    }

}

module.exports = HomeController
