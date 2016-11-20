'use strict'

const Lucid = use('Lucid')

class Contact extends Lucid {

    static get dateFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }

    static get createTimestamp() {
        return 'created_at'
    }

    cgroups() {
        // Since a contact can be a part of many cgroups, and vica versa, this is an n:m realitonship.
        this.belongsToMany('App/Model/Cgroup')
    }

    addresses() {
        this.hasMany('App/Model/Address')
    }

    emails() {
        this.hasMany('App/Model/Email')
    }

    images() {
        this.hasMany('App/Model/Image')
    }

    tnums() {
        this.hasMany('App/Model/Tnum')
    }
}

module.exports = Contact
