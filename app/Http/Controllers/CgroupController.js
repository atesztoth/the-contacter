'use strict'

const Validator = use('Validator')
const Cgroup = use('App/Model/Cgroup') // Models are IoC aware!

class CgroupController {
    *list(rq, rs) {
        let data = []

        // lets get these cgroups
        const user = rq.currentUser
        const cgroups = yield user.cgroups().fetch()

        console.log(cgroups.toJSON())

        data['cgroups'] = cgroups.toJSON()

        yield rs.sendView('cgroup/list', data)
    }

    * saveAction(request, response) {
        const currentUser = request.currentUser
        const postData = request.all()
        const myMessages = {
            required: 'A csoport nevének megadása kötelező!',
            min: 'Minimum 3 karaktert kell megadnia.'
        }
        const validation = yield Validator.validateAll(postData, {
            cgname: 'required|min:3'
        }, myMessages)

        console.log(postData)

        if (validation.fails()) {
            yield request
                .withAll()
                .andWith({
                    errors: validation.messages()
                })
                .flash()

            response.route('contactGroups')
            return;
        }

        // Create new contact group
        const cgroup = new Cgroup()
        cgroup.name = postData.cgname

        // How do we save it?
        // Lets relate it to our user.
        yield currentUser.cgroups().save(cgroup)

        yield request.with({
            successMsg: 'Sikeres mentés!'
        }).flash()
        yield response.route('contactGroups')
    }

    * removeAction(request, response) {
        const cgid = request.param('id')
        const cuser = request.currentUser

        console.log(cgid)

        // First, lets get the category we are about to elminiate.
        const cgroup = yield Cgroup.find(cgid)
        console.log(cgroup)

        if (cgroup) {
            // It automatically removes connection between contacts<->cgroups. Beautiful to see aawwhh.
            yield cgroup.delete()
        } else {
            yield request
                .with({
                    errors: 'Nincs ilyen csoport!'
                })
                .flash()

            response.route('contactGroups')
            return
        }

        yield request.with({
            successMsg: 'Sikeres törlés!'
        }).flash()
        yield response.route('contactGroups')
    }
}

module.exports = CgroupController
