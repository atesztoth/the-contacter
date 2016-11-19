'use strict'

class AuthController {
    * registration(request, response) {
        yield response.sendView('auth/registration');
    }

    // * main(request, response) {
    //     // load all categories
    //     const categories = yield Category.all()
    //
    //     // for each category load the last 3 recipes
    //     for (let category of categories) {
    //         const latestRecipes = yield category.recipes().active().orderBy('id', 'desc').limit(3).fetch()
    //         category.latestRecipes = latestRecipes.toJSON()
    //     }
    //
    //     yield response.sendView('main', {
    //         categories: categories
    //             .filter(category => category.latestRecipes.length > 0)
    //             .toJSON()
    //     })
    // }
}

module.exports = AuthController
