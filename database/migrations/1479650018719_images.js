'use strict'

const Schema = use('Schema')

class IamgesTableSchema extends Schema {

    up() {
        this.create('images', (table) => {
            table.increments()
            table.integer('contact_id').unsigned().references('id').inTable('contacts')
            table.string('url')
            table.timestamps()
        })
    }

    down() {
        this.drop('images')
    }

}

module.exports = IamgesTableSchema
