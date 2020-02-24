const createMovementAggregation = async (request, h) => {
	const { payload } = request;

	// TODO engage socket

	return payload;
};

module.exports = {
	createMovementAggregation
};
