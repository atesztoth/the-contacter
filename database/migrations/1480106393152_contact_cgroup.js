'use strict'

const Schema = use('Schema')

class ContactCgroupTableSchema extends Schema {

    up() {
        this.create('contact_cgroup', (table) => {
            table.increments();
            table.integer('contact_id').unsigned().notNullable()
            table.integer('cgroup_id').unsigned().notNullable()
        })
    }

    down() {
        this.drop('contact_cgroup')
    }

}

module.exports = ContactCgroupTableSchema
