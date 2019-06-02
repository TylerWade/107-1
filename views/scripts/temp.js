function convert() {
    console.log("You PUSHED ME");
    var f = $("#txtF").val();
    var c = (f - 32) * 5 / 9;
    console.log('Wants to convert', c);


    $.ajax({
        url: 'http://localhost:8080/API/temp',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            value: f
        }),
        success: function (res) {
            console.log("server says", res);
            $("#txtC").val(c);
        },
        error: function (error) {
            console.log('error', error);
        }
    });

}

function init() {
    console.log('its ready');
    $('#btnTemp').click(convert);
}

window.onload = init;