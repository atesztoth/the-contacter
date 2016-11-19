requirejs.config({
    baseUrl: 'bower',
    // shim: {
    //     'bootstrap': {'deps': ['jquery']} // jquery not supports amd (Oh shiet, from up to 1.7.* it does)
    // },
    paths: {
        whatInput: 'what-input/what-input.min',
        foundation: 'foundation-sites/dist/foundation.min',
        jquery: 'jquery/dist/jquery' // .min
    },
    shim: {
        'foundation': { // gotcha!
            deps: ['jquery'],
            exports: 'foundation'
        }
    }
});

// requirejs(['jquery'], function ($) {
//     console.log($) // OK
// });

requirejs(['jquery', 'whatInput', 'foundation'], function ($) {
    // $ is atteched to JQUERY! Evertyhing is ready to roll!
    // console.log($);
    console.log('If you see no error, that means everything is loaded correctly with its dependencies. Lets rock!');
});
