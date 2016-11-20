'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

    static get rules() {
        return {
            // username: 'required|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:6',
            // password2: 'requred|min:6'
        }
    }

    static get dateFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }

    static get createTimestamp() {
        return 'regdate'
    }

    apiTokens() {
        return this.hasMany('App/Model/Token')
    }

}

// Custom validation rule:
// const matches = function (data, field, message, args, get) {
//
//     return new Promise(function (resolve, reject) {
//
//         // get value of field under validation
//         const fieldValue = get(data, field)
//
//         // resolve if value does not exists, value existence
//         // should be taken care by required rule.
//         if(!fieldValue) {
//             return resolve('validation skipped')
//         }
//
//         // checking for username inside database
//         User
//             .where('username', fieldValue)
//             .then(function (result) {
//                 if(result){
//                     reject(message)
//                 }else{
//                     resolve('username does not exists')
//                 }
//             })
//             .catch(resolve)
//
//     })
//
// }

module.exports = User
