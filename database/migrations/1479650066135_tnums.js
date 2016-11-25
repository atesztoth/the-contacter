'use strict'

const Schema = use('Schema')

class TnumsTableSchema extends Schema {

    up() {
        this.create('tnums', (table) => {
            table.increments()
            table.integer('contact_id').unsigned().references('id').inTable('contacts')
            table.string('type')
            table.string('number')
            table.timestamps()
        })
    }

    down() {
        this.drop('tnums')
    }

}

module.exports = TnumsTableSchema
