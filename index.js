const express = require('express');
const socketIo = require('socket.io');

// App setup

const cors = require('cors');
const bodyParser = require('body-parser');
const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app
	.use(cors())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.text())
	.use(bodyParser.json());

const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// Socket setup

const io = socketIo(server, {
	cors: {
		origin: '*',
	},
});

const basket_reservation = io.on('connection', (socket) => {
	console.log('New user connected', socket.id);

	socket.on('sendValue', (message) => {
		console.log(message);
		io.emit('toggle', message); // Broadcast the message to all connected clients
	});

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

// Helper to send message (it uses closure to keep a reference to the io connetion - which is stored in basket_reservation in your code)
const sendMessage = ({ hostname, body: status }) => {
	if (basket_reservation) {
		console.log('sending message to all');
		basket_reservation.emit('toggle', {
			id: uuidv4().slice(0, 14),
			hostname,
			status,
			date: dayjs().format('ddd, DD MMM HH:mm:ss'),
		});
	}
};

app.get('/', (req, res) => {
	res.status(200).json({ status: 'work' });
});

app.post('/toggle', (req, res) => {
	sendMessage(req);
	res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
	res.status(404).json({
		err: '404',
		message: '404 - Not found',
	});
});

app.use((err, req, res) => {
	res.status(500).json({
		err: '500',
		message: err.message,
	});
});
