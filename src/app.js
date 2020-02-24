const { start } = require('./api/server');

start().then(() => {
	console.log(`Server running...`);
});
