requirejs.config({
    baseUrl: '/bower',
    // shim: {
    //     'bootstrap': {'deps': ['jquery']} // jquery not supports amd (Oh shiet, from up to 1.7.* it does)
    // },
    paths: {
        whatInput: 'what-input/dist/what-input.min',
        foundation: 'foundation-sites/dist/js/foundation.min',
        jquery: 'jquery/dist/jquery', // .min
        fTooltip: 'foundation-sites/dist/js/plugins/foundation.tooltip.min', // 1st function for third "homework"
        fUtilBox: 'foundation-sites/dist/js/plugins/foundation.util.box',
        fUtilMediaQuery: 'foundation-sites/dist/js/plugins/foundation.util.mediaQuery',
        fUtilTriggers: 'foundation-sites/dist/js/plugins/foundation.util.triggers'
    },
    shim: {
        'foundation': { // gotcha! Just makes sure that jquery and whatInput is loaded before foundtaion!
            deps: ['jquery', 'whatInput'],
            exports: 'foundation'
        },
        'fUtilBox': {
            deps: ['foundation'], // foundation is dependent on jquery... and so on...
            exports: 'fUtilBox'
        },
        'fUtilMediaQuery': {
            deps: ['foundation'],
            exports: 'fUtilMediaQuery'
        },
        'fUtilTriggers': {
            deps: ['foundation'],
            exports: 'fUtilTriggers'
        },
        'fTooltip': {
            deps: ['jquery', 'foundation', 'fUtilBox', 'fUtilMediaQuery','fUtilTriggers'],
            exports: 'fTooltip'
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

    // First things first:
    $(function () {
        $('.hidden-if-no-js').show();
        $('.hidden-if-js').hide();

        $('.the-contacter-selector').each(function() {
            var parent = $(this).parent();

            $(this).remove();
        });
    });
});

requirejs(['jquery', 'fTooltip'], function($) {
    var ttipme = $('.has-tip');
    // if(ttipme.length == 1) {
    var elem = new Foundation.Tooltip(ttipme);
    elem.foundation('show');
    // }
});
