const { emitMutation } = require('../../server');

const createMovementAggregation = async (request, h) => {
	const { payload } = request;

	emitMutation(payload);

	return payload;
};

module.exports = {
	createMovementAggregation
};
