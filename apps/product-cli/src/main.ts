import express from 'express';
import cookieParser from 'cookie-parser';
import {
  startMongo,
  findUser,
  addNewUser,
  verifyUser,
  checkVerification,
} from './MongoDb';
import { verifyEmail } from './mailer';
import _crypto from 'crypto';
import cors from 'cors';

const PORT = process.env.PORT || 4201;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4200',
  })
);
app.listen(PORT, async () => {
  console.log('Loading...');
  await startMongo();
  console.log('the server is getting started');
});

app.post('/signUp', (req, res) => {
  try {
    if (
      Object.hasOwn(req.body, 'email') &&
      Object.hasOwn(req.body, 'password') &&
      Object.keys(req.body).length === 2
    ) {
      const addUser = async () => {
        const user = await findUser.findUserByEmail(req.body.email);
        if (!user) {
          const token: string = _crypto.randomBytes(32).toString('hex');
          const userData = req.body;
          userData.token = token;
          userData.verified = false;
          const newUser: any = await addNewUser(userData);
          console.log(newUser);
          const text = `http://localhost:4201/verify/${newUser.insertedId}/${token}`;
          verifyEmail(String(req.body.email), 'Please veryfi email', text);
          res.json({ statusCode: 0, message: 'vafiry email' });
        } else {
          res.json({ statusCode: 1, message: 'This user already exists' });
        }
      };
      addUser();
    } else {
      res.json({
        statusCode: 1,
        message: "you must pass the object:{'email':email,'password':password}",
      });
    }
  } catch (error) {
    res.json({ statusCode: 1, message: error });
  }
});
app.get('/verify/:id/:token', (req, res) => {
  try {
    const addUser = async () => {
      const user = await findUser.findUserById(req.params.id);
      if (user) {
        const token = await findUser.findUserByToken(req.params.token);
        if (token) {
          const verifyMessage = await verifyUser(
            req.params.id,
            req.params.token
          );
          res.json('Email verifiend sucsessfully');
        } else {
          res.json('invalid link');
        }
      } else {
        res.json('invalid link');
      }
    };

    addUser();
  } catch (err) {
    console.log(err);
  }
});
app.post('/login', (req, res) => {
  try {
    const checkUser = async () => {
      const user: any = await findUser.findUserByEmail(req.body.email);
      if (user !== null) {
        if (user.password === req.body.password) {
          const isVerify = await checkVerification(req.body.email);
          if (isVerify) {
            res.cookie('userId', user._id);
            res.json({ statusCode: 0, message: 'ok', userId: user._id });
          } else {
            res.json({ statusCode: 1, message: 'pleace verify your email' });
          }
        } else {
          res.json({ statusCode: 1, message: 'password is not correct' });
        }
      } else {
        res.json({
          statusCode: 1,
          message: 'the user with this email address is not registered',
        });
      }
    };
    checkUser();
  } catch (error) {
    res.json({ statusCode: 1, message: error });
  }
});
app.get('/me', (req, res) => {
  try {
    const getMe = async () => {
      const user: any = await findUser.findUserById(req.cookies.userId);
      res.json({ email: user.email });
    };
    getMe();
  } catch (e) {
    res.json(e);
  }
});
app.delete('/login', (req, res) => {
  try {
    res.clearCookie('userId');
    res.json();
  } catch (e) {
    res.json(e);
  }
});
