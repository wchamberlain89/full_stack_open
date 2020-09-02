const express = require('express');
const app = express();
const PORT = 3001;

const persons = [{name: "ward chamberlain", number: "971-404-7927"}, {name: "Kayla Crumb", number: "971-404-8511"}]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has information for ${persons.length} people.</p><p>${date}</p>`);
})
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
});