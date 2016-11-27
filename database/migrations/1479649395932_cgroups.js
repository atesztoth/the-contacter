'use strict'

const Schema = use('Schema')

class CgroupTableSchema extends Schema {

    up() {
        this.create('cgroups', (table) => {
            table.increments()
            table.integer('user_id').unsigned().references('id').inTable('users')
            table.string('name').unique()
            table.timestamps()
        })
    }

    down() {
        this.drop('cgroups')
    }

}

module.exports = CgroupTableSchema
