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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.get("/api/persons", (req, res) => {
  Entry.find({}).then(entries => {
    res.json(entries);
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  Entry.findById(req.params.id).then(entry => {
    if (entry) {
      res.json(entry) 
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  
  const person = new Entry({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Entry.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  
  const person = {
    name: body.name,
    number: body.number
  }

  Entry.findByIdAndUpdate(req.params.id, person, { new: true })
  .then(updatedNote => {
    Response.json(updatedNote)
  })
  .catch(error => next(error))
})

app.get("/info", (req, res) => {
  const date = new Date();
  Entry.find({}).then(entries => {
    res.send(`<p>Phonebook has information for ${entries.length} people.</p><p>${date}</p>`);
  }).catch(err => next(error))
})

const errorHandler= (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})