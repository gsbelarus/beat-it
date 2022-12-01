const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://sashazernin:2552436qwerrewq@cluster0.c9d6y5r.mongodb.net/mongo?retryWrites=true&w=majority')

exports.startMongo = async () => {
  try {
    await client.connect()
    console.log('connect passed')
  } catch (e) {
    console.log(e)
  }
}

const users = client.db().collection('users')

exports.findUser = {
  findUserByEmail(email){
    return users.findOne({email})
  },
  findUserById(id) {
    return users.findOne({_id:id})
  }
}

exports.addUser = (data) => {
  return users.insertOne(data)
}




