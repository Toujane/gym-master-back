const config = require('./config');
require('express-async-errors');

// express
const express = require('express');
const app = express();

// packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const bcryptjs = require('bcryptjs');

// middleware

app.set('trust proxy', 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000,
		max: 60,
	})
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
//app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {});

const start = async () => {
	try {
		await connectDB(config.DB);
		app.listen(config.PORT, config.HOST, () => {
			console.log(`EXPRESS IS RUNNING ON: http://${config.HOST}:${config.PORT}`);
		});
	} catch (error) {
		console.error('Failed to start a server with message: ', error);
	}
};

start();
