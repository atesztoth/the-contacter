'use strict'

const Schema = use('Schema')

class CgroupTableSchema extends Schema {

    up() {
        this.create('cgroups', (table) => {
            table.increments()
            table.string('name').unique()
            table.timestamps()
        })
    }

    down() {
        this.drop('cgroups')
    }

}

module.exports = CgroupTableSchema
