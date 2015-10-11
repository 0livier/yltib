function createShortUrl(url, cb) {
    $.ajax({url: api_url + "/v1/urls/", data: JSON.stringify({ url: url }), type:'POST', contentType: 'application/json'}).done(cb);
}

// --------------------------------------------------------------

function compress(event) {
    event.preventDefault();
    createShortUrl($('#url').val(), function(data){
        $('#link').text( data.url );
        $('#link').attr("href", data.url);
        $('form').fadeOut(400, function() {
            $('.done').fadeIn(200);
        });
    });
}

function again() {
    $('.done').fadeOut(400, function() {
        $('#id').val('');
        $('form').show();
    });

    return false;
}

// --------------------------------------------------------------

$('form button').click(compress);
$('#again').on('click', again);

