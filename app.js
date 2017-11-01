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

//Comprobar si existe el usuario.
app.get('/user/:nameUser/:passUser', function (req, res) {
    db.load().then(x => {
        if (req.params.nameUser === x.nombre) {
            if (req.params.passUser === x.pass) {
                res.send("Existe " + req.params.nameUser + " y el pass es correcto");
            } else {
                res.send("Existe " + req.params.nameUser + " pero el pass no es correcto");
            }
        } else {
            res.send("No existe " + req.params.nameUser);
        }
    });
});

//Crear usuario. TODO cambia a POST para el Ajax.
app.get('/user2/:nameUser/:passUser', function (req, res) {
    let output = {};
    output.nombre = req.params.nameUser;
    output.pass = req.params.passUser;
    db.write(output).then(x => {
        res.send("Guardado " + req.params.nameUser);
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