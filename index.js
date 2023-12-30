const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app
	.use(cors())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.text())
	.use(bodyParser.json());

app.get('/', (req, res) => {
	console.log('get request success');
	res.status(200).json({ status: 'ok' });
});

app.post('/start', (req, res) => {
	console.log(req.body);
	res.status(200).json({ status: true });
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

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
