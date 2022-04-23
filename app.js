//const config = require('./config');
require('express-async-errors');

// express
const express = require('express');
const app = express();

// packages
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routers
const router = require('./routes');
const errorHandlerMiddleware = require('./middleware/errorHandler');

// middleware
app.use(logger('combined'));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
//app.use(cookieParser(config.JWT_SECRET_KEY));

//routes
app.use('/api/v1/auth', router.authRouter);
app.get('/', (req, res) => {
	res.send(200).json({
		msg: 'OK',
	});
});
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		//await connectDB(config.DB);
		app.listen(process.env.PORT, () => {
			console.log(`Up!`);
		});
	} catch (error) {
		console.error('Failed to start a server with message: ', error);
	}
};

start();
