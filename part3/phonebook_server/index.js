require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = process.env.PORT || 3001;
var path = require('path');
const Entry = require('./models/entry');

app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'))

let persons = [{id: 0, name: "ward chamberlain", number: "971-404-7927"}, {id: 1, name: "Kayla Crumb", number: "971-404-8511"}]

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.get("/api/persons", (req, res) => {
  Entry.find({}).then(entries => {
    res.json(entries);
  })
})

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person)
})

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!body.number) {
    return res.status(400).json({ 
      error: 'number is missing' 
    })
  }

  const person = new Entry({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end()
})

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has information for ${persons.length} people.</p><p>${date}</p>`);
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});