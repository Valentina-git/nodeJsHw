const fs = require("fs").promises;
const path = require("path");
var uniqid = require("uniqid");

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
	try {
		const list = await fs.readFile(contactsPath);
		console.table(JSON.parse(list.toString()));
	} catch (error) {
		console.log(error);
	}
}

async function getContactsById(contactId) {
	try {
		const list = await fs.readFile(contactsPath);
		const contact = JSON.parse(list.toString()).find(
			item => item.id === contactId
		);
		console.table(contact);
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const list = await fs.readFile(contactsPath);
		const contactsList = JSON.parse(list);
		const filterList = contactsList.filter(item => item.id !== contactId);

		await fs.writeFile(contactsPath, JSON.stringify(filterList, null, 2));
		console.table(filterList);
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	const newContact = { id: uniqid(), name, email, phone };
	try {
		const list = await fs.readFile(contactsPath);
		const newContactsList = [...JSON.parse(list), newContact];

		await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
		console.table(newContactsList);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	listContacts,
	getContactsById,
	removeContact,
	addContact,
};
