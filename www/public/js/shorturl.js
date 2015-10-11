function createShortUrl(url, cb) {
    return $.ajax({url: "http://localhost:3000/v1/urls/", data: JSON.stringify({ url: url }), type:'POST', contentType: 'application/json'}, cb);
}

function compress() {
    createShortUrl($('#id').val(), function(data){
        $('#link').text( data.url );
        $('#link').attr("href", data.url);
        $('form').hide(400, function() {
            $('.done').show();
        });
    });
}

function again() {
    $('.done').hide(400, function() {
        $('#id').val('');
        $('form').show();
    });

    return false;
}

$('form').on('submit', compress);

$('#again').on('click', again);

