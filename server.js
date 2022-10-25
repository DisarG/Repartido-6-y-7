const express = require('express');
const app = express()
const port = 8080
const bodyParser = require("body-parser");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const api = "https://api.thecatapi.com/v1/images/search?limit=1&page=10&order=Desc"
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))





app.get('/gatos', (req, res) => {
    async function Setimagenes() {
        const response = await fetch(api);
        const data = await response.json();
        res.json(data)
    }
    Setimagenes()
})

app.get('/gato', (req, res) => {
    res.sendFile(__dirname + ('/public/gatoindex.html'))
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + ('/public/home.html'))
})

app.get('/form', (req, res) => {
    res.sendFile(__dirname + ('/public/formulario.html'))
})

app.post('/form', (req, res) => {
    const name = req.body.nombre;
    const apellido = req.body.apellido;
    let resname = name;
    let resapellido = apellido;
    res.send(` <p>Nombre: ${resname}</p>  <p>Apellido: ${resapellido}</p>  <h1>Te has subscrito correctamente</h1>`)
})

app.get('/calculadora', (req, res) => {
    res.sendFile(__dirname + ('/public/calculadora.html'))
})

app.post("/calculadora", function (req, res) {
    const num_1 = req.body.num1;
    const num_2 = req.body.num2;
    const myOperator = req.body.operator;
    let resultado;

    switch (myOperator) {
        case "+":
            resultado = Number(num_1) + Number(num_2);
            break;

        case "-":
            resultado = Number(num_1) - Number(num_2);
            break;

        case "*":
            resultado = Number(num_1) * Number(num_2);
            break;

        case "/":
            resultado = Number(num_1) / Number(num_2);
            break;
        case 'IMC':
            resultado = parseInt(num_1 / (num_2 ** 2) * 10000); 
            break;
        default:
            break;
    }

    res.send(`El resultado es: ${Math.round(resultado)}`);

});

app.listen(port, () => {
    console.log(`Aplicacion abierta en  localhost:${port}`)
})
