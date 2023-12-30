// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();

// app.use(
// 	cors({
// 		origin: '*',
// 	})
// );

// const server = http.createServer(app);
// const io = socketIo(server, {
// 	cors: {
// 		origin: '*',
// 	},
// });

// io.on('connection', (socket) => {
// 	console.log('New user connected');

// 	socket.on('sendValue', (message) => {
// 		console.log(message);
// 		io.emit('toggleValue', message); // Broadcast the message to all connected clients
// 	});

// 	socket.on('disconnect', () => {
// 		console.log('User disconnected');
// 	});
// });

// const PORT = process.env.PORT || 9000;

// server.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

// https://dashboard.render.com/web/srv-cm3ig76n7f5s73bp4l00/logs

// https://wokwi.com/projects/384984173218924545

// https://github.com/gilmaimon/ArduinoWebsockets#prerequisites
