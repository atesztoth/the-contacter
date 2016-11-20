'use strict'

const Lucid = use('Lucid')

class Address extends Lucid {
    contacts() {
        this.belongsTo('App/Model/Contact')
    }
}

module.exports = Address
