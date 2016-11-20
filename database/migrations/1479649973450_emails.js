'use strict'

const Schema = use('Schema')

class EmailsTableSchema extends Schema {

  up () {
    this.create('emails', (table) => {
      table.increments()
      table.string('type')
      table.string('email')
      table.timestamps()
    })
  }

  down () {
    this.drop('emails')
  }

}

module.exports = EmailsTableSchema
