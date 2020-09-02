const express = require('express');
const app = express();
const morgan = require('morgan')
const PORT = 3001;
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
let persons = [{id: 0, name: "ward chamberlain", number: "971-404-7927"}, {id: 1, name: "Kayla Crumb", number: "971-404-8511"}]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person)
})

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person.name) {
    return res.status(400).json({ 
      error: 'name is missing' 
    })
  }
  if (!person.number) {
    return res.status(400).json({ 
      error: 'number is missing' 
    })
  }
  const isDuplicate = persons.filter(p => p.name === person.name).length > 0;
  
  if (isDuplicate) {
    return res.status(400).json({
      error: 'Duplicate Entry'
    })
  }
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0

  person.id = maxId + 1
  
  persons = persons.concat(person)

  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end()
})

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has information for ${persons.length} people.</p><p>${date}</p>`);
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});