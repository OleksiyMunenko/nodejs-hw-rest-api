const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {validateBody, isValidId, validateStatusBody, authenticate} = require("../../middlewapres");
const {schemas} = require("../../models/cotact");

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.addSсhema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId,  ctrl.removeContact); 

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.addSсhema), ctrl.updateContact);

router.patch('/:contactId/favorite',authenticate, isValidId, validateStatusBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact)

module.exports = router;
