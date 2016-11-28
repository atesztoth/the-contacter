'use strict'

const Schema = use('Schema')

class CgroupContactTableSchema extends Schema {

    up() {
        this.create('cgroup_contact', (table) => {
            table.increments();
            table.integer('contact_id').unsigned().notNullable()
            table.integer('cgroup_id').unsigned().notNullable()
        })
    }

    down() {
        this.drop('cgroup_contact')
    }

}

module.exports = CgroupContactTableSchema
