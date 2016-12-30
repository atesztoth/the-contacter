requirejs(['./requirejs_common'], function (common) {
    requirejs(['jquery'], function ($) {
        $(function () {
            $('.the-contacter-selector').each(function () {
                // nothing yet.
            });

            $('.plus-button').on('click', function () {
                let relatedTCselector = $(this).siblings('div.hidden-if-no-js').eq(0).children('ul.the-contacter-selector').eq(0);
                if (relatedTCselector.length > 0) {
                    // GOTCHA!
                    let exampleField = $($('li.example', relatedTCselector)[0].outerHTML); // parsed as well.
                    // To be semantically correct, let's remove the example class.
                    exampleField.removeClass('example');

                    relatedTCselector.append(exampleField);
                }
            });

            // Make this work with ajax!
            $('#contactform').on('submit', function (e) {
                e.preventDefault();

                // Az ajax urlt így szerzem meg:
                let ajaxUrl = $(this).attr('action');

                let hiddenField = $(`<input class="remove-after-post" type="hidden" name="ajaxsign" value="1" id="ajaxsign">`);
                $('#contactform').append($(hiddenField));

                // Okay there is one more thing we have to deal with.
                // We must make a string outta the nice list we got with this js.
                // we can do this pretty easily actually, since the backend does not care about some fields.
                // This is now like a gift from God, I don't have to play around with modifying post data,
                // which is basically a pain in the ass, I can just create a new field with the needed data,
                // a hidden field, attach it to the form, and then serialize. Right after serialization,
                // I'll also remove that field too, to avoid any trouble if the form needed to be resent.
                // This won't happen in this project, but you know...

                $('.the-contacter-selector').each(function () {
                    let result = '';
                    let firstElement = true;
                    let postName = $(this).data('postname');

                    $('li', this).each(function () {
                        if (!$(this).hasClass('example')) {
                            // type-userstring#another....
                            let textVal = $('.tc-text > input[type="text"]', this).val();

                            if (textVal.trim().length > 0) {
                                let row = $('.tc-selector-type', this).val() + '-' + textVal;
                                result += firstElement ? row : '#' + row;
                                firstElement = false;
                            }
                        }
                    });

                    //if (result.trim().length > 0) { // Backend checks this.
                    // Lets create that hidden field, and put data into that:
                    let newField = $(`<input type="hidden" class="remove-after-post" name="` + postName + `" value="` + result + `">`);

                    $('#contactform').append($(newField));
                    // }
                });

                $('#contactform').hide('slow', function () {
                    $('#loading-indicator').show('slow', function () {
                        // Lets send it with jquery:
                        let form = document.forms.namedItem("addform");
                        let formData = new FormData(form); // The magic. Awwhh nice!

                        $.ajax({
                            url: ajaxUrl,
                            method: "POST",
                            // THIS MUST BE DONE FOR FILE UPLOADING
                            contentType: false,
                            processData: false,
                            data: formData,
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
                                $('#contactform .remove-after-post').remove();
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