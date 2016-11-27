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
Route.route('/registration', ['GET', 'POST', 'HEAD'], 'HomeController.registration').as('regpage')
Route.get('/login', 'HomeController.login').as('login')
Route.post('/loginaction', 'HomeController.loginAction').as('loginAction')
Route.get('/logout', 'HomeController.logout').as('logout')

// Protected routes:
// Listing:
Route.get('/contacts', 'ContactController.list').as('contactList').middleware('auth')

// Adding:
Route.get('/contact/new-contact', 'ContactController.add').as('addContact').middleware('auth')
Route.post('/contact/save-contact', 'ContactController.saveAction').as('saveContactAction').middleware('auth')

// Editing:
Route.get('/contact/edit/:id', 'ContactController.edit').as('editContact').middleware('auth')

// Showing:
Route.get('/contact/:id', 'ContactController.show').as('showContact').middleware('auth')

// Contact groups:
Route.get('/contact-groups', 'CgroupController.list').as('contactGroups').middleware('auth')
Route.post('/contact-groups/save-group', 'CgroupController.saveAction').as('saveCgroup').middleware('auth')
Route.get('/contact-groups/remove-group/:id', 'CgroupController.removeAction').as('removeCgroup').middleware('auth')

// Misc (but important!):
Route.get('/serveimage/:imageName', 'ContactController.serveImage').as('imageServer').middleware('auth')