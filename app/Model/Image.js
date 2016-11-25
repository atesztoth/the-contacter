'use strict'

const Lucid = use('Lucid')

class Image extends Lucid {
    contacts() {
       return this.belongsTo('App/Model/Contact')
    }
}

module.exports = Image
