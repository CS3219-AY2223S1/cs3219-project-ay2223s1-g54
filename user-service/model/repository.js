import UserModel from './user-model.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
  return new UserModel(params);
}

export async function logUserIn(params) {
  UserModel.findOne({
      email: params['email']
  }).exec(function(err, user) {
      if (err) {
          return {err}
      } else if (!user) {
          console.log("User with that email does not exist")
          return false
      } else {

        // Bugged -> async not handled properly -> valid account cannot log in
        const resultCmpPwd = user.comparePassword(params['password'], function(matchError, isMatch) {
              if (matchError) {
                  return {err}
              } else if (!isMatch) {
                  // console.log("password do not match")
                  return false
              } else {
                  // console.log("password matched")
                  return true
              }
          });
      }
  })
}
