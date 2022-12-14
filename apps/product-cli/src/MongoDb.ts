import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';
const client = new MongoClient(
  'mongodb+srv://sashazernin:2552436qwerrewq@cluster0.c9d6y5r.mongodb.net/mongo?retryWrites=true&w=majority'
);

export const startMongo = async () => {
  try {
    await client.connect();
    console.log('connect passed');
  } catch (e) {
    console.log(e);
  }
};

const users = client.db().collection('users');

export const findUser = {
  findUserByEmail(email: string): object {
    return users.findOne({ email });
  },
  findUserById(id: string): object {
    return users.findOne({ _id: new ObjectId(id) });
  },
  findUserByToken(token: string): object {
    return users.findOne({ token });
  },
};

export const checkVerification = async (email: string) => {
  const user = await users.findOne({ email });
  if (user.verified === true) {
    return true;
  } else {
    return false;
  }
};

export const addNewUser = (data: object): object => {
  return users.insertOne(data);
};

export const verifyUser = (id: string, token: string) => {
  return users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        verified: true,
      },
      $unset: {
        token,
      },
    }
  );
};
