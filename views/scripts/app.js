// Creat a global var with name on it
// create a hello function
// that recieves a parameter and prints it on the console

var player1 = 'Tyler';
var todoList = []; // <- Store the todo elements here
var serverURL = 'http://localhost:8080';

function todoItem(title, description, price, category, image) {
    this.todoText = todoText;
    this.user = "Tyler";
}

function saveTodo() {
    console.log('You Clicked me!!');
    // get the reference for the input
    var txt = $('#txtTodo');
    // get the text from the field
    var todoText = txt.val();
    console.log(todoText);
    // if there is not text, add the error class
    if (todoText.length < 1) {
        //no text add class
        txt.addClass('error');
    } else {
        //add text remove class
        txt.removeClass('error');
        // save the todo item
        //todoList.push(todoText);
        console.log(todoList);
        // clean the input field
        txt.val('');
        // display a new todo list on the screen
        displayTodo(todoText); // Send var to function with same name

        sendToServer(todoText);
    }
}

function sendToServer(text) {
    var priority = $("#selPriority").val();

    var todoItem = {
        text: text,
        user: "Tyler",
        priority: priority,
        status: 0 // 0 = new
    };
    // create the Ajax post request
    console.log('started sever communication');

    // send the object to the server
    /* Async Javascript XML/JSON communication = AJAX
     */
    $.ajax({
        url: serverURL + "/API/todo", // location
        type: "POST", // action
        data: JSON.stringify(todoItem),
        contentType: "application/json",
        success: function (res) {
            console.log("server says: ", res);
            res.id = res._id;
            todoList.push(res.text, res.id); // save the obj that server sends back
        },
        error: function (error) {
            console.log("**ERROR: ", error);
        }
    });
}



function importList() {
    $.ajax({
        url: serverURL + "/API/todo",
        type: "GET",
        success: function (res) {
            console.log("server", res);

            for (var i = 0; i < res.length; i++) {
                var item = res[i];
                item.id = item._id;
                if (item.user == "Tyler") {
                    todoList.push(item);

                    if (item.status && item.status == 1) {
                        displayDone(item.text, item.id)
                    } else {
                        displayTodo(item.text, item.id);
                    }

                }
            }

        },
        error: function (error) {
            console.error("** ERROR", error);

        }
    });
}

function displayTodo(simpleText, id) {
    var ul = $('#todoList');
    var li = "<li id='" + id + "' class='list-group-item list-group-item-action list-group-item-info'>" + simpleText + "<button class='btn btn-sm btn-success btn-done' onclick=markDone('" + id + "');> Done </button></li>";
    ul.append(li);

}

function displayDone(simpleText, id) {
    var ul = $('#doneList');
    var li = "<li id='" + id + "' class='list-group-item list-group-item-action list-group-item-success'>" + simpleText + "<button class='btn btn-sm btn-danger btn-done' onclick=deleteTodo('" + id + "');> Delete </button></li>";
    ul.append(li);
}

function markDone(id) {
    console.log('done', id);
    var theItem;
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        if (todo.id == id) {
            theItem = todo;
            break;
        }
    }
    theItem.status = 1;

    displayDone(theItem.text, theItem.id);

    $("#" + theItem.id).remove();
    console.log(theItem);
    $.ajax({
        url: serverURL + "/API/todo",
        type: "PUT",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("server says", res);
        },
        error: function (error) {
            console.log('error', error);
        }
    })
}

function deleteTodo(id) {
    console.log('delete', id);
    var theItem;
    for (var i = 0; i < todoList.length; i++) {
        var todo = todoList[i];
        if (todo.id == id) {
            theItem = todo;
            break;
        }
    }
    theItem.status = 1;

    $("#" + theItem.id).remove();
    console.log(theItem);
    $.ajax({
        url: serverURL + "/API/todo",
        type: "DELETE",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success: function (res) {
            console.log("server says", res);
        },
        error: function (error) {
            console.log('error', error);
        }
    })
}

function init2() {
    //var lbl = document.getElementById('lblTodo'); same as below
    var lbl = $("#lblTodo"); //tells Jquery to find element
    lbl.innerText = "jQuery Rules!!";
    //var btn = document.getElementById('btnSave'); same as below
    $('#btnSave').click(saveTodo);
    $("#txtTodo").keypress(function (arg) {
        if (arg.key == "Enter") {
            saveTodo();
        }
    });
    importList();
}
// when the browser finishes loading stuff
//please exec such funtion (init)
window.onload = init2;

/* Basics */
/**
 * variables
 * scope of varibales
 * function and params
 * 
 * lopps (for)
 * conditional (if statement)
 * objects (object constructor && object literal)
 * 
 * DOM manipulation (creating and accessing dom)
 */