import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserModelSchema.pre("save", function(next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function(saltError, salt) {
          if (saltError) {
              return next(saltError)
          } else {
              bcrypt.hash(user.password, salt, function(hashError, hash) {
                  if (hashError) {
                      return next(hashError)
                  }

                  user.password = hash
                  console.log(hash)
                  next()
              })
          }
      })
  } else {
      return next()
  }
})

// Todo to verify hashes
UserModelSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password, function(err, res) {
    if (err){
      // handle error
      return {err}
    }
    if (res) {
      // password matches 
      console.log("password matched")
      return true
    } else {
      // password do not match
      console.log("password do not match")
      return false
    }
  });
}

export default mongoose.model('UserModel', UserModelSchema)
