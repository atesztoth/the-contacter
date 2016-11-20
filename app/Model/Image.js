'use strict'

const Lucid = use('Lucid')

class Image extends Lucid {
    contacts() {
        this.belongsTo('App/Model/Contact')
    }
}

module.exports = Image
