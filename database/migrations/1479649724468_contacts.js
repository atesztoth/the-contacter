'use strict'

const Schema = use('Schema')

class ContactsTableSchema extends Schema {

    up() {
        this.create('contacts', (table) => {
            table.increments()
            // table.integer('cgroup_id').unsigned().references('id').inTable('cgroups')
            table.integer('created_by_id').unsigned().references('id').inTable('users') // for administration
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
