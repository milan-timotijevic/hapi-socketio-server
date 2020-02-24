const getHealthHandler = async (request, h) => {
	return h.response({
		server: 'up'
	});
};

module.exports = {
	getHealthHandler,
};
