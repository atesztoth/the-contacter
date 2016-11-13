requirejs.config({
    baseUrl: 'bower',
    // shim: {
    //     'bootstrap': {'deps': ['jquery']} // jquery not supports amd (Oh shiet, from up to 1.7.* it does)
    // },
    paths: {
        bootstrap: 'bootstrap/dist/js/bootstrap',
        jquery: 'jquery/dist/jquery' // .min
    }
});

// requirejs(['jquery'], function ($) {
//     console.log($) // OK
// });

// requirejs(['jquery','bootstrap'], function($) {
//     console.log($('body').modal());
// });
