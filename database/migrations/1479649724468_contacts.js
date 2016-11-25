'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

    up() {
        this.create('contacts', (table) => {
            table.increments()
            table.integer('cgroup_id').unsigned().references('id').inTable('cgroups')
            table.string('url_string')
            table.string('surname')
            table.string('firstname')
            table.string('nickname')
            table.text('comment')
            table.timestamps()
        })
    }

    down() {
        this.drop('contacts')
    }

}

module.exports = ContactsTableSchema
