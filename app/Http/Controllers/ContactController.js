'use strict'

const path = require('path')

const Contact = use('App/Model/Contact')
const CGroup = use('App/Model/Cgroup')
const Validator = use('Validator')
const Email = use('App/Model/Email')
const Tnum = use('App/Model/Tnum')
const Address = use('App/Model/Address')
const Image = use('App/Model/Image')
const Helpers = use('Helpers')
const fs = use('fs')
const Database = use('Database')

class ContactController {

    * list(request, response) {
        // We need to fetch all the exsisting contacts now
        // Fetch 'em directly into the list
        // About the categories: at this point, we don't care,
        // there is a dedicated view for that.

        const contacts = yield Contact.query().orderBy('created_at', 'desc').orderBy('firstname', 'asc').orderBy('surname', 'asc').fetch()
        // console.log('-----------------')
        // console.log(contacts.toJSON())

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

    * show(request, response) {
        const contactID = request.param('id')
        const theContact = yield Contact.find(contactID)

        if (theContact) {
            // If we could find the contact we were looking for, then we can load all
            // the realted models:
            yield theContact.related('cgroups', 'emails', 'addresses', 'image', 'tnums').load() // Lazy Eager load

            console.log(theContact.toJSON())

        } else {
            response.notFound('A keresett kontakt nem található.')
        }

        yield response.sendView('contact/show', {
            contact: theContact.toJSON()
        })
    }

    * saveAction(request, response) {
        const contactData = request.all()
        const myMessages = {
            'firstname.required': 'A keresztnév megadása kötelező!',
            'surname.required': 'A vezetéknév megadása kötelező!'
        }
        const validation = yield Validator.validateAll(contactData, {
            firstname: 'required',
            surname: 'required'
        }, myMessages)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({
                    errors: validation.messages()
                })
                .flash()

            response.route('addContact')
            return;
        }

        // Init contact
        let contact = null

        if (typeof contactData.editFlag !== 'undefined' && contactData.editFlag > 0) {
            // Let the user edit only his own contacts.
            contact = yield Contact.find(contactData.editFlag)

            if (contact) {
                // Redirecting if he is doing some monkey business:
                if (contact.created_by_id !== request.currentUser.id) {
                    response.unauthorized('Hozzáférés megtagadva.')
                    return
                }

                // Delete all the current data from the table.
                // This is neccessary, otherwise I wouldn't be able to
                // preserve only the newly specified information. This sucks. 
                // But with these frontend limitations, I cannot do anything else.
                // Every other thing I've tought of are too complicated.

                yield contact.related('cgroups', 'emails', 'addresses', 'image', 'tnums').load() // Lazy Eager load
                yield Database.table('cgroups').where('contact_id', contact.id).del() // delete is a js/es reserved keyword
                yield Database.table('emails').where('contact_id', contact.id).del()
                yield Database.table('tnums').where('contact_id', contact.id).del()
                yield Database.table('addresses').where('contact_id', contact.id).del()
            } else {
                response.notFound('A keresett kontakt nem található.')
                return
            }

        } else {
            contact = new Contact()
        }

        contact.created_by_id = request.currentUser.id
        contact.firstname = contactData.firstname.trim()
        contact.surname = contactData.surname.trim()

        if (contactData.nickname !== null) { // Yes, this is optional.
            contact.nickname = contactData.nickname.trim()
        }

        // Optional comment
        if (typeof contactData.comment === 'undefined') {
            contact.comment = null
        } else {
            contact.comment = contactData.comment.trim()
        }

        // Handling the image
        let weHaveAnImage = false;
        const image = new Image()
        const requestFile = request.file('profileImage').toJSON()

        if (requestFile.size > 0) {
            // Existing image? Ok, it is only possible if it is not a new contact object,
            // which means we are editing one, witch means the contactData.editFlag must
            // be a number > 0.
            if (typeof contactData.editFlag !== 'undefined' && contactData.editFlag > 0) {
                let oldImage = contact.toJSON().image

                console.log(oldImage)

                // Just to make it absolutely sure:
                if (oldImage.id > 0) {
                    let imagePath = path.join(Helpers.storagePath('p_images'), oldImage.url)
                    console.log(imagePath)
                    try {
                        fs.accessSync(imagePath, fs.F_OK)
                        fs.unlinkSync(imagePath)
                        yield Database.table('images').where('id', oldImage.id).delete()
                    } catch (e) {
                        console.log('I could not delete an old image!')
                        response.badRequest({
                            error: e
                        })
                    }
                }
            }

            const profileImage = request.file('profileImage', {
                maxSize: '5mb',
                allowedExtensions: ['jpg', 'JPG', 'png']
            })

            console.log(profileImage)

            const fileName = `${new Date().getTime()}.${profileImage.extension()}`

            if (profileImage.clientSize() > 0 && !profileImage.validate()) {
                yield request
                    .withAll()
                    .andWith({
                        errors: [{
                            message: profileImage.errors()
                        }]
                    })
                    .flash()

                response.route('addContact')
                return
            }

            // First lets check if my directory exists: (by default, since the storage folder is used as a temporary folder, nothing
            // is kept inside it in git, it wont. Lets create it then.)
            try {
                fs.accessSync(Helpers.storagePath('p_images'), fs.F_OK); // is accessible?
            } catch (e) {
                // Then create
                try {
                    fs.mkdirSync(Helpers.storagePath('p_images'));
                } catch (e) {
                    // if (e.code != 'EEXIST') throw e;
                    if (e.code !== 'EEXIST') {
                        response.badRequest({
                            error: 'Belső hiba történt!'
                        })
                    }
                }
            }

            // console.log(Helpers.storagePath('p_images'), fileName)
            // The following function is just too fancy-ass to give any useable
            // error messages, so I went as far as using a built-in nodejs funciton,
            // that could give me some useable error messages.
            // I got fixed the (EXDEV) error in like 3 minutes with a bit of googleing,
            // but spent 2 hours on NOTHING because of this b*tchass function underneath.
            // Hellyeah... I've put far more time in this than I should have had.
            yield profileImage.move(Helpers.storagePath('p_images'), fileName)

            // Gonna do that:
            // fs.renameSync(requestFile.path, path.join(Helpers.storagePath('p_images'), fileName))

            if (!profileImage.moved()) {
                console.log('The image could not be moved!!')
                response.badRequest({
                    error: profileImage.errors()
                })
                return
            }

            // image.url = path.join('p_images', fileName)
            // I am doing some cool routes for the images, lets just store the name of the image!
            image.url = fileName
            weHaveAnImage = true
            // console.log(weHaveAnImage + " <-- Do we have an image?")
        }

        // BEFORE we store the contact we store the image. So if any validation fails on the image,
        // the contact wont be stored.
        yield contact.save()

        if (weHaveAnImage) {
            // console.log('--------------------> trying to save the image')
            // console.log(image)
            yield contact.image().save(image)
        }

        // Here comes the optional part
        if (typeof contactData.emails !== 'undefined') {
            if (contactData.emails.indexOf('#') !== -1) {
                // Then we have to split this thing apart
                const emails = contactData.emails.trim().split('#');

                // Iterate through every email submitted with its type:
                for (let typeMail of emails) {
                    let helper = typeMail.split('-')
                    let emailObj = new Email()
                    emailObj.type = helper[0];
                    emailObj.email = helper[1];

                    yield contact.emails().save(emailObj)
                }
            } else {
                let pieces = contactData.emails.trim().split('-')

                let email = new Email();
                email.type = pieces[0];
                email.email = pieces[1];

                yield contact.emails().save(email)
            }
        } else {
            // I am doing these else statements, so we can delete content here
            // from the editing page.
            comment.emails = null
        }

        if (typeof contactData.tnums !== 'undefined') {
            if (contactData.tnums.indexOf('#') !== -1) {
                // Then we have to split this thing apart
                const tnums = contactData.tnums.trim().split('#');

                for (let typeNum of tnums) {
                    let helper = typeNum.split('-')
                    let numberObj = new Tnum()
                    numberObj.type = helper[0];
                    numberObj.number = helper[1];

                    yield contact.tnums().save(numberObj)
                }
            } else {
                let pieces = contactData.tnums.trim().split('-')

                let tnum = new Tnum();
                tnum.type = pieces[0];
                tnum.number = pieces[1];

                yield contact.tnums().save(tnum)
            }
        } else {
            comment.tnums = null
        }

        if (typeof contactData.addresses !== 'undefined') {
            if (contactData.addresses.indexOf('#') !== -1) {
                // Then we have to split this thing apart
                const addresses = contactData.addresses.trim().split('#');

                for (let typeAddress of addresses) {
                    let helper = typeAddress.split('-')
                    let addressObj = new Address()
                    addressObj.type = helper[0];
                    addressObj.address = helper[1];

                    yield contact.addresses().save(addressObj)
                }
            } else {
                let pieces = contactData.addresses.trim().split('-')

                let address = new Address();
                address.type = pieces[0];
                address.address = pieces[1];

                yield contact.addresses().save(address)
            }
        } else {
            comment.addresses = null
        }

        yield request.with({
            successMsg: 'Sikeres mentés!'
        }).flash()
        yield response.route('contactList')
    }

    * edit(request, response) {
        let dataForView = {}
        const contactID = request.param('id')
        const theContact = yield Contact.find(contactID)
        let contactForView

        if (theContact) {
            yield theContact.related('cgroups', 'emails', 'addresses', 'image', 'tnums').load() // Lazy Eager load

            contactForView = theContact.toJSON()
            // console.log(contactForView)

            // Redirecting if he is doing some monkey business:
            if (contactForView.created_by_id !== request.currentUser.id) {
                response.unauthorized('Hozzáférés megtagadva.')
            }

            contactForView.emails = this.mySerializer(theContact.toJSON().emails, ['type', 'email'])
            contactForView.tnums = this.mySerializer(theContact.toJSON().tnums, ['type', 'number'])
            contactForView.addresses = this.mySerializer(theContact.toJSON().addresses, ['type', 'address'])

            dataForView['contact'] = contactForView
            dataForView['editMode'] = true

        } else {
            response.notFound('A keresett kontakt nem található.')
        }

        yield response.sendView('contact/add', dataForView)
    }

    * serveImage(request, response) {
        const imageName = request.param('imageName')

        response.download(Helpers.storagePath(path.join('p_images', imageName)))
    }

    mySerializer(object, fieldNames) {
        // Give me an array of objects!
        // If you have one object, than: [{feelGood}]
        let rowArray = []

        // We shoud return only one string that contains all the data
        // contactenated, and separated by # symbols.
        for (let o of object) {
            let oneRow = []
            for (let fieldName of fieldNames) {
                if (typeof o[fieldName] !== 'undefined' && o[fieldName] !== null) {
                    oneRow.push(o[fieldName])
                }
            }
            rowArray.push(oneRow.join('-'))
        }

        console.log('##########################################################')
        console.log('mySerializer returned with string: ' + rowArray.join('#'))
        return rowArray.join('#')
    }
}

module.exports = ContactController