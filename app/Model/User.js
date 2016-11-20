'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
    static get dateFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }

    static get createTimestamp() {
        return 'created_at'
    }
}

module.exports = User
