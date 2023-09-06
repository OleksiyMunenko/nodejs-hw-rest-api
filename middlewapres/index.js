const {validateBody, validateStatusBody} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
	validateBody,
	validateStatusBody,
	isValidId,
	authenticate,
};