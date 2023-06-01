module.exports = (io) =>{

    let nickNames = [];

    //configurando socket.io 
  //   const oi = socketIo(server)

    // WebSockets
    //escuchando eventos, cuando alguien se conecte ejecuta
    io.on('connection', socket =>{
        console.log('Nuevo usuario conectado');

    //escucha el mensaje desde el cliente
        socket.on('EnviarMensaje', (data)=>{
            // emite el mesaje a todos los clientes
            io.sockets.emit('NuevoMensaje', {
                msg: data,
                nick: socket.nickname
            });
        });
       /* oi.sockets.emit('NuevoMensaje:', data);
        });*/

        socket.on('NuevoUsuario', (data, callback)=>{
            //Nos devuelve el indice si el dato existe, es decir, si ya existe el nombre de usuario:
            if(nickNames.indexOf(data) != -1){
                callback(false);
            }else{
                //Si no existe le respondemos al cliente con true y agregamos el nuevo usuario:
                callback(true);
                socket.nickname = data;
                nickNames.push(socket.nickname);
                //Enviamos al cliente el array de usuarios:
                actualizarUsuarios();
            }
        });

        socket.on('disconnect', data =>{
             //Si un usuario se desconecta lo eliminamos del array
             if(!socket.nickname){
                
                return;
            }else{
                 //buscamos su posición en el array y lo eliminamos con splice()
                // console.log(socket.nickname," ha salido de la sala");

               /*  const jsLibraries = ['react', 'redux', 'vue', 'D3', 'Chart']
                const filteredLibraries = jsLibraries.filter((item) => item !== 'react')
 */
                    // nickNames.filter((item)=> item !== socket.nickname)

               // console.log(nickNames.splice(nickNames.indexOf(socket.nickname), 1))
                 nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                 
                 //Enviamos al cliente el array de usuarios actualizado:
                 //io.sockets.emit('usernames', nickNames);
                 actualizarUsuarios();
             }
        });

        function actualizarUsuarios(){
           io.sockets.emit('usernames', nickNames);
          //  console.log("Lista actualizada!!")
           // window.location.reload();
        }
        
       /*  socket.on('escribiendo', (data)=>{
            socket.broadcast.emit('escribiendo', data);
        }) */
    });


}