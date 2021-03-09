const fs = require("fs").promises;
const path = require("path");
var uniqid = require("uniqid");

const contactsPath = path.normalize("./db/contacts.json");

async function listContacts() {
	try {
		await fs.readFile(contactsPath).then(res => {
			console.table(JSON.parse(res.toString()));
		});
	} catch (error) {
		console.log(error);
	}
}

async function getContactsById(contactId) {
	try {
		const list = await fs
			.readFile(contactsPath)
			.then(res => JSON.parse(res.toString()));
		console.table(list.find(item => item.id === contactId));
	} catch (error) {
		console.log(error);
	}
}

async function removeContact(contactId) {
	try {
		const list = await fs
			.readFile(contactsPath)
			.then(res => JSON.parse(res.toString()));

		const filterLIst = list.filter(item => item.id !== contactId);

		await fs.writeFile(contactsPath, JSON.stringify(filterLIst));
		console.table(filterLIst);
	} catch (error) {
		console.log(error);
	}
}

async function addContact(name, email, phone) {
	const newContact = { id: uniqid(), name, email, phone };
	try {
		const list = await fs
			.readFile(contactsPath)
			.then(res => JSON.parse(res.toString()));
		list.push(newContact);

		await fs.writeFile(contactsPath, JSON.stringify(list));
		console.table(list);
	} catch (error) {
		console.log(error);
	}
}

module.export = {
	listContacts,
	getContactsById,
	removeContact,
	addContact,
};
