'use strict'

const Lucid = use('Lucid')

class Email extends Lucid {
    contacts() {
        this.belongsTo('App/Model/Contact')
    }
}

module.exports = Email
