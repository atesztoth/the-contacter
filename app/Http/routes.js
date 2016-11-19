'use strict'

/*
 |--------------------------------------------------------------------------
 | Router
 |--------------------------------------------------------------------------
 |
 | AdonisJs Router helps you in defining urls and their actions. It supports
 | all major HTTP conventions to keep your routes file descriptive and
 | clean.
 |
 | @example
 | Route.get('/user', 'UserController.index')
 | Route.post('/user', 'UserController.store')
 | Route.resource('user', 'UserController')
 */

const Route = use('Route')

Route.get('/', 'HomeController.welcome') // Renders the view directly
Route.get('/registration', 'AuthController.registration').as('regpage')

// Route.get('/profile', 'UserController.profile').as('profile').middleware('auth')
// Route.get('/logout', 'UserController.doLogout').as('do_logout').middleware('auth')
// Route.post('/profile/edit', 'UserController.doProfileEdit').as('do_profile_edit').middleware('auth')