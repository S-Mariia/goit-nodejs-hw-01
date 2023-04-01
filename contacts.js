const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find(({ id }) => id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }

  const removedContact = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removedContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const newList = [...allContacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
