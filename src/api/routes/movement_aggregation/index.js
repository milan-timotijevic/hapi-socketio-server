const controller = require('./controller');

const routes = [
	{
		method: 'POST',
		path: '/movement_aggregation',
		handler: controller.createMovementAggregation,
		options: {
			description: 'Create a new movement aggregation.',
			tags: ['api'],
		},
	}
];

module.exports = routes;
