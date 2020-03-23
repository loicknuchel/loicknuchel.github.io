'use strict';

$('form.contact-form').submit(function (e) {
    e.preventDefault();
    var $form = $(this);
    var data = {};
    $form.find('input, textarea').each(function () {
        data[$(this).attr('name')] = $(this).val();
    });
    var opts = {
        type: $form.attr('method'),
        url: $form.attr('action'),
        headers: {'Accept': 'application/json'},
        data: data,
        success: function () {
            $form.html('<h3>Well done, message sent <i class="fas fa-thumbs-up"></i></h3>');
        },
        error: function (xhr, status, error) {
            console.error('Ajax options', opts);
            alert('Ooops, an error occured: ' + error);
        }
    };
    $.ajax(opts);
});
