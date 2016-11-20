'use strict'

const Lucid = use('Lucid')

class Tnum extends Lucid {
    contacts() {
        this.belongsTo('App/Model/Contact')
    }
}

module.exports = Tnum
