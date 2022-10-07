const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

console.log(process.env);
//crear servidor de express

const app = express();

//BD
dbConnection();

//CORS
app.use(cors())

//Directorio público
app.use(express.static('public'));

//lectura y parseo body

app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req,res) =>{
    res.sendFile(__dirname + '/public/index.html');
})
//escuchar peticiones

app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});