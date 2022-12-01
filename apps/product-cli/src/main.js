const express = require('express')
const cors = require('cors')
const MongoDb = require('./MongoDb')

const PORT = process.env.PORT || 4201

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())
app.listen(PORT, () => {
  MongoDb.startMongo()
  console.log('Start server')
})

app.post('/signUp', (req, res) => {
    try {
      if (Object.hasOwn(req.body, 'email') && Object.hasOwn(req.body, 'password') && Object.keys(req.body).length === 2) {
        const addUser = async () => {
          const user = await MongoDb.findUser.findUserByEmail(req.body.email)
          if (user === null) {
            const newUser = await MongoDb.addUser(req.body)
            res.json({statusCode: 0, message: 'ok', userId: newUser._id})
          } else {
            res.json({statusCode: 1, message: 'This user already exists'})
          }
        }
        addUser()
      } else {
        res.json({statusCode: 1, message: "you must pass the object:{'email':email,'password':password}"})
      }
    } catch (error) {
      res.json({statusCode: 1, message: error})
    }
  }
)
app.post('/login', (req, res) => {
    try {
      const checkUser = async () => {
        const user = await MongoDb.findUser.findUserByEmail(req.body.email)
        if(user !== null){
          if(user.password === req.body.password){
            res.json({statusCode: 0, message: 'ok',userId:user._id})
          }else{
            res.json({statusCode: 1, message: 'password is not correct'})
          }
        }else{
          res.json({statusCode: 1, message: 'the user with this email address is not registered'})

        }
      }
      checkUser()
    } catch (error) {
      res.json({statusCode: 1, message: error})
    }
  }
)
app.post('/login', (req, res) => {
    try {
      const checkUser = async () => {
        const user = await MongoDb.findUser.findUserByEmail(req.body.email)
        if(user !== null){
          if(user.password === req.body.password){
            res.json({statusCode: 0, message: 'ok',userId:user._id})
          }else{
            res.json({statusCode: 1, message: 'password is not correct'})
          }
        }else{
          res.json({statusCode: 1, message: 'the user with this email address is not registered'})

        }
      }
      checkUser()
    } catch (error) {
      res.json({statusCode: 1, message: error})
    }
  }
)
