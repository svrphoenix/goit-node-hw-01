const argv = require('yargs').argv;
const contacts = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(data => {
        if (data !== undefined) console.table(data);
      });
      break;

    case 'get':
      contacts.getContactById(id).then(data => {
        if (data !== undefined) console.log(data);
      });
      break;

    case 'add':
      contacts.addContact(name, email, phone).then(data => {
        if (data !== undefined) console.log(data);
      });
      break;

    case 'remove':
      contacts.removeContact(id).then(data => {
        if (data !== undefined) console.log(data);
      });
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
