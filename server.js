var http = require('http');
var express = require('express');
var app = express();

/********************************************/
/****************** Configurations *************/
/*******************************************/

/* be able to read the request data */
var bparser = require('body-parser');
app.use(bparser.json());


/* enable CORS for testing */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
/* Sever HTML fiels to the client */
var ejs = require('ejs');
app.set('views', __dirname + '/views'); // config path for client files
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

/* send statics file (css, js, media, pdf)*/
app.use(express.static(__dirname + '/views'));

// MONGO CONNECTION
var mongoose = require('mongoose');
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    userMongoClient: true
});
var db = mongoose.connection;
var Todo; // constructor

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/about', function (req, res) {
    res.render('about.html');
});




// create a new endpoint /test
app.get('/test', function (req, res) {
    res.render('test.html');
});
// render some html with a button
// when you lcik on that button
// perform a get request  tp /API/Test
app.get('/API/test', function (req, res) {
    res.send("TEST-TEST");
});
// should retrun a simple string

// TEMP

app.get('/temp', function (req, res) {
    res.render('temp.html');
});

app.get('/API/temp', function (req, res) {
    res.send('temp is ', res);
});

app.post('/API/temp', function (req, res) {
    var f = res.body.value;
    f = f * 1; // force convert string to number
    var c = (f - 32) * 5 / 9;
    res.json({ result: c});

});




/********************************************/
/****************** API Methods *************/
/*******************************************/
var cnt = 3; // this will be unique IDs for todos

var todoDB = [{
        text: "TODO 1",
        user: "Tyler",
        status: 0,
        id: 1,
        priority: "P2"
    },
    {
        text: "GET MILK",
        user: "Tyler",
        status: 0,
        id: 2,
        priority: "P2"
    }
];

// SEND ALL THE TODOS BACK TO CLIENT
app.post('/API/todo', function (req, res) {
    console.log('POST');
    console.log(req.body);

    // creat an object and asign a unique ID
    var todo = new Todo(req.body);
    todo.save(function (error, savedItem) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }

        console.log(savedItem);
        savedItem.id = savedItem._id; // create a unique id
        res.json(savedItem);
    });

    //res.json(todo);

});

app.get('/API/todo', function (req, res) {
    console.log('Someone request the GET todos');

    Todo.find({}, function (error, data) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }

        for (var i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
        }

        res.json(data);
    });
});

app.get('/API/todo/filter/:userName', function (req, res) {
    console.log('Someone request the GET todos');

    Todo.find({
        user: req.params.userName
    }, function (error, data) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }

        for (var i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
        }

        res.json(data);
    });
});

app.get('/API/todo/filter/:userName/:status', function (req, res) {
    console.log('Someone request the GET todos');

    Todo.find({
        user: req.params.userName,
        status: req.params.status
    }, function (error, data) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }

        for (var i = 0; i < data.length; i++) {
            data[i].id = data[i]._id;
        }

        res.json(data);
    });
});

app.put('/API/todo', function (req, res) {
    var todo = req.body;
    if (!todo.id) {
        res.status(412);
        res.send('TODO object should have and ID');
    }
    // find the object on mongo and update it
    Todo.findByIdAndUpdate(todo.id, todo, function (error, savedItem) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.json(savedItem);

    });
});

app.delete("/API/todo", function (req, res) {
    var todo = req.body;
    if (!todo.id) {
        res.status(412); // failed
        res.send('TODO object should have and ID');
    }
    Todo.findByIdAndDelete(todo.id, function (error) {
        if (error) {
            console.log(error);
            res.status(500);
            res.send(error);
        }
        res.status(201);
        res.send('Item Removed');
    });
});


// start the db connectionb
db.on('error', function (error) {
    console.log('error on db con', error);
});

db.on('open', function () {
    console.log('DB open');
    var todoSchema = mongoose.Schema({
        user: String,
        text: String,
        priority: String,
        status: Number,
    });
    Todo = mongoose.model('todosCh3', todoSchema);
});

app.listen(8080, function () {
    console.log('Server running on http://localhost:8080');
});

/**
 * COMMON COMMANDS
 * get
 * post
 * put
 * patch
 * delete
 * 
 * port > 3000 we will use 8080
 */

//start server




// ctrl + c = stop the process on the command line

/** Labs
 * 1 simple server taht responded to two endpoints
 * 2 rest server that stores the infor on an array
 * 3 rest server that stores the info on mongo BD
 * CR- webserver + RestServer
 */