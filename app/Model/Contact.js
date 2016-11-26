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
        return this.belongsToMany('App/Model/Cgroup')
    }

    addresses() {
        return this.hasMany('App/Model/Address')
    }

    emails() {
        return this.hasMany('App/Model/Email')
    }

    image() {
        return this.hasOne('App/Model/Image')
    }

    tnums() {
        return this.hasMany('App/Model/Tnum')
    }
}

module.exports = Contact
