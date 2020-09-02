const express = require('express');
const app = express();
const PORT = 3001;

let persons = [{id: 0, name: "ward chamberlain", number: "971-404-7927"}, {id: 1, name: "Kayla Crumb", number: "971-404-8511"}]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person)
})

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has information for ${persons.length} people.</p><p>${date}</p>`);
})

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(person => person.id !== id);
  console.log(`Deleted person with id ${id}`)
  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});