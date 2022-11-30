const express = require('express')
const cors = require('cors')
const {MongoClient} = require('mongodb')


const PORT = process.env.PORT || 4201

const client = new MongoClient('mongodb+srv://sashazernin:2552436qwerrewq@cluster0.c9d6y5r.mongodb.net/mongo?retryWrites=true&w=majority')

const start = async () => {
  try{
    await client.connect()
    console.log('connect passed')
    const users = client.db().collection('users')
  }catch(e){
    console.log(e)
  }
}

const users = client.db().collection('users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.listen(PORT, () => {
  start()
  console.log('Start server')
})

app.get('/getUser',(req, res) => {
  res.json({
    message: 'ok'
  })
})

app.post('/newUser',(req, res) => {
  users.insertOne(req.body)
    res.json({message:'ok'})
  }
)
