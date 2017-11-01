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

var router = express.Router();
var db = require('./write');

//La ruta en blanco.
router.get('/', function (req, res) {
    res.send("Bienvenido al servidor NODE");
    
    var output = {};
    output.nombre = "paco";
    output.edad = "15";
    db.write(output).then(x => {
        console.log("Se ha guardado");
    });
    
    db.load().then(x => {
        console.log(x);
    });
});

//Leo un parametro y lo pinto.
router.get('/p/:texto', function (req, res) {
    res.send("Esto funciona! " + req.params.texto);
});

//Leo dos parametros, los meto en un json, y devuelvo el json.
router.get('/fruit/:fruta1/:fruta2', function (req, res) {
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

app.use(router);

app.listen(3000, function () {
    console.log("Node server escuchando en http://localhost:3000");
});