const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Servir archivos estáticos (CSS, JavaScript, imágenes, etc.)
app.use(express.static(__dirname));

// Ruta para enviar el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    // Escuchar mensajes del cliente y emitirlos a todos los clientes conectados
    socket.on('chat message', (data) => {
        console.log('Mensaje recibido:', data);

        // Modificar el valor de 'sender' si 'isOwn' es true
        const sender = data.isOwn ? `Tú (${socket.id})` : `Otro Usuario (${socket.id})`;

        // Emitir el mensaje con el valor de 'sender' modificado
        io.emit('chat message', { ...data, sender });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


