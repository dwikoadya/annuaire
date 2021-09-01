const addContact = require('./add').add;
const deleteContact = require('./remove').remove;
const updateContact = require('./update').update;

module.exports = {
   addContact,
   deleteContact,
   updateContact
}