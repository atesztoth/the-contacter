requirejs.config({
    baseUrl: 'bower',
    paths: {
        jquery: 'jquery/dist/jquery' // .min
    }
});

requirejs(['jquery'], function( $ ) {
    // Main entry point. If you need to use for example jquery right now for somethings,
    // do it like:
    // require(['jquery'], function()....
    console.log( $ ) // OK
});
