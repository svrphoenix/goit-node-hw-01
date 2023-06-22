const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Помилка при отриманні даних із файлу:', err);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  if (!contacts) return;
  return contacts.find(item => item.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  if (!contacts) return;
  const removedContact = contacts.find(item => item.id === contactId);
  if (!removedContact) return null;
  const updatedContacts = contacts.filter(item => item.id !== contactId);
  try {
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return removedContact;
  } catch (err) {
    console.error('Помилка при записі даних у файл:', err);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  if (!contacts) return;
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  try {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error('Помилка при записі даних у файл:', err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
