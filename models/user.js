const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		math: emailRegexp,
		unique: true,
		require: [true, 'Email is required'],
	},
	password: {
		type: String,
		minlength: 6,
		require: [true, 'Password is required'],
	},
	subscription: {
		type: String,
		enum: ['starter', 'pro', 'business'],
		default: "starter",
		required: true,

	},
	token: {
		type: String,
		default: "",
	},
	avatarURL: {
		type: String,
		required: true,
	},
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().pattern(emailRegexp).required().messages({"any.required": "Missing required email field"}),
	password: Joi.string().min(6).required().messages({"any.required": "Missing required password field"}),
});

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required().messages({"any.required": "Missing required email field"}),
	password: Joi.string().min(6).required().messages({"any.required": "Missing required password field"}),
});

const schemas = {
	registerSchema,
	loginSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
}