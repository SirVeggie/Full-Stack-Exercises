import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const uri = process.env.MONGO_URI;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true };
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  }
});

personSchema.plugin(uniqueValidator);
personSchema.set('toJSON', {
  transform: (document: any, result: any) => {
    result.id = result._id.toString();
    delete result._id;
    delete result.__v;
  }
});

const Person = mongoose.model('Person', personSchema);

mongoose.connect(uri, options);

//=====| functions |=====//

async function GetAll() {
  return await Person.find({});
}

async function Find(person: any) {
  return await Person.findOne(person);
}

async function GetByID(id: string) {
  return await Person.findById(id);
}

async function Add(person: Person) {
  delete person.id;
  const obj = new Person(person);
  return await obj.save();
}

async function Delete(id: string) {
  return await Person.findByIdAndRemove(id);
}

async function Update(person: Person) {
  const id = person.id;
  delete person.id;
  return await Person.findByIdAndUpdate(id, person, { new: true, runValidators: true, context: 'query' });
}

interface Person {
  id: string;
  name: string;
  number: string;
}

const ex = { GetAll, Find, GetByID, Add, Delete, Update };
export default ex;