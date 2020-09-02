const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://root-user:${password}@cluster0.dqlwo.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', entrySchema)


if(process.argv.length === 3) {
  Entry.find({}).then(result => {
    console.log("Phonebook: ")
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`);
    })
    mongoose.connection.close()
  })
}

if(process.argv.length < 5) {
  console.log(`you haven't entered enough arguments\nTry format node mongo.js <password> <entry-name> <entry-number>`)
  process.exit(1)
}

const entry = new Entry({
  name: process.argv[3],
  number: process.argv[4]
})

entry.save().then(result => {
  console.log('entry saved!')
  mongoose.connection.close()
})