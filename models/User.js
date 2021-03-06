const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter your first name'],
		minlength: 3,
		maxlength: 30,
	},
	lastName: {
		type: String,
		required: [true, 'Please enter your last name'],
		minlength: 3,
		maxlength: 100,
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Please provide email'],
		validate: [isEmail, 'Please provide valid email'],
	},
	password: {
		type: String,
		unique: true,
		required: [true, 'Please provide email'],
		maxlength: 65,
	},
	phone: {
		type: String,
		unique: true,
		minlength: 6,
		maxlength: 32,
		required: [true, 'Please provide phone number'],
	},
	sector: {
		type: String,
	},
	active: {
		type: Boolean,
		default: false,
	},
	suspended: {
		type: Boolean,
		default: false,
	},
	numberOfVisits: {
		type: Number,
		default: 0,
	},
	numberOfLogins: {
		type: Number,
		default: 0,
	},
	regDate: {
		type: Date,
		default: Date.now,
	},
	lastVisit: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre('save', async function () {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
