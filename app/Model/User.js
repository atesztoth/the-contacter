'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    static get dateFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }

    static get createTimestamp() {
        return 'regdate'
    }

    contacts() {
        return this.hasMany('App/Model/Contact')
    }

    cgroups() {
        return this.hasMany('App/Model/Cgroup')
    }

    apiTokens() {
        return this.hasMany('App/Model/Token')
    }

}

module.exports = User
