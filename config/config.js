const path = require('path');
const rootPath = path.normalize(__dirname +'/../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/resorce-management-system',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: '',
		port: process.env.PORT || 80
	}
}