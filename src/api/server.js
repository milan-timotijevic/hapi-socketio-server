const Hapi = require('@hapi/hapi');
const socketIO = require('socket.io');

const server = new Hapi.Server({
	port: process.env.PORT || 3001,
	routes: {
		cors: {
			origin: ['*'], // an array of origins or 'ignore'
		},
		validate: {
			failAction: (request, h, err) => {
				throw err;
			},
			options: {
				abortEarly: false,
			},
		},
	},
});

const io = socketIO(server.listener);

io.on('connection', socket => {
	socket.on('heatmap-request', () => {
		socket.emit('heatmap-response', {
			individuals: [
				{
					id: 'person_a',
					age: 20,
					gender: 'M'
				},
				{
					id: 'person_b',
					age: 22,
					gender: 'F'
				}
			],
			coordinates: [
				{
					x: 580,
					y: 960,
					value: 100,
					dwellings: {
						person_a: 2,
						person_b: 3
					}
				},
				{
					x: 444,
					y: 222,
					value: 331,
					dwellings: {
						person_a: 7,
						person_b: 2
					}
				}
			],
			max_value: 123,
			dwellings: {
				person_a: 5,
				person_b: 8
			},
		});
	});
	socket.on('paths-request', () => {
		socket.emit('paths-response', {
			person_a: [1,2,3],
			person_b: [4,5,6]
		});
	});
});

const emitMutation = mutation => {
	const socketIds = Object.keys(io.sockets.sockets);

	socketIds.forEach(id => {
		io.sockets.sockets[id].emit('mutation', { x: 123, y: 456, timestamp: new Date().getTime(), socket_id: id });
	});
};

module.exports = {
	emitMutation,
	/**
	 * Dynamically loads all routes and applies them to the server object prior to starting the server
	 */
	start: async () => {
		const routes = require('./routes');
		routes.forEach((route) => {
			server.route(route);
		});

		await server.start();
	},
};
