const controller = require('./controller');

const routes = [
	{
		method: 'GET',
		path: '/health',
		handler: controller.getHealthHandler,
		options: {
			description: 'Confirms that the server is up and running',
			tags: ['api'],
		},
	}
];

module.exports = routes;
