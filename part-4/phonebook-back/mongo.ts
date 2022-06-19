import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log('No password given');
  process.exit(1);
}

const pass = process.argv[2];
const url = `mongodb+srv://fullstack:${pass}@cluster0.adwiq.mongodb.net/phonebook?retryWrites=true&w=majority`;

if (process.argv.length > 3) {
  if (process.argv.length < 5) {
    console.log('Missing number as an argument');
    process.exit(1);
  }

  Add({
    name: process.argv[3],
    number: process.argv[4]
  });
} else {
  GetAll();
}

function Add(person: Person) {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  });

  const Person = mongoose.model('Person', personSchema);
  const obj = new Person(person);

  obj.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

function GetAll() {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  });

  const Person = mongoose.model('Person', personSchema);
  Person.find({}).then(result => {
    result.forEach((person: any) => {
      console.log(`${person.name} ${person.number}`);
    });

    mongoose.connection.close();
  });
}

interface Person {
  name: string;
  number: string;
}