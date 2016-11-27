'use strict'

const Lucid = use('Lucid')

class Cgroup extends Lucid {


    static get dateFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }

    static get createTimestamp() {
        return 'created_at'
    }

    contacts() {
        return this.hasMany('App/Model/Contact');
    }

    users() {
        return this.belongsToMany('App/Model/User')
    }
}

module.exports = Cgroup
