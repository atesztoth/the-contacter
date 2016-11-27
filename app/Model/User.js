'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    static get rules() {
        return {
            // username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:6',
            password2: 'required|min:6|same:password'
        }
    }

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
