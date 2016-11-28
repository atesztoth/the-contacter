'use strict'

const Database = use('Database')
const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class HomeController {

    * welcome(request, response) {
        // If the user is logged in, redirect him instantly!
        if (yield request.auth.check()) {
            response.route('contactList')
        }

        const Contact = use('App/Model/Contact')
        const CGroup = use('App/Model/CGroup')

        /* EXPREIMENT:
         let contact = new Contact()
         let cg = new CGroup()
         let cg2 = new CGroup()
         contact.firstname = 'Attila'
         contact.surname = 'Tóth'
         cg.name = 'Faf'
         cg2.name = 'asdasd'

         yield contact.save()
         yield cg.save()
         yield cg2.save()

         const cnt = yield Contact.find(1)
         const cgids = yield CGroup.query().whereIn('id', [1, 2]).ids()

         yield cnt.cgroups().sync(cgids)

         // Getting related cgroups:
         // we know the cnt object, so:
         let cgroups = yield cnt.cgroups().fetch()

         yield response.json(cgroups)*/

        yield response.sendView('home/home');
    }

    * registration(request, response) {
        const user = new User();
        const userData = request.all();
        const myMessages = {
            email: 'Kérem e-mail címet adjon meg!',
            required: 'A mező kitöltése kötelező.',
            unique: 'Már van ilyen felhasználónév.',
            'password.equals': 'A jelszavak nem egyeznek.',
            min: 'A jelszavaknak minimum 6 karakter hosszúnak kell lenniük.',
            same: 'A jelszavaknak meg kell egyezniük!'
        }
        const validation = yield Validator.validateAll(userData, User.rules, myMessages)
        let data = {
            'errors': {}
        }

        if (request.method() === 'POST') {
            if (validation.fails()) {
                data['errors'] = validation.messages();
            } else {
                user.email = userData.email;
                user.password = yield Hash.make(userData.password)

                yield user.save()
                yield request.with({regresponse: 'success'}).flash()
                response.redirect('/')
                return
            }
        }

        yield response.sendView('home/registration', data);
    }

    * login(request, response) {
        yield response.sendView('home/login')
    }

    * loginAction(request, response) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            yield request.auth.attempt(email, password)

            response.route('contactList')
        } catch (e) {
            yield request.with({error: e.message}).flash()
            response.redirect('back')
        }
    }

    * logout(request, response) {
        yield request.auth.logout()
        yield response.sendView('home/home')
    }

}

module.exports = HomeController
