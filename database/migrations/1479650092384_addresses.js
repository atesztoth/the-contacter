'use strict'

const Schema = use('Schema')

class AddressesTableSchema extends Schema {

    up() {
        this.create('addresses', (table) => {
            table.increments()
            table.integer('contact_id').unsigned().references('id').inTable('contacts')
            table.string('type')
            table.string('address')
            table.timestamps()
        })
    }

    down() {
        this.dropIfExists('addresses')
    }

}

module.exports = AddressesTableSchema
