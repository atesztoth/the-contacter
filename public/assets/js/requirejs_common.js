requirejs.config({
    baseUrl: '/bower',
    // shim: {
    //     'bootstrap': {'deps': ['jquery']} // jquery not supports amd (Oh shiet, from up to 1.7.* it does)
    // },
    paths: {
        whatInput: 'what-input/dist/what-input.min',
        foundation: 'foundation-sites/dist/js/foundation.min',
        jquery: 'jquery/dist/jquery', // .min,
        fCore: 'foundation-sites/dist/js/plugins/foundation.core', // 1st function for third "homework"
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
        'fCore': {
            deps: ['foundation'],
            exports: 'fCore'
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
            deps: ['fCore', 'fUtilBox', 'fUtilMediaQuery', 'fUtilTriggers'],
            exports: 'fTooltip'
        }
    }
});

requirejs(['jquery', 'foundation'], function ($) {
    //  console.log('If you see no error, that means everything is loaded correctly with its dependencies. Lets rock!');

    // First things first:
    $(function () {
        $('.hidden-if-no-js').show();
        $('.hidden-if-js').hide();

        // Stronger rules:
        $('.remove-if-js').remove();
    });
});

requirejs(['jquery', 'fTooltip'], function ($) {
    $(function () {
        $(document).foundation(); // aaaa, we have to call foundation to parse our settings... Well,
        // a hell lot of time spent on nothing again, but I am learning something completely new, so it kinda
        // worth it. Have never used Foundation before.
    });
});

function getErrorList(errors) {
    let resp = '<ul class="error-list alert callout"><li class="oops">Woops...</li>';
    console.log('errors: ');
    console.log(errors);

    for (let i = 0; i < errors.length; ++i) {
        let e = errors[i];
        if (typeof e.message === 'object') {
            let emsg = '';

            for (let x in e.message) {
                if (e.message.hasOwnProperty(x)) {
                    emsg += x + ': ' + e.message[x] + '<br>';
                }
            }

            resp += 'mező: ' + e.field + ' hiba: ' + emsg + '<br>';
        } else {
            resp += 'mező: ' + e.field + ' hiba: ' + e.message + '<br>';
        }
    }

    resp += '</ul>';

    return resp;
}