const Joi = require("joi");
const {HttpError, ctrlWrapper} = require("../helpers");
const contacts = require("../models/contacts");

const addShema = Joi.object({
	name: Joi.string().required().messages({"any.required": "missing required name field"}),
	email: Joi.string(). required().messages({"any.required": "missing required email field"}),
	phone: Joi.string().required().messages({"any.required": "missing required phone field"}),
})

const listContacts = async (req, res) => {	
	const result = await contacts.listContacts();
	res.json(result);	
};

const getContactById = async (req, res) => {
	const {contactId} = req.params;
	const result = await contacts.getContactById(contactId);
	if(!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);	
};

const addContact = async (req, res) => {
	const {error} = addShema.validate(req.body);
	if(error) {
		throw HttpError(400, error.message);
	}
	const result = await contacts.addContact(req.body);
	res.status(201).json(result);	
};

const removeContact = async (req, res) => {	
	const {contactId} = req.params;
	const result = await contacts.removeContact(contactId, req.body);
	if(!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({message: "contact deleted"});
};

const updateContact = async (req, res) => {
	const {error} = addShema.validate(req.body);
	if(error) {
		throw HttpError(400, "missing fields");
	}
	const {contactId} = req.params;
	const result = await contacts.updateContact(contactId, req.body);
	if(!result) {
		throw HttpError(400, "Not found");
	}
	res.json(result);
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	removeContact: ctrlWrapper(removeContact),
	updateContact: ctrlWrapper(updateContact)
}