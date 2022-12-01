const express = require('express'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  MongoDb = require('./MongoDb')


const PORT = process.env.PORT || 4201

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}))
app.listen(PORT, async () => {
  console.log('Loading...')
  await MongoDb.startMongo()
  console.log('the server is getting started')
})

app.post('/signUp', (req, res) => {
    try {
      if (Object.hasOwn(req.body, 'email') && Object.hasOwn(req.body, 'password') && Object.keys(req.body).length === 2) {
        const addUser = async () => {
          const user = await MongoDb.findUser.findUserByEmail(req.body.email)
          if (user === null) {
            const newUser = await MongoDb.addUser(req.body)
            res.json({statusCode: 0, message: 'ok'})
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
        if (user !== null) {
          if (user.password === req.body.password) {
            res.cookie('userId', user._id)
            res.json({statusCode: 0, message: 'ok', userId: user._id})
          } else {
            res.json({statusCode: 1, message: 'password is not correct'})
          }
        } else {
          res.json({statusCode: 1, message: 'the user with this email address is not registered'})
        }
      }
      checkUser()
    } catch (error) {
      res.json({statusCode: 1, message: error})
    }
  }
)
app.get('/me', (req, res) => {
  try{
    const getMe = async () => {
      const user = await MongoDb.findUser.findUserById(req.cookies.userId)
      res.json({email:user.email})
    }
    getMe()
  }catch (e){
    res.json(e)
  }
  }
)
app.delete('/login', (req, res) => {
  try{
    console.log('123')
    res.clearCookie('userId')
    res.json()
  }catch (e){
    res.json(e)
  }
  }
)
