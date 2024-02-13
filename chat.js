// chat.js
const socket = io();

// Función para agregar mensajes al chat
function addMessageToContainer(data) {
    console.log('Mensaje recibido para agregar al contenedor:', data);
    const { message, sender } = data;
    const messageContainer = $('#messages');
    const messageDiv = $('<div>').addClass('message');
    const messageContent = $('<p>').addClass('message-content').text(`${message}`);
    
    // Añadir clase específica basada en el sender
    if (sender && sender.includes(socket.id)) {
        messageDiv.addClass('own');
        // Alinear a la derecha si el mensaje es del usuario actual
        messageContent.css('text-align', 'right');
    } else {
        messageDiv.addClass('other-user');
        // Alinear a la izquierda si el mensaje es de otro usuario
        messageContent.css('text-align', 'left');
    }

    messageDiv.append(messageContent);
    messageContainer.append(messageDiv);

    // Hacer scroll hacia abajo para mostrar el último mensaje
    messageContainer.scrollTop(messageContainer[0].scrollHeight);
}

// Enviar mensaje cuando se envía el formulario
$('#messageForm').submit((e) => {
    e.preventDefault();
    const message = $('#messageInput').val();
    if (message.trim() !== '') {
        const sender = 'Tú';
        const isOwn = true; 
        // Puedes obtener esto de otra manera si es necesario
        console.log('Enviando mensaje al servidor:', { message, sender });
        // Enviar mensaje al servidor
        socket.emit('chat message', { message, sender,isOwn });

        // Limpiar el campo de entrada
        $('#messageInput').val('');
    }
});

// Manejar eventos de 'chat message' del servidor
socket.on('chat message', (data) => {
    addMessageToContainer(data);
});


