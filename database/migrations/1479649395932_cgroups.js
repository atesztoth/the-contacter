'use strict'

const Schema = use('Schema')

class CgroupTableSchema extends Schema {

    up() {
        this.create('cgroups', (table) => {
            table.increments()
            table.integer('user_id').unsigned().references('id').inTable('users') // for administration!
            table.string('name')
            table.timestamps()
        })
    }

    down() {
        this.drop('cgroups')
    }

}

module.exports = CgroupTableSchema
