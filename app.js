const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


const contacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210' },
];

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contact = contacts.find(contact => contact.id === id);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.json(contact);
  }
});

// Route to add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ message: 'Missing required fields' });
  } else {
    const newContact = { id: contacts.length + 1, name, email, phone };
    contacts.push(newContact);
    res.status(201).json(newContact);
  }
});

// Route to delete a contact by ID
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = contacts.findIndex(contact => contact.id === id);

  if (index !== -1) {
    contacts.splice(index, 1);
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

// Route to update a contact by ID
app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: 'Missing fields' });
  } else {
    const index = contacts.findIndex(contact => contact.id === id);

    if (index !== -1) {
      if (name) contacts[index].name = name;
      if (email) contacts[index].email = email;
      if (phone) contacts[index].phone = phone;

      res.json(contacts[index]);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
