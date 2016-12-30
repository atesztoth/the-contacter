requirejs(['./requirejs_common'], function (common) {
    requirejs(['jquery'], function ($) {
        $(function () {
            // Make this work with ajax!
            $('#regform').on('submit', function (e) {
                e.preventDefault();

                let hiddenField = $(`<input type="hidden" name="ajaxsign" value="1" id="ajaxsign">`);
                $('#regform').append($(hiddenField));

                $('#regform').hide('slow', function () {
                    $('#loading-indicator').show('slow', function () {
                        // Lets send it with jquery:
                        $.ajax({
                            url: "/registration",
                            method: "POST",
                            data: $('#regform').serialize(),
                            success: function (data) {
                                if (data.result === 0) {
                                    // Then failed
                                    let errors = getErrorList(data.errors);
                                    errors += "<p>Frissíts újrapróbáláshoz!</p>";
                                    $('#regform').html(errors);
                                } else {
                                    // Success
                                    $('#regform').html(`<h1>Sikeres mentés! Jelentkezzen be az oldal használatához!</h1>`);
                                }

                            },
                            error: function (e) {
                                console.log('Error!');
                            },
                            complete: function () {
                                $('#loading-indicator').hide('slow', function () {
                                    $('#regform').show('slow');
                                });

                            }
                        }); // This uses promises by default. .done() method, .after ... etc is done with that!
                    });

                });
            });
        });
    });
});