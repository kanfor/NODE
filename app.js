var express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        methodOverride = require("method-override"),
        http = require("http"),
        server = http.createServer(app);
//mongoose 		= require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.set('json spaces', 4);	//<- Utilidad para pintar json formateados.

//var router = express.Router();
var db = require('./write');    //<- El gestor de base de datos.

//La ruta en blanco.
app.get('/', function (req, res) {
    res.send("Bienvenido al servidor NODE");
});

//Reset DB.
app.get('/resetdb', function (req, res) {
    var newDb = {};
    var arrayUsers = [];
    var user = {};
    user.name = "paco";
    user.pass = "xxx";
    user.gold = "100";
    arrayUsers.push(user);
    
    newDb.users = arrayUsers;
    
    //res.send(x.users[0].name);
    
    db.write(newDb).then(x => {
        res.json(newDb);
    });
});

//Leer DB.
app.get('/db', function (req, res) {
    db.load().then(x => {
        res.send(x);
    });
});

//Comprobar si existe el usuario.
app.get('/user/:nameUser/:passUser', function (req, res) {
    db.load().then(x => {
        for (var i = 0; i < x.users.length; i++) {
            if (req.params.nameUser === x.users[i].name) {
                console.log("Usuario " + req.params.nameUser + "existe");
                if (req.params.passUser === x.users[i].pass) {
                    console.log("LOGIN CORRECTO");
                    //Devolvermos informacion del usuario.
                    res.send(x.users[i]);
                } else {
                    console.log("Usuario existe pero pass incorrecto");
                    res.send("900");
                }
            } else {
                console.log("Usuario " + req.params.nameUser + "NO existe");
                res.send("901");
            }
        }
    });
});

//Crear usuario. TODO cambia a POST para el Ajax.
app.get('/user2/:nameUser/:passUser', function (req, res) {
    //Obtenemos base de datos.
    db.load().then(x => {
        var exist = false;
        for (var i = 0; i < x.users.length; i++) {
            if (req.params.nameUser === x.users[i].name) {
                exist = true;
                console.log("Usuario " + req.params.nameUser + " YA existe");
                res.send("902");
            }
        }
        if (!exist) {
            var newDb = x;
            var user = {};
            user.name = req.params.nameUser;
            user.pass = req.params.passUser;
            user.gold = "100";
            newDb.users.push(user);
            db.write(newDb).then(x => {
                res.json(newDb);
            });
        }
    });
});

//Leo dos parametros, los meto en un json, y devuelvo el json.
app.get('/fruit/:fruta1/:fruta2', function (req, res) {
    if (typeof req.params.fruta1 !== 'undefined' && typeof req.params.fruta2 !== 'undefined') {
        var data = {
            "fruit": {
                "apple": req.params.fruta1,
                "color": req.params.fruta2
            }
        };
        res.json(data);
    } else {
        res.send("Falta algun parametro " + req.params.fruta1 + " " + req.params.fruta2);
    }
});

//app.use(router);

app.listen(3000, function () {
    console.log("Node server escuchando en http://localhost:3000");
});