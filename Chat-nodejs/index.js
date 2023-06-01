const express = require('express')
const path = require('path')
const app = express()


const server = require('http').Server(app);
const socketio = require('socket.io')(server);
app.set('port', process.env.PORT || 3000);

//Ejecutamos la función de sockets.js
require('./sockets')(socketio);

//static files
app.use(express.static(path.join(__dirname,'public')));

//const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
/* server.listen(app.get('port'), () =>{
    console.log("Servidor en el puerto ", app.get('port'));
});
 */
//Lanzamos el servidor
server.listen(app.get('port'), () =>{
    console.log("Servidor en el puerto ", app.get('port'));
});







