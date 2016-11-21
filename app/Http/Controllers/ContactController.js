'use strict'

const Contact = use('App/Model/Contact')
const CGroup = use('App/Model/Cgroup')
const Validator = use('Validator')
const Email = use('App/Model/Email')

class ContactController {
    *list(request, response) {
        // We need to fetch all the exsisting contacts now
        // Fetch 'em directly into the list
        // About the categories: at this point, we don't care,
        // there is a dedicated view for that.

        const contacts = yield Contact.query().orderBy('created_at', 'desc').orderBy('firstname', 'asc').orderBy('surname', 'asc').fetch()
        console.log('-----------------')
        console.log(contacts.toJSON())

        yield response.sendView('contact/list', {
            contacts: contacts.toJSON()
        })
    }

    * add(request, response) {
        const CGroups = yield CGroup.all()

        yield response.sendView('contact/add', {
            cgroups: CGroups.toJSON()
        })
    }

    * addAction(request, response) {
        const contactData = request.all()
        const myMessages = {
            // TODO: MEGÍRNI EZEKET
        }
        const validation = yield Validator.validateAll(contactData, {
            firstname: 'required',
            surname: 'required',
            emailType: 'min:1',
            email: 'email'
        }, myMessages)


        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash()

            response.route('addContact')
            return;
        }

        const contact = new Contact()
        contact.firstname = contactData.firstname
        contact.surname = contactData.surname

        // Here comes the optional part
        if (contactData.email !== null) {
            const email = new Email();
            email.type = contactData.emailType
            email.email = contactData.email
            // contact.emails = {email} // TODO: RÁJÖNNI, HOGY HOGY KELL
        }

        yield contact.save()
        yield request.with({successMsg: 'Sikeres mentés!'}).flash()
        yield response.route('contactList')
    }
}

module.exports = ContactController
