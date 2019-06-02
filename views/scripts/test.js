function test() {
    console.log("You PUSHED ME");

    $.ajax({
        url: 'http://localhost:8080/API/test',
        type: "GET",
        success: function (res) {
            console.log("server says", res);
        },
        error: function (error) {
            console.log('error', error);
        }
    });

}

function init(){
    console.log('its ready');
    var btn = $('#btnTest');
    btn.click(test);
}

window.onload= init;