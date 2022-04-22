const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 3000,
	DB: process.env.MONGO_DB || null,
	JWT_SECRET_KEY: process.env.JWT_KEY || null,
};
