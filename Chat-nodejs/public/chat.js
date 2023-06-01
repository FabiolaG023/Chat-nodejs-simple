$(function(){

    const socket = io();
    let nick= '';
        /* 
        let message = document.getElementById('message');
        let username = document.getElementById('username');
        let send = document.getElementById('send');
        let ouput = document.getElementById('ouput');
        let accions = document.getElementById('accions'); */
        
        //Obtenemos los elementos del DOM
        const messageForm = $('#messages-form');
        const messageBox = $('#message');
        const chat = $('#chat');
    
        const nickForm = $('#nick-form');
        const nickError = $('#nick-error');
        const nickName = $('#nick-name');
       // const pass = $('#pass');
    
        const userNames = $('#usernames');    
    
    
        //Eventos

        messageForm.submit( e =>{
       //Evitamos que se recargue la pantalla:
        e.preventDefault();
        //Enviamos el evento que debe recibir el servidor:
        socket.emit('EnviarMensaje', messageBox.val());
        //Limpiamos el input
        messageBox.val('');
        });

         //Obtenemos respuesta del servidor:
        socket.on('NuevoMensaje', function(data){
            // color que recibo
        let color = '#DADADA';
        if(nick == data.nick){
            // el color que envio
            color = '#D6E4E5';
        }
         /// modificar el estilo
        chat.append(`
        
        <div class="msg-area mb-2" style="background-color:${color} ">
            <p class="msg"><b>${data.nick} :</b> ${data.msg}</p>
        </div>
        `);

    });

    nickForm.submit( e =>{
        e.preventDefault();
        console.log('escribiendo...');
        socket.emit('NuevoUsuario', nickName.val(), data =>{
            if(data){
                nick = nickName.val();
                // esconder al introducir el nombre
                $('#nick-wrap').hide();
                // mostrar el chat y la lista de usuarios
                $('#content-wrap').show();
            }else{
                nickError.html(`

                <div class="alert alert-danger" role="alert">
                    Este usuario ya existe!
                    </div>
                `); 
            }
            nickName.val('');
        });
    });

    

    //Obtenemos el array de usuarios de sockets.js
    socket.on('usernames', data =>{
        let html = '';
        let color = '#000';
        let salir = '';
        console.log(nick);
        for(let i = 0; i < data.length; i++){
            if(nick == data[i]){
                color = '#027f43';
                salir = `<a class="enlace-salir" href="/" ><i class="fas fa-sign-out-alt salir"></i></a>`;
            }else{
                color = '#263159';
                salir = '';
            }
            html += `

            <ol class="list-group ">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold" style="color:${color}"><i class="fas fa-user"></i>${data[i]}</div>
                    </div>
                    ${salir}

                   
                </li>
                
                </ol>
            
            `;
        }
        //  
       // console.log(data.nick," ha salido de la sala");


        userNames.html(html);
    });

});
