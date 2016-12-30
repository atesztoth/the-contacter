requirejs(['./requirejs_common'], function (common) {
    requirejs(['jquery'], function ($) {
        $(function () {
            // Make this work with ajax!
            $('#contactform').on('submit', function (e) {
                e.preventDefault();

                // Az ajax urlt így szerzem meg:
                let ajaxUrl = $(this).attr('action');

                let hiddenField = $(`<input type="hidden" name="ajaxsign" value="1" id="ajaxsign">`);
                $('#contactform').append($(hiddenField));

                $('#contactform').hide('slow', function () {
                    $('#loading-indicator').show('slow', function () {
                        // Lets send it with jquery:
                        $.ajax({
                            url: ajaxUrl,
                            method: "POST",
                            data: $('#contactform').serialize(),
                            success: function (data) {
                                if (data.result === 0) {
                                    // Then failed
                                    let errors = getErrorList(data.errors);
                                    errors += "<p>Frissíts újrapróbáláshoz!</p>";
                                    $('#contactform').html(errors);
                                } else {
                                    $('#contactform').html(`<h1>Sikeres mentés!</h1>`);
                                }

                            },
                            error: function (e) {
                                console.log('Error!');
                            },
                            complete: function () {
                                $('#loading-indicator').hide('slow', function () {
                                    $('#contactform').show('slow');
                                });

                            }
                        }); // This uses promises by default. .done() method, .after ... etc is done with that!
                    });

                });
            });
        });
    });
});